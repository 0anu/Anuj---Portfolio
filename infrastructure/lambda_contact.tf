# ---------------------------------------------------------------------------
# Contact form: one Lambda behind a Function URL — no API Gateway (its free
# tier is 12 months only; Function URLs have no per-request charge) and no
# VPC (a NAT gateway alone is ~$32/mo, and this function only calls SES).
# ---------------------------------------------------------------------------

data "archive_file" "contact" {
  type        = "zip"
  source_dir  = "${path.module}/../backend/contact"
  output_path = "${path.module}/.build/contact.zip"
}

resource "aws_iam_role" "contact" {
  name = "portfolio-contact-lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Action    = "sts:AssumeRole"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

data "aws_iam_policy_document" "contact_permissions" {
  statement {
    sid       = "SendContactEmail"
    actions   = ["ses:SendEmail", "ses:SendRawEmail"]
    resources = ["*"]
  }

  statement {
    sid = "WriteOwnLogs"
    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]
    resources = ["${aws_cloudwatch_log_group.contact.arn}:*"]
  }
}

resource "aws_iam_role_policy" "contact" {
  name   = "portfolio-contact-permissions"
  role   = aws_iam_role.contact.id
  policy = data.aws_iam_policy_document.contact_permissions.json
}

resource "aws_cloudwatch_log_group" "contact" {
  name              = "/aws/lambda/portfolio-contact"
  retention_in_days = var.log_retention_in_days
}

resource "aws_lambda_function" "contact" {
  function_name    = "portfolio-contact"
  role             = aws_iam_role.contact.arn
  handler          = "handler.handler"
  runtime          = "python3.13"
  filename         = data.archive_file.contact.output_path
  source_code_hash = data.archive_file.contact.output_base64sha256
  timeout          = 10
  memory_size      = 128

  # No vpc_config: this function only talks to SES, and a NAT gateway would
  # cost more per month than the rest of this stack combined.

  environment {
    variables = {
      CONTACT_RECIPIENT_EMAIL = var.contact_recipient_email
      CONTACT_SENDER_EMAIL    = var.contact_sender_email
    }
  }
}

resource "aws_lambda_function_url" "contact" {
  function_name      = aws_lambda_function.contact.function_name
  authorization_type = "NONE"

  cors {
    allow_origins = ["https://${var.domain_name}"]
    allow_methods = ["POST"]
    allow_headers = ["content-type"]
    max_age       = 300
  }
}
