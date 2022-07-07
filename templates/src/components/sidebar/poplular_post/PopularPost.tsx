import React from "react";
import style from "./PopularPost.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cls = classNames.bind(style);

function PopularPost() {
    return (
        <div className={cls("popular_post")}>
            <div className={cls("title")}>
                <h3>Popular Posts</h3>
            </div>
            <div className={cls("content")}>
                <div className={cls("post")}>
                    <div className={cls("post_content")}>
                        <Link to="/" className={cls("post_image_link")}>
                            <img src="s11.jpg" alt="" />
                        </Link>
                        <div className={cls("post_info")}>
                            <h2 className={cls("post_title")}>
                                <Link to="/">
                                    Easiest Ice Cream You'll Ever Make. No
                                    Ice-cream Maker
                                </Link>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cls("content")}>
                <div className={cls("post")}>
                    <div className={cls("post_content")}>
                        <Link to="/" className={cls("post_image_link")}>
                            <img src="s11.jpg" alt="" />
                        </Link>
                        <div className={cls("post_info")}>
                            <h2 className={cls("post_title")}>
                                <Link to="/">
                                    Easiest Ice Cream You'll Ever Make. No
                                    Ice-cream Maker
                                </Link>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cls("content")}>
                <div className={cls("post")}>
                    <div className={cls("post_content")}>
                        <Link to="/" className={cls("post_image_link")}>
                            <img src="s11.jpg" alt="" />
                        </Link>
                        <div className={cls("post_info")}>
                            <h2 className={cls("post_title")}>
                                <Link to="/">
                                    Easiest Ice Cream You'll Ever Make. No
                                    Ice-cream Maker
                                </Link>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cls("content")}>
                <div className={cls("post")}>
                    <div className={cls("post_content")}>
                        <Link to="/" className={cls("post_image_link")}>
                            <img src="s11.jpg" alt="" />
                        </Link>
                        <div className={cls("post_info")}>
                            <h2 className={cls("post_title")}>
                                <Link to="/">
                                    Easiest Ice Cream You'll Ever Make. No
                                    Ice-cream Maker
                                </Link>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopularPost;
