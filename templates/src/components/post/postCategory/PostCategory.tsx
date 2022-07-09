import { useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";
import postService from "../../../services/post.service";
import PostItem from "../post_item/PostItem";
import style from "./PostCategory.module.scss";
import classNames from "classnames/bind";

const cls = classNames.bind(style);

function PostCategory() {
    const location = useLocation();
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        const res = async () =>
            await postService.getPostCategory(location.pathname);
        res().then((result) => {
            setPosts(result.data);
        });
    }, [location]);

    return (
        <div className={cls("post_category")}>
            {posts.map((post, index) => {
                return <PostItem post={post} key={index} />;
            })}
        </div>
    );
}

interface PostType {
    id: string;
    introduce: string;
    title: string;
    slug: string;
    review_image: string;
    date: string;
    content: string;
    auth: {
        username: string;
        avatar: string;
        fullName: string;
        email: string;
    };
}

export default memo(PostCategory);
