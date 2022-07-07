import React from "react";
import { Link } from "react-router-dom";
import style from "./NewPost.module.scss";
import classNames from "classnames/bind";

const cls = classNames.bind(style);

function NewPost() {
    return (
        <div className={cls("new_post")}>
            <div className={cls("post_content")}>
                <Link to="/" className={cls("post-image-link")}>
                    <img src="s11.jpg" alt="" />
                </Link>
                <div className={cls("post_info")}>
                    <h2 className={cls("post_title")}>
                        <Link to="/">
                            Easiest Ice Cream You’ll Ever Make. No Ice-cream
                            Maker
                        </Link>
                    </h2>
                    <div className={cls("post_meta")}>
                        <span className={cls("post_author")}>
                            Dang Van Nghiem
                        </span>
                        <span className={cls("post_date")}>March 17, 2016</span>
                    </div>
                    <p className={cls("post_snippet")}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Maiores, perferendis magni impedit reprehenderit
                        doloremque vitae quisquam est cum voluptas. At rerum,
                        quam repellendus labore velit temporibus tempora dolore
                        omnis ratione?
                    </p>
                    <div className={cls("jump_link")}>
                        <Link to="/">Read more</Link>{" "}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPost;
