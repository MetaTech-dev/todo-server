import express, {Express, Request, Response} from 'express';
import router from './router';

const app: Express = express();
const port = 3000;

app.use(express.json());

app.get('/', (_req: Request, res: Response)=>{
    res.send('Hello World!');
});

app.use(router)

app.listen(port, ()=> {
console.log(`[Server] running at https://localhost:${port}`);
});