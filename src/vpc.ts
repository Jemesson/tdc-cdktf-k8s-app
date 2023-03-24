import { Construct } from "constructs";
import { Vpc, VpcOptions } from "../.gen/modules/terraform-aws-modules/aws/vpc";
import { StackConfig } from "./stack-config";

const PRIVATE_SUBNETS = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"];
const PUBLIC_SUBNETS = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"];

export const getAwsVpc = (scope: Construct, id: string, project: string, cidr: string, { environment, region }: StackConfig): Vpc => {
    // @ts-ignore
    const k8sClusterElb = `kubernetes.io/cluster/${project}`;

    const config: VpcOptions = {
        name: project,
        cidr,
        azs: getAzs().get(region),
        privateSubnets: PRIVATE_SUBNETS,
        publicSubnets: PUBLIC_SUBNETS,
        privateSubnetTags: {
            "kubernetes.io/role/internal-elb": "1",
            k8sClusterElb: "shared",
        },
        publicSubnetTags: {
            "kubernetes.io/role/elb": "1",
            k8sClusterElb: "shared",
        },
        enableDnsHostnames: true,
        enableNatGateway: true,
        tags: {
            environment: environment
        }
    }

    return new Vpc(scope, id, config);
}

const getAzs = () => {
    const azsMap = new Map();

    // Map other azs by region key
    azsMap.set("us-east-1", ["us-east-1a", "us-east-1b", "us-east-1c"]);
    azsMap.set("us-east-2", ["us-east-2a", "us-east-2b", "us-east-2c"]);

    return azsMap;
}
