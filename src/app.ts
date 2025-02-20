import express, {Express, Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRouter from './app/routes/AuthRoutes';
import folderRouter from './app/routes/FolderRoutes';
import fileRouter from './app/routes/FileRoutes';


const app: Express = express();


//middleware implementation
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());


// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());


app.get("/", (req: Request, res: Response) => {
    res.send("This is Storage Management Server");
});


//application routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/folder', folderRouter);
app.use('/api/v1/file', fileRouter);



app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route is not found'
    })
})

export default app;
