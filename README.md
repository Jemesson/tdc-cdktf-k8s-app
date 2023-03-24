# Terraform CDK Application
 Application is written in TypeScript to provision an `EKS cluster with three Availability Zones`.

## Topics:
1. [Summary](#summary)
2. [Setup](#setup)
2. [Deploy](#deploy)
3. [Stack](#stack)
4. [References](#references)

## Summary
The Cloud Development Kit for Terraform (CDKTF) enables the utilization of programming languages for defining and provisioning infrastructure.

## Setup

Install project dependencies

```bash
npm install
```

And then, get the providers and modules used in the project running:

```bash
npm run get
```

Terraform Cloud

> Create an account in Terraform cloud, with an organization, with the given workspace: `tdc-cdktf-k8s-app`.

Create environment variables:

```bash
export TF_CLOUD_ORGANIZATION=YOUR_TERRAFORM_ORG
export TF_CLOUD_WORKSPACE=YOUR_CLOUD_WORKSPACE
```

## Deploy

Generate Terraform JSON config. Creates an auto-generated directory `cdktf.out`
```bash
npm run synth
```

Deploy in Dev:
```bash
npm run dev
```

Deploy in Staging:
```bash
npm run staging
```

Deploy in Production:
```bash
npm run prod
```

## Stack
* [Terraform Cloud](https://app.terraform.io/)
* [Terraform CDK](https://developer.hashicorp.com/terraform/cdktf)
* [TypeScript](https://www.typescriptlang.org/)
* [AWS](https://aws.amazon.com/)

## References
1. [Resilience patterns](https://aws.amazon.com/pt/blogs/architecture/understand-resiliency-patterns-and-trade-offs-to-architect-efficiently-in-the-cloud/)
2. [AWS Resilience Hub](https://aws.amazon.com/pt/blogs/architecture/building-resilient-well-architected-workloads-using-aws-resilience-hub/)
3. [Constructs](https://constructs.dev/)
