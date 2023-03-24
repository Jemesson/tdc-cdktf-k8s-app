// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import { Construct } from "constructs";
import { App, TerraformStack, Fn, TerraformVariable, TerraformOutput } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
import { KubernetesProvider } from "@cdktf/provider-kubernetes/lib/provider";
import { getAwsVpc } from "./vpc";
import { getAwsEks } from "./eks";
import { StackConfig } from "./stack-config";
import { getTerraformCloud } from "./terraform-cloud";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string, config: StackConfig) {
    super(scope, id);

    // Input vars
    const cidr = new TerraformVariable(this, "cidr", {
      type: "string",
      default: "10.0.0.0/16"
    });
    const clusterName = new TerraformVariable(this, "project", {
      type: "string",
      default: "tdc-k8s-jemlima",
    });

    // Resources
    new AwsProvider(this, "AWS", {
      region: config.region,
    });

    const vpc = getAwsVpc(this, "vpc_id", clusterName.value, cidr.value, config);
    const eks = getAwsEks(this, "eks_id", clusterName.value, vpc, config);

    new KubernetesProvider(this, "k8s_id", {
      host: eks.clusterEndpointOutput,
      clusterCaCertificate: Fn.base64decode(eks.clusterCertificateAuthorityDataOutput),
    });

    // Outputs
    new TerraformOutput(this, "eks_name", { value: eks.clusterNameOutput });
    new TerraformOutput(this, "eks_endpoint", { value: eks.clusterEndpointOutput });
  }
}

// main

const app = new App();
const devStack = new MyStack(app, "tdc-dev-stack", { environment: "dev", region: "us-east-1"});
const stagingStack = new MyStack(app, "tdc-staging-stack", { environment: "staging", region: "us-east-1"});
const productionStack = new MyStack(app, "tdc-production-stack", { environment: "production", region: "us-east-2"});

getTerraformCloud(devStack);
getTerraformCloud(stagingStack);
getTerraformCloud(productionStack);

// exec
app.synth();
