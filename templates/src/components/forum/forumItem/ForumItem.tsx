import React from "react";
import style from "./ForumItem.module.scss";
import classNames from "classnames/bind";
import ImageGrid from "./imageGrid/ImageGrid";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import Comment from "./comment/Comment";
import parse from "html-react-parser";

const cls = classNames.bind(style);

const ForumItem = (props: Props) => {
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
                    <AiOutlineHeart />
                </div>
                <div className={cls("Comment")}>
                    <FaRegComment />
                </div>
            </div>
            <Comment />
        </div>
    );
};

interface Props {
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

export default React.memo(ForumItem);
