import React from "react";
import style from "./HotWrapper.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cls = classNames.bind(style);

function HotWrapper() {
    return (
        <div className={cls("hot_wrapper")}>
            <div className={cls("hot_item")}>
                <Link to="/" className={cls("img_inner_link")}>
                    <img src="s2.jpg" alt="" />
                </Link>
                <div className={cls("post_info")}>
                    <span className={cls("post_tag")}>IT</span>
                    <h2 className={cls("post_title")}>
                        <Link to="/">
                            Senators Introduce Bill to Safely Bring Back
                            Cruising in US
                        </Link>
                    </h2>
                    <div className={cls("post_meta")}>
                        <span className={cls("post_author")}>
                            Dang Van Nghiem
                        </span>
                        <span className={cls("post_date")}>March 17, 2016</span>
                    </div>
                </div>
            </div>

            <div className={cls("hot_item")}>
                <Link to="/" className={cls("img_inner_link")}>
                    <img src="s2.jpg" alt="" />
                </Link>
                <div className={cls("post_info")}>
                    <span className={cls("post_tag")}>IT</span>
                    <h2 className={cls("post_title")}>
                        <Link to="/">
                            Senators Introduce Bill to Safely Bring Back
                            Cruising in US
                        </Link>
                    </h2>
                    <div className={cls("post_meta")}>
                        <span className={cls("post_author")}>
                            Dang Van Nghiem
                        </span>
                        <span className={cls("post_date")}>March 17, 2016</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HotWrapper;
