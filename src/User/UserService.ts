import { ManagementClient, UserUpdate } from "auth0";

const management = new ManagementClient({
  domain: "metatech-todo-dev.us.auth0.com",
  clientId: "87yrCCRUTtwjvJ8flg5ZhzzB4kI6JMva",
  clientSecret:
    "uVB35ukoTqdjP2gQvCIr24Td8jQbQYw3Hb2oTGzPMGqqcy23SnYmAxvgSrAIToqz",
});

export default class UserService {
  // note: create is handled by Auth0 when the user signs up on the frontend so we don't need to create a user here

  static update = async (userId: string, body: UserUpdate) => {
    await management.users.update({ id: userId }, body);
  };

  static getOne = async (userId: string) => {
    // get user without roles
    const userResponse = await management.users.get({ id: userId });

    // get roles for user
    let rolesResponse = await management.users.getRoles({ id: userId });

    // if the user doesn't have any roles, assign the default role
    if (!rolesResponse.data.length) {
      await this.updateRoles(userId, ["member"]);
      rolesResponse = await management.users.getRoles({ id: userId });
    }

    // add roles to user object
    const user = {
      ...userResponse.data,
      roles: rolesResponse.data,
    };

    return user;
  };

  static list = async () => {
    // get the list of users without roles
    try {
      const usersResponse = await management.users.getAll();

      // loop through users, get roles for each user, and add roles to user object
      const users = await Promise.all(
        usersResponse.data.map(async (user) => {
          const rolesResponse = await management.users.getRoles({
            id: user.user_id,
          });

          return {
            ...user,
            roles: rolesResponse.data,
          };
        })
      );

      return users;
    } catch (err) {
      console.error(err);
      throw new Error("this is an error");
    }
  };

  static updateRoles = async (userId: string, roleIds: string[]) => {
    // get current roles for user
   const currentRoles = await management.users.getRoles({
        id: userId,
      });

    // if the role ids passed in are not included in the current role ids, then we will add them
    const roleIdsToAdd = roleIds.filter((roleId) => !currentRoles.data.map(role => role.id).includes(roleId));

    // if the current role ids are not included in the role ids passed in, then we will remove them
    const roleIdsToRemove = currentRoles.data.filter(
      (role) => !roleIds.includes(role.name)
    ).map(role => role.id);

    // add roles
    await management.users.assignRoles({ id: userId }, { roles: roleIdsToAdd });

    // remove roles 
    await management.users.deleteRoles({ id: userId }, { roles: roleIdsToRemove });

    // get updated user
    const updatedUser = await this.getOne(userId);

    return updatedUser;
  }
}
