"""Contact form handler.

Single-purpose Lambda behind a Function URL (see infrastructure/). Validates
the payload from web/components/contact-form.tsx and relays it via SES.

Deliberately not a FastAPI app: one endpoint doesn't justify a second
deployable. If a second endpoint shows up, swap this for Mangum + FastAPI.
"""

from __future__ import annotations

import json
import os
import re
from typing import Any

import boto3

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
MAX_FIELD_LENGTH = 5_000

ses = boto3.client("ses")


class ValidationError(Exception):
    pass


def _validate(payload: dict[str, Any]) -> dict[str, str]:
    name = str(payload.get("name", "")).strip()
    email = str(payload.get("email", "")).strip()
    message = str(payload.get("message", "")).strip()

    if not name or len(name) > MAX_FIELD_LENGTH:
        raise ValidationError("name is required")
    if not EMAIL_RE.match(email) or len(email) > MAX_FIELD_LENGTH:
        raise ValidationError("a valid email is required")
    if not message or len(message) > MAX_FIELD_LENGTH:
        raise ValidationError("message is required")

    return {"name": name, "email": email, "message": message}


def _response(status: int, body: dict[str, Any]) -> dict[str, Any]:
    return {
        "statusCode": status,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(body),
    }


def handler(event: dict[str, Any], _context: Any) -> dict[str, Any]:
    try:
        raw_body = event.get("body") or "{}"
        payload = json.loads(raw_body)
        fields = _validate(payload)
    except (ValidationError, json.JSONDecodeError) as exc:
        return _response(400, {"error": str(exc)})

    recipient = os.environ["CONTACT_RECIPIENT_EMAIL"]
    sender = os.environ["CONTACT_SENDER_EMAIL"]

    ses.send_email(
        Source=sender,
        Destination={"ToAddresses": [recipient]},
        Message={
            "Subject": {"Data": f"Portfolio contact form: {fields['name']}"},
            "Body": {
                "Text": {
                    "Data": f"From: {fields['name']} <{fields['email']}>\n\n{fields['message']}"
                }
            },
        },
        ReplyToAddresses=[fields["email"]],
    )

    return _response(200, {"ok": True})
