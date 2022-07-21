import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

import { Server } from "socket.io";
import cors from "cors";
import morgan from "morgan";
import client from "./db/connect";
import { onConnect } from "./socket";

client
    .connect()
    .then((e) => {
        console.log("connected db");
    })
    .catch((error) => {
        console.error("connect error");
    });

const PORT = parseInt(process.env.PORT as string);
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
const server = app.listen(PORT);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});
onConnect(io);
