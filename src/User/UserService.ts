import { ManagementClient, UserUpdate } from 'auth0';

const management = new ManagementClient({
  domain: 'https://metatech-todo-dev.us.auth0.com/api/v2/',
  clientId: '87yrCCRUTtwjvJ8flg5ZhzzB4kI6JMva',
  clientSecret: 'uVB35ukoTqdjP2gQvCIr24Td8jQbQYw3Hb2oTGzPMGqqcy23SnYmAxvgSrAIToqz',
});

export default class UserService {
    // note: create is handled by Auth0 when the user signs up on the frontend so we don't need to create a user here

    update = async (id: string, body: UserUpdate) => {
        await management.users.update({ id }, body);
    }

    getOne = async (id: string) => {
        // get user without roles
        const userResponse = await management.users.get({ id });

        // get roles for user
        let rolesResponse = await management.users.getRoles({ id });

        if (!rolesResponse.data.length) {
            await this.assignRoles(id, ['member']);
            rolesResponse = await management.users.getRoles({ id });
        }

        // add roles to user object
        const user = {
           ...userResponse.data,
              roles: rolesResponse.data,
        };

        return user;
        }
    
    list = async () => {
        // get the list of users without roles
        const usersResponse = await management.users.getAll();

        // loop through users, get roles for each user, and add roles to user object
        const users = await Promise.all(
            usersResponse.data.map(async (user) => {
                const rolesResponse = await management.users.getRoles({ id: user.id });
                return {
                    ...user,
                    roles: rolesResponse.data,
                };
            })
        );

        return users;
    }

    assignRoles = async (id: string, roles: string[]) => {
        await management.users.assignRoles({ id }, { roles });
    }
}

