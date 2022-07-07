import React from "react";
import style from "./PostItem.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cls = classNames.bind(style);

function PostItem() {
    return (
        <div className={cls("post_item")}>
            <div className={cls("post_image")}>
                <Link to="/">
                    <img src="s2.jpg" alt="" />
                </Link>
            </div>
            <div className={cls("post_info")}>
                <h2 className={cls("post_title")}>
                    <Link to="/">
                        Senators Introduce Bill to Safely Bring Back Cruising in
                        US
                    </Link>
                </h2>
                <div className={cls("post_footer")}>
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
                </div>
            </div>
        </div>
    );
}

export default PostItem;
