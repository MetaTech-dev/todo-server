import clerkClient from "@clerk/clerk-sdk-node";

export default class UserService {
  // note: create is handled by Auth0 when the user signs up on the frontend so we don't need to create a user here

  static update = async (userId: string, body: object) =>
    clerkClient.users.updateUser(userId, body);

  static getOne = async (userId: string) => {
    const user = await clerkClient.users.getUser(userId);
    // TODO: make this more efficient when clerk makes it easier
    const organizationMembershipList =
      await clerkClient.organizations.getOrganizationMembershipList({
        organizationId: process.env.CLERK_ORGANIZATION_ID as string,
      });
    const organizationMembership = organizationMembershipList.find(
      (organizationMembership) =>
        organizationMembership.publicUserData?.userId === userId
    );
    const userWithRole = {
      ...user,
      role: organizationMembership?.role,
    };

    return userWithRole;
  };

  static list = async () => {
    // get the list of users without roles
    try {
      const users = await clerkClient.users.getUserList();
      // TODO: make this more efficient when clerk makes it easier
      const organizationMembershipList =
        await clerkClient.organizations.getOrganizationMembershipList({
          organizationId: process.env.CLERK_ORGANIZATION_ID as string,
        });

      const usersWithRole = users.map((user) => {
        const organizationMembership = organizationMembershipList.find(
          (organizationMembership) =>
            organizationMembership.publicUserData?.userId === user.id
        );
        return {
          ...user,
          role: organizationMembership?.role,
        };
      });

      return usersWithRole;
    } catch (err) {
      console.error(err);
      throw new Error("this is an error");
    }
  };

  static updateRole = async (userId: string, role: string) => {
    await clerkClient.organizations.updateOrganizationMembership({
      organizationId: process.env.CLERK_ORGANIZATION_ID as string,
      userId,
      role,
    });

    const updatedUser = await clerkClient.users.getUser(userId);

    return updatedUser;
  };
}
