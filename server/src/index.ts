import express, { type Request, type Response, type Application } from 'express';

const app: Application = express();
const PORT = 3000;

app.get('/api/*s', (req: Request, res: Response) => {
    console.log(req.body);
    return res.send(req.body);
});

app.get('/api', (req: Request, res: Response) => {
    return res.send("404");
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
