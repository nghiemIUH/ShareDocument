import { useState, useEffect, memo, FormEvent, useRef } from "react";
import style from "./Comment.module.scss";
import classNames from "classnames/bind";
import { useAppSelector } from "../../../../redux/hooks";
import forumService from "../../../../services/forum.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cls = classNames.bind(style);

const Comment = ({
    post_id,
    username,
}: {
    post_id: string;
    username: string;
}) => {
    const user = useAppSelector((state) => state.user);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [next, setNext] = useState<string | null>("/forum/comment/");
    const socket = useRef<WebSocket | null>(null);

    useEffect(() => {
        const res = async () => {
            return await forumService.getComment(next as string, post_id);
        };
        res().then((result) => {
            setNext((prev) => {
                return result.data.next?.replace(process.env.REACT_APP_URL, "");
            });
            setComments((prev) => {
                return [...prev, ...result.data.results];
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleComment = async (e: FormEvent) => {
        e.preventDefault();
        const content = (e.target as any)[0] as HTMLInputElement;

        if (content.value.trim().length === 0) {
            return false;
        }

        const result = await forumService.uploadComment(content.value, post_id);
        if (result.status === 200) {
            console.log("socket send");
            (socket.current as WebSocket).send(
                JSON.stringify({
                    auth: {
                        username: user.user.username,
                        avatar: user.user.avatar,
                    }, //other user
                    username: username,
                    content: content.value,
                    url: "/forum/" + post_id,
                    description:
                        user.user.username +
                        " đã bình luận về bài viết của bạn",
                })
            );
            content.value = "";
            setComments((prev) => {
                return [...prev, result.data];
            });
        } else {
            toast.error("Đã xảy ra lỗi vui lòng thử lại sau", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    useEffect(() => {
        socket.current = new WebSocket(
            "ws://" +
                process.env.REACT_APP_URL?.replace(
                    window.location.protocol + "//",
                    ""
                ) +
                "/forum/note/" +
                username +
                "/"
        );

        (socket.current as WebSocket).onmessage = (e) => {
            const data = JSON.parse(e.data).comment;
            if (user.user.username !== data.auth.username) {
                setComments((prev) => [...prev, data]);
            }
        };

        return () => (socket.current as WebSocket).close();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cls("comment")}>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={cls("list_comment")}>
                {comments.map((value, index) => {
                    return (
                        <div className={cls("comment_item")} key={index}>
                            <img
                                src={
                                    process.env.REACT_APP_URL +
                                    value.auth.avatar
                                }
                                alt=""
                            />
                            <div className={cls("content")}>
                                <div className={cls("username")}>
                                    {value.auth.username}
                                </div>
                                <p>{value.content}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <form
                action=""
                className={cls("form_comment")}
                onSubmit={handleComment}
            >
                <img
                    src={process.env.REACT_APP_URL + user.user.avatar}
                    alt=""
                />
                <div className={cls("form_group")}>
                    <input type="text" placeholder="Trả lời..." />
                    <button type="submit">Bình luận</button>
                </div>
            </form>
        </div>
    );
};

interface CommentType {
    id?: string;
    post?: string;
    auth: {
        username: string;
        avatar: string;
    };
    content: string;
    date?: string;
}

export default memo(Comment);
