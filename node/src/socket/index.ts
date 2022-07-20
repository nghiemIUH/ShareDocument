import { Server } from "socket.io";
import comment from "./comment";
import notification from "./notification";
export const onConnect = (io: Server) => {
    io.on("connection", (socket) => {
        console.log("num client connected: ", io.of("/").sockets.size);
        comment(io, socket);
        notification(io, socket);
    });
};
