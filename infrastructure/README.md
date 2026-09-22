# Infrastructure

Terraform for the static site (S3 + CloudFront + Route 53) and the contact
form (one Lambda behind a Function URL). See the root build prompt, section
3, for why each of these was chosen over the alternative (SSR/OpenNext,
FastAPI, API Gateway).

## Deploy

```bash
cd infrastructure
terraform init
terraform apply \
  -var="domain_name=anujgautam.dev" \
  -var="contact_recipient_email=you@example.com" \
  -var="contact_sender_email=noreply@anujgautam.dev"
```

Both SES addresses must be verified in the SES console (or moved out of the
sandbox) before the contact form will actually deliver mail.

After the first apply, build and sync the site:

```bash
docker build --target artifact --output "type=local,dest=dist" .
aws s3 sync dist/ "s3://$(terraform output -raw site_bucket_name)" --delete
aws cloudfront create-invalidation \
  --distribution-id "$(terraform output -raw cloudfront_distribution_id)" \
  --paths "/*"
```

Set `NEXT_PUBLIC_CONTACT_ENDPOINT` (see `.env.example`) to
`terraform output -raw contact_function_url` before that build, so the
contact form has somewhere to submit to.

## Cost

Target: **~$0.50–1/month**. The Route 53 hosted zone (~$0.50/mo) is the only
guaranteed charge — CloudFront's 1TB/month egress and Lambda's 1M
requests/month are both part of AWS's perpetual free tier, not a 12-month
trial. This is also why there's no API Gateway (free tier expires after 12
months) and no VPC on the Lambda (a NAT gateway alone runs ~$32/mo for a
function that only calls SES).

Every CloudWatch log group here sets `retention_in_days`
(`var.log_retention_in_days`, default 30) — without it, logs accumulate
indefinitely at S3-standard-equivalent pricing.
