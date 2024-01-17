import clerkClient from "@clerk/clerk-sdk-node";

export default class RoleService {
  static list = async () => {
    const organization = await clerkClient.organizations.getOrganization({
      organizationId: process.env.CLERK_ORGANIZATION_ID as string,
    });
    console.log("organization", organization);

    // TODO: get the list of roles from Clerk, there is no SDK method for this yet

    return ["org:admin", "org:member"];
  };
}
