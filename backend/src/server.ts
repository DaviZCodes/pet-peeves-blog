import express, {Request, 
    Response, 
    NextFunction, 
    Application, ErrorRequestHandler} from "express";
import cors from "cors";
import {Server} from "http"
import createHttpError from "http-errors";

const app: Application = express();
app.use(cors());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Pet Logger Backend")
})

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound())
})

//error handling
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send( {
        status: err.status || 500,
        message: err.message
    })
}

app.use(errorHandler);

//run server
const PORT: Number = 1001;

const server: Server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});