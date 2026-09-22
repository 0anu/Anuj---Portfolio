output "site_bucket_name" {
  value = aws_s3_bucket.site.id
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.site.id
}

output "site_url" {
  value = "https://${var.domain_name}"
}

output "contact_function_url" {
  value = aws_lambda_function_url.contact.function_url
}
