import express, {Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRouter from './app/routes/AuthRoutes';
import fileRouter from './app/routes/FileRoutes';
import folderRouter from './app/routes/FolderRoutes';
import favouriteRouter from './app/routes/FavouriteRoutes';
import protectedRouter from './app/routes/ProtectedRoutes';



import path from "path";


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
app.use('/api/v1/favourite', favouriteRouter);
app.use('/api/v1/protected', protectedRouter);


//serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads",)))



app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route is not found'
    })
})

export default app;
