import React from "react";
import style from "./Post.module.scss";
import classNames from "classnames/bind";
import NewPost from "./new_post/NewPost";
import HotWrapper from "./hot_wrapper/HotWrapper";
import PostItem from "./post_item/PostItem";

const cls = classNames.bind(style);

function Post() {
    return (
        <div className={cls("post")}>
            <NewPost />
            <HotWrapper />
            <div className={cls("blog_post")}>
                <PostItem />
                <PostItem />
                <PostItem />
                <PostItem />
                <PostItem />
                <PostItem />
            </div>
            <div className={cls("blog_page")}>
                <div>Load more posts</div>
            </div>
        </div>
    );
}

export default Post;
