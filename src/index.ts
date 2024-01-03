import express, { Express, Request, Response } from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { permissionErrorHandler } from "./middleware/permissionErrorHandler";
import https from 'https';
import fs from 'fs';

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

if (process.env.USE_HTTPS === "true") {
  const httpsServer = https.createServer({
    key: fs.readFileSync('/etc/.cert/key.pem'),
    cert: fs.readFileSync('/etc/.cert/cert.pem'),
  }, app);

  httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
} else {

  app.listen(port, () => {
    console.log(`[Server] running at https://localhost:${port}`);
  });
}
