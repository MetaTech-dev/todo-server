import clerkClient from "@clerk/clerk-sdk-node";

export default class UserService {
  static update = async ({ userId, body }: { userId: string; body: object }) =>
    clerkClient.users.updateUser(userId, body);

  static getOne = async ({
    userId,
    orgId,
  }: {
    userId: string;
    orgId?: string;
  }) => {
    const user = await clerkClient.users.getUser(userId);

    if (orgId) {
      // TODO: make this more efficient when clerk makes it easier
      const organizationMembershipList =
        await clerkClient.organizations.getOrganizationMembershipList({
          organizationId: orgId,
        });
      const organizationMembership = organizationMembershipList.find(
        (organizationMembership) =>
          organizationMembership.publicUserData?.userId === userId
      );

      return {
        ...user,
        role: organizationMembership?.role,
      };
    } else {
      return user;
    }
  };

  static list = async ({ orgId }: { orgId: string }) => {
    // get the list of users without roles
    const users = await clerkClient.users.getUserList();
    if (orgId) {
      // TODO: make this more efficient when clerk makes it easier
      const organizationMembershipList =
        await clerkClient.organizations.getOrganizationMembershipList({
          organizationId: orgId,
        });

      const usersWithRole = users
        .filter((user) =>
          organizationMembershipList.some(
            (organizationMembership) =>
              organizationMembership.publicUserData?.userId === user.id
          )
        )
        .map((user) => {
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
    } else {
      return users;
    }
  };

  // deprecated
  static updateRole = async ({
    userId,
    role,
    orgId,
  }: {
    userId: string;
    role: string;
    orgId: string;
  }) => {
    if (!orgId || !userId || !role) {
      throw new Error("orgId, userId, and role are required");
    }
    await clerkClient.organizations.updateOrganizationMembership({
      organizationId: orgId,
      userId,
      role,
    });

    const updatedUser = await this.getOne({ userId, orgId });

    return updatedUser;
  };
}
