import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import forumService from "../../../services/forum.service";
import ForumItem from "../forumItem/ForumItem";
import style from "./ForumDetailNotification.module.scss";
import classNames from "classnames/bind";

const cls = classNames.bind(style);

const ForumDetailNotification = () => {
    const location = useLocation();
    const [post, setPost] = useState<Post | null>(null);
    useEffect(() => {
        const res = async () => {
            return await forumService.getPostWithID(
                location.pathname.replace("/forum/", "")
            );
        };
        res().then((result) => {
            setPost(result.data);
        });
    }, [location.pathname]);

    return (
        <div className={cls("post_detail")}>
            {post && <ForumItem post={post} />}
        </div>
    );
};

interface Post {
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
}

export default ForumDetailNotification;
