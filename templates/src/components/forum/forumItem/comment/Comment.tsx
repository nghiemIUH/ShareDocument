import { useState, useEffect, memo, FormEvent } from "react";
import style from "./Comment.module.scss";
import classNames from "classnames/bind";
import { useAppSelector } from "../../../../redux/hooks";
import forumService from "../../../../services/forum.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cls = classNames.bind(style);

const Comment = ({ post_id }: { post_id: string }) => {
    const user = useAppSelector((state) => state.user);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [next, setNext] = useState<string | null>("/forum/comment/");
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
        const result = await forumService.uploadComment(content.value, post_id);
        if (result.status === 200) {
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
                <input type="text" placeholder="Trả lời..." />
            </form>
        </div>
    );
};

interface CommentType {
    id: string;
    post: string;
    auth: {
        username: string;
        avatar: string;
    };
    content: string;
    date: string;
}

export default memo(Comment);
