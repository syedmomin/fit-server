"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config/config"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./config/db"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const port = config_1.default.port;
const corsOption = {
    origin: "*",
    // origin: ["https://trusted-origin.com"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    exposedHeaders: [
        "Authorization",
        "Content-Type",
        "x-auth-token",
        "authorization",
    ],
    credentials: true,
};
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.use((0, cors_1.default)(corsOption));
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
new routes_1.default(app);
const dirname = path_1.default.resolve();
app.use('/assets/images/blogs', express_1.default.static(path_1.default.join(dirname, 'assets/images/blogs')));
// app.use('/image', express.static(path.join(dirname, 'assets/images/collection')));
app.use('/', express_1.default.static(path_1.default.join(dirname, './website')));
app.use('*', express_1.default.static(path_1.default.join(dirname, './website')));
db_1.default.initialize().then(() => {
    console.log('Database synchronized successfully 💖');
}).catch((err) => {
    console.log('DataSource Connection Failed', err);
});
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
