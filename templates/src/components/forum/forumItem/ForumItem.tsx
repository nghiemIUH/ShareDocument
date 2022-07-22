import { memo, useState, useEffect } from "react";
import style from "./ForumItem.module.scss";
import classNames from "classnames/bind";
import ImageGrid from "./imageGrid/ImageGrid";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import Comment from "./comment/Comment";
import parse from "html-react-parser";
import forumService from "../../../services/forum.service";
import { HiOutlineClock } from "react-icons/hi";
import dateFormate from "../../../config/fortmateDate";
import { BsThreeDots } from "react-icons/bs";
import { useAppSelector } from "../../../redux/hooks";

const cls = classNames.bind(style);

const ForumItem = (props: Props) => {
    const [showComment, setShowComment] = useState(false);
    const [like, setLike] = useState({
        isLike: false,
        numLike: 0,
    });
    const [showTaskMenu, setShowTaskMenu] = useState(false);
    const userState = useAppSelector((state) => state.user);
    const [totalComment, setTotalComment] = useState(0);

    useEffect(() => {
        const res = async () => {
            return await forumService.getNumComment(props.post.id);
        };
        res().then((result) => {
            setTotalComment(result.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const res = async () => {
            return await forumService.getLike(props.post.id);
        };
        res().then((result) => {
            setLike((prev) => result.data);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLike = async () => {
        const result = await forumService.handleLike(props.post.id);
        setLike((prev) => result.data);
    };

    const accept = () => {
        setShowTaskMenu((prev) => !prev);
        props.handleAccept(props.post.id);
    };
    const _delete = () => {
        setShowTaskMenu((prev) => !prev);
        props.handleDelete(props.post.id);
    };

    useEffect(() => {
        const closeToggleUser = (event: Event) => {
            const toggle = document.getElementById(
                props.post.id
            ) as HTMLDivElement;
            if (!toggle.contains(event.target as Node)) {
                setShowTaskMenu((prev) => false);
            }
        };
        document.addEventListener("click", closeToggleUser);
        return () => document.removeEventListener("click", closeToggleUser);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showTaskMenu]);

    return (
        <div className={cls("forum_item")}>
            <div className={cls("header")}>
                <div>
                    <img
                        src={
                            process.env.REACT_APP_URL +
                            (props.post.auth.avatar
                                ? props.post.auth.avatar
                                : "/media/avatars/default.jpg")
                        }
                        alt=""
                    />
                    <div className={cls("meta")}>
                        <div className={cls("username")}>
                            {props.post.auth.username}
                        </div>
                        <div className={cls("date")}>
                            <HiOutlineClock />
                            {dateFormate(new Date(props.post.date))}
                        </div>
                    </div>
                </div>
                {userState.user.is_superuser && (
                    <div>
                        <BsThreeDots
                            id={props.post.id}
                            onClick={() => setShowTaskMenu((prev) => !prev)}
                        />
                        {showTaskMenu && (
                            <div className={cls("menu")}>
                                <div
                                    className={cls("delete_post")}
                                    onClick={_delete}
                                >
                                    Xóa bài
                                </div>
                                {!props.post.accept && (
                                    <div
                                        className={cls("accept_post")}
                                        onClick={accept}
                                    >
                                        Duyệt bài
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className={cls("body")}>
                <div className={cls("text")}>{parse(props.post.content)}</div>
                <div className={cls("list_img")}>
                    <ImageGrid
                        images={props.post.media.map(
                            (value) => process.env.REACT_APP_URL + value.file
                        )}
                    />
                </div>
            </div>
            <div className={cls("footer")}>
                <div className={cls("like")}>
                    {like.isLike ? (
                        <AiFillHeart
                            style={{ color: "red" }}
                            onClick={handleLike}
                        />
                    ) : (
                        <AiOutlineHeart onClick={handleLike} />
                    )}
                    <div>{like.numLike}</div>
                </div>
                <div className={cls("comment")}>
                    <GoComment
                        onClick={() => setShowComment((prev) => !prev)}
                    />{" "}
                    <div>{totalComment}</div>
                </div>
            </div>
            {showComment && (
                <Comment
                    post_id={props.post.id}
                    username={props.post.auth.username}
                    setTotalComment={setTotalComment}
                />
            )}
        </div>
    );
};

interface Props {
    post: {
        id: string;
        auth: {
            id: string;
            username: string;
            avatar: string;
        };
        date: string;
        content: string;
        media: {
            file: string;
        }[];
        accept: boolean;
    };
    handleAccept?: any;
    handleDelete?: any;
}

export default memo(ForumItem);
