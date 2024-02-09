// import clerkClient from "@clerk/clerk-sdk-node";

export default class RoleService {
  // deprecated
  static list = async ({ orgId }: { orgId: string }) => {
    if (!orgId) {
      throw new Error("orgId is required");
    }
    // const organization = await clerkClient.organizations.getOrganization({
    //   organizationId: orgId,
    // });

    // TODO: get the list of roles from Clerk, there is no SDK method for this yet

    return ["org:admin", "org:member"];
  };
}
