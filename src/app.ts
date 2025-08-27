import config from './config/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dataSource from "./config/db";
import Routes from './routes';
import path from 'path';

const port: number = config.port;

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

const app = express();

app.set("view engine", "ejs");
app.use(cors(corsOption));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
new Routes(app);

const dirname = path.resolve();
app.use('/assets/images/blogs', express.static(path.join(dirname, 'assets/images/blogs')));
// app.use('/image', express.static(path.join(dirname, 'assets/images/collection')));
app.use('/', express.static(path.join(dirname, './website')));
app.use('*', express.static(path.join(dirname, './website')));

dataSource.initialize().then(() => {
  console.log('Database synchronized successfully 💖');
}).catch((err) => {
  console.log('DataSource Connection Failed', err);
})

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
