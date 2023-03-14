import { Construct } from "constructs";
import { Vpc } from "../.gen/modules/terraform-aws-modules/aws/vpc";
import { Eks, EksOptions } from "../.gen/modules/terraform-aws-modules/aws/eks";
import { Token } from "cdktf"
import { StackConfig } from "./stack-config";

const CLUSTER_VERSION = "1.24";

export const getAwsEks = (scope: Construct, id: string, project: string, vpc: Vpc, { environment }: StackConfig): Eks => {
    const config: EksOptions = {
        clusterName: project,
        clusterVersion: CLUSTER_VERSION,
        subnetIds: Token.asList(vpc.privateSubnetsOutput),
        clusterEndpointPublicAccess: true,
        vpcId: vpc.vpcIdOutput,
        eksManagedNodeGroupDefaults: {
          ami_type: "AL2_x86_64"
        },
        eksManagedNodeGroups: {
          one: {
            name: "node-group-1",
            min_size: 1,
            desired_size: 2,
            max_size: 3,
            instance_types: ["t3.small"]
          },
          two: {
            name: "node-group-2",
            desired_size: 1,
            min_size: 1,
            max_size: 2,
            instance_types: ["t3.small"]
          }
        },
        tags: {
          environment: environment
        },
    };
    
    return new Eks(scope, id, config);
}
