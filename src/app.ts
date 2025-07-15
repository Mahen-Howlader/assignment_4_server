import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { bookRouters } from './app/controllers/bookController';
import { borrowRouter } from './app/controllers/borrowController';

export const app: Application = express();
app.use(cors());
app.use(express.json());



app.use("/api", bookRouters)
app.use("/api", borrowRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
});

app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});