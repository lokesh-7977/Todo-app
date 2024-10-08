import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { config } from "./config/index"
import { connectDB } from "./config/db";

import routes from "./routes/index"

const app = express();
const PORT = config.port;

app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.use('/api',routes)

connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
