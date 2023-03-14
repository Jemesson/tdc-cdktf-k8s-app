import { CloudBackend, NamedCloudWorkspace } from "cdktf";
import { Construct } from "constructs";

export const getTerraformCloud = (scope: Construct) => {
    new CloudBackend(scope, {
        hostname: "app.terraform.io",
        organization: "jemlima",
        workspaces: new NamedCloudWorkspace("tdc-cdktf-k8s-app")
    });
}
