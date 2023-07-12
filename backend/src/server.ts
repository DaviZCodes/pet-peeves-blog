import express from "express";
import http from "http";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
import mongoose from "mongoose";
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

//setting up the app
const app = express();
app.use(cors({
    origin: "https://pet-peeves-blog.vercel.app",  //make sure frontend running on this port
    credentials: true,
  }));

app.use(compression());
app.use(cookieParser());
app.use(bodyparser.json());


//running the server
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Pet Logger Backend at ${PORT}`);
})

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL!);
mongoose.connection.on("error", (error: Error) => {
    console.log(error)  
})

app.use("/", router());
app.use("/uploads", express.static("uploads"));

// Export the Express API
module.exports = app;