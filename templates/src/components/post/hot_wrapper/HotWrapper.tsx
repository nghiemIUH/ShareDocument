import { memo } from "react";
import style from "./HotWrapper.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

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

interface Props {
    posts: PostType[];
}

const cls = classNames.bind(style);

function HotWrapper({ posts }: Props) {
    return (
        <div className={cls("hot_wrapper")}>
            {posts.map((value, index) => {
                return (
                    <div className={cls("hot_item")} key={index}>
                        <Link to="/" className={cls("img_inner_link")}>
                            <img
                                src={
                                    process.env.REACT_APP_URL +
                                    value.review_image
                                }
                                alt=""
                            />
                        </Link>
                        <div className={cls("post_info")}>
                            <span className={cls("post_tag")}>IT</span>
                            <h2 className={cls("post_title")}>
                                <Link to="/">{value.title}</Link>
                            </h2>
                            <div className={cls("post_meta")}>
                                <span className={cls("post_author")}>
                                    {value.auth.fullName}
                                </span>
                                <span className={cls("post_date")}>
                                    {value.date}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default memo(HotWrapper);
