import { memo, useState, useEffect } from "react";
import style from "./ForumItem.module.scss";
import classNames from "classnames/bind";
import ImageGrid from "./imageGrid/ImageGrid";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import Comment from "./comment/Comment";
import parse from "html-react-parser";
import forumService from "../../../services/forum.service";

const cls = classNames.bind(style);

const ForumItem = (props: Props) => {
    const [showComment, setShowComment] = useState(false);
    const [isLike, setIsLike] = useState(false);

    useEffect(() => {
        const res = async () => {
            return await forumService.getLike(props.id);
        };
        res().then((result) => {
            setIsLike(result.data.isLike);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLike = async () => {
        const result = await forumService.handleLike(props.id);
        setIsLike(result.data.isLike);
    };

    return (
        <div className={cls("forum_item")}>
            <div className={cls("header")}>
                <img
                    src={
                        process.env.REACT_APP_URL +
                        (props.auth.avatar
                            ? props.auth.avatar
                            : "/media/avatars/default.jpg")
                    }
                    alt=""
                />
                <div className={cls("username")}>{props.auth.username}</div>
            </div>
            <div className={cls("body")}>
                <div className={cls("text")}>{parse(props.content)}</div>
                <div className={cls("list_img")}>
                    <ImageGrid
                        images={props.media.map(
                            (value) => process.env.REACT_APP_URL + value.file
                        )}
                    />
                </div>
            </div>
            <div className={cls("footer")}>
                <div className={cls("like")}>
                    {isLike ? (
                        <AiFillHeart
                            style={{ color: "red" }}
                            onClick={handleLike}
                        />
                    ) : (
                        <AiOutlineHeart onClick={handleLike} />
                    )}
                </div>
                <div className={cls("Comment")}>
                    <FaRegComment onClick={() => setShowComment(true)} />
                </div>
            </div>
            {showComment && <Comment post_id={props.id} />}
        </div>
    );
};

interface Props {
    id: string;
    auth: {
        username: string;
        avatar: string;
    };
    date: string;
    content: string;
    media: {
        file: string;
    }[];
}

export default memo(ForumItem);
