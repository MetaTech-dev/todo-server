import express, { Application, Request, Response } from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import { RequireAuthProp, StrictAuthProp } from "@clerk/clerk-sdk-node";
import "dotenv/config";

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (_req: RequireAuthProp<Request>, res: Response) => {
  res.send("Hello World!");
});

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[Server] running at https://localhost:${port}`);
});
