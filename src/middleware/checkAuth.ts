import { auth } from "express-oauth2-jwt-bearer";

const checkAuth = auth({
  audience: "todo",
  issuerBaseURL: "https://metatech-todo-dev.us.auth0.com/",
});

export default checkAuth;
