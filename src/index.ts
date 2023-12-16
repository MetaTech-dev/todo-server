import express, { Express, Request, Response } from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { permissionErrorHandler } from "./middleware/permissionErrorHandler";

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(router);
app.use(permissionErrorHandler);

app.listen(port, () => {
  console.log(`[Server] running at https://localhost:${port}`);
});
