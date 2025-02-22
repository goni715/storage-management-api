"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const AuthRoutes_1 = __importDefault(require("./app/routes/AuthRoutes"));
const FileRoutes_1 = __importDefault(require("./app/routes/FileRoutes"));
const FolderRoutes_1 = __importDefault(require("./app/routes/FolderRoutes"));
const FavouriteRoutes_1 = __importDefault(require("./app/routes/FavouriteRoutes"));
const ProtectedRoutes_1 = __importDefault(require("./app/routes/ProtectedRoutes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
//middleware implementation
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
// Parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Parse application/json
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("This is Storage Management Server");
});
//application routes
app.use('/api/v1/auth', AuthRoutes_1.default);
app.use('/api/v1/folder', FolderRoutes_1.default);
app.use('/api/v1/file', FileRoutes_1.default);
app.use('/api/v1/favourite', FavouriteRoutes_1.default);
app.use('/api/v1/protected', ProtectedRoutes_1.default);
//serve uploads folder
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route is not found'
    });
});
exports.default = app;
