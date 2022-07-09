import React from "react";
import style from "./PopularPost.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cls = classNames.bind(style);

interface Post {
    review_image: string;
    title: string;
    slug: string;
}

interface Props {
    posts: Post[];
}

function PopularPost({ posts }: Props) {
    return (
        <div className={cls("popular_post")}>
            <div className={cls("title")}>
                <h3>Popular Posts</h3>
            </div>
            {posts.map((value, index) => {
                return (
                    <div className={cls("content")} key={index}>
                        <div className={cls("post")}>
                            <div className={cls("post_content")}>
                                <Link
                                    to={"/post-detail/" + value.slug}
                                    className={cls("post_image_link")}
                                >
                                    <img
                                        src={
                                            process.env.REACT_APP_URL +
                                            value.review_image
                                        }
                                        alt=""
                                    />
                                </Link>
                                <div className={cls("post_info")}>
                                    <h2 className={cls("post_title")}>
                                        <Link to={"/post-detail/" + value.slug}>
                                            {value.title}
                                        </Link>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default PopularPost;
