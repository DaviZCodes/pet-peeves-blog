import express from "express";
import http from "http";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
import mongoose from "mongoose";

//setting up the app
const app = express();
app.use(cors({
    origin: "http://localhost:5173",  //make sure frontend running on this port
    credentials: true,
  }));

app.use(compression());
app.use(cookieParser());
app.use(bodyparser.json());
// app.use("/uploads", express.static(__dirname + "/uploads"));


//running the server
const server = http.createServer(app);

const PORT = 8019;
server.listen(PORT, () => {
    console.log(`Pet Logger Backend at ${PORT}`);
})

//username: davi, password: davi
const MONGO_URL = "mongodb+srv://davi:davi@petlogger.fl6e10i.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => {
    console.log(error)  
})

app.use("/", router());