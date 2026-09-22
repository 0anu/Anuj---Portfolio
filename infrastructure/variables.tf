variable "aws_region" {
  description = "Region for non-global resources (Lambda, S3, logs)."
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Apex domain for the site, e.g. anujgautam.dev. Must already be a Route 53 hosted zone."
  type        = string
}

variable "contact_recipient_email" {
  description = "Address the contact form forwards submissions to. Must be SES-verified."
  type        = string
}

variable "contact_sender_email" {
  description = "SES-verified From address for outgoing contact-form emails."
  type        = string
}

variable "log_retention_in_days" {
  description = "Retention for every CloudWatch log group in this stack."
  type        = number
  default     = 30
}
