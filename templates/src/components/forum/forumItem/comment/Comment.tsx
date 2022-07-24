import { useState, useEffect, memo, FormEvent } from "react";
import style from "./Comment.module.scss";
import classNames from "classnames/bind";
import { useAppSelector } from "../../../../redux/hooks";
import forumService from "../../../../services/forum.service";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "../../../../config/socket";
import dateFormate from "../../../../config/fortmateDate";

const cls = classNames.bind(style);

const Comment = ({
    post_id,
    username,
    setTotalComment,
}: {
    post_id: string;
    username: string;
    setTotalComment: any;
}) => {
    const user = useAppSelector((state) => state.user);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [next, setNext] = useState<string | null>("/forum/comment/");
    const [isScroll, setIsScroll] = useState(true);
    const socket = useSocket();

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

    useEffect(() => {
        if (isScroll) {
            const element = document.getElementById(
                "list_comment"
            ) as HTMLElement;
            element.scrollTo(0, element.scrollHeight);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comments]);

    const handleComment = async (e: FormEvent) => {
        e.preventDefault();
        const content = (e.target as any)[0] as HTMLInputElement;

        if (content.value.trim().length === 0) {
            return false;
        }

        socket?.emit("sendComment", {
            auth: {
                username: user.user.username,
                avatar: user.user.avatar,
            }, //other user
            content: content.value,
            post_id,
        });
        if (user.user.username !== username)
            socket?.emit("sendNotification", {
                user: {
                    username,
                    avatar: "",
                },
                otherUser: {
                    username: user.user.username,
                    avatar: user.user.avatar,
                },
                url: "/forum/" + post_id,
                description: "đã bình luận về bài viết của bạn",
                read: false,
                seen: false,
            });
        content.value = "";
        setIsScroll((prev) => true);
    };

    useEffect(() => {
        socket?.on("receiveComment:" + post_id, (data) => {
            setTotalComment((prev: number) => {
                return prev + 1;
            });
            setComments((prev) => {
                return [...prev, { ...data, date: new Date().toString() }];
            });
            setIsScroll((prev) => true);
        });

        return () => {
            socket?.off("connect");
            socket?.off("disconnect");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLoadMoreComment = async () => {
        const result = await forumService.getComment(next as string, post_id);
        setNext((prev) => {
            return result.data.next?.replace(process.env.REACT_APP_URL, "");
        });
        setComments((prev) => {
            return [...result.data.results, ...prev];
        });
        setIsScroll((prev) => false);
    };

    return (
        <div className={cls("comment")}>
            <div className={cls("list_comment")} id="list_comment">
                {next && (
                    <div
                        className={cls("more_comment")}
                        onClick={handleLoadMoreComment}
                    >
                        Xem thêm bình luận
                    </div>
                )}
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
                                    <span>
                                        {dateFormate(
                                            new Date(value.date as string)
                                        )}
                                    </span>
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
