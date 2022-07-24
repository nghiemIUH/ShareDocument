import { Server, Socket } from "socket.io";
import client from "../db/connect";
import { v4 as uuidv4 } from "uuid";

const comment = (io: Server, socket: Socket) => {
    socket.on("sendComment", (data) => {
        const query =
            'INSERT INTO public."Forum_comment"(\
            id, content, date, auth_id, post_id)\
            VALUES ($1, $2, $3, (SELECT id FROM public."User_customuser" where username=$4), (SELECT id FROM public."Forum_post" where id=$5))';
        const values = [
            uuidv4(),
            data.content,
            new Date(),
            data.auth.username,
            data.post_id,
        ];
        client.query(query, values).then((res) => {
            io.sockets.emit("receiveComment:" + data.post_id, data);
        });
    });
};
export default comment;
