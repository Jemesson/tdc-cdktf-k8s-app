import { CloudBackend, NamedCloudWorkspace } from "cdktf";
import { Construct } from "constructs";

export const getTerraformCloud = (scope: Construct) => {
    const terraformOrg = process.env.TF_CLOUD_ORGANIZATION || "";
    const terraformWorkspace = process.env.TF_CLOUD_WORKSPACE || "";

    new CloudBackend(scope, {
        hostname: "app.terraform.io",
        organization: terraformOrg,
        workspaces: new NamedCloudWorkspace(terraformWorkspace)
    });
}
