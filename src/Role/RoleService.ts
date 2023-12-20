import { ManagementClient } from "auth0";

const management = new ManagementClient({
  domain: "metatech-todo-dev.us.auth0.com",
  clientId: "87yrCCRUTtwjvJ8flg5ZhzzB4kI6JMva",
  clientSecret:
    "uVB35ukoTqdjP2gQvCIr24Td8jQbQYw3Hb2oTGzPMGqqcy23SnYmAxvgSrAIToqz",
});

export default class RoleService {
  static list = async () => {
    const roles = await management.roles.getAll();
    return roles.data;
  };
}
