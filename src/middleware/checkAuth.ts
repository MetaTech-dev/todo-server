import { auth } from "express-oauth2-jwt-bearer";

const checkAuth = auth({
  audience: `https://metatech-todo-dev.us.auth0.com/api/v2/`,
  issuerBaseURL: `https://metatech-todo-dev.us.auth0.com/`,
});

export default checkAuth;
