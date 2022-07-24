import { Server, Socket } from "socket.io";
import client from "../db/connect";
import { v4 as uuidv4 } from "uuid";
const notification = (io: Server, socket: Socket) => {
    socket.on("sendNotification", (data) => {
        const query =
            'INSERT INTO public."Notification_notification"(\
                id, url, description, read, seen, "noteType", "createAt", user_id, "otherUser_id") \
            values ($1, $2, $3, $4, $5, $6, $7, (select id from "User_customuser" where username=$8), (select id from "User_customuser" where username=$9))';
        const id = uuidv4();
        const value = [
            id,
            data.url,
            data.description,
            false,
            false,
            "post",
            new Date(),
            data.user.username,
            data.otherUser.username,
        ];

        client
            .query(query, value)
            .then((res) => {
                io.sockets.emit("notification:" + data.user.username, {
                    ...data,
                    id,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    });
};
export default notification;
