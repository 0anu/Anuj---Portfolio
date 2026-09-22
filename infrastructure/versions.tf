terraform {
  required_version = ">= 1.9"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# CloudFront requires ACM certificates in us-east-1 regardless of where
# everything else runs.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
