import { memo } from "react";
import style from "./PostItem.module.scss";
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
    post: PostType;
}

const cls = classNames.bind(style);

function PostItem({ post }: Props) {
    return (
        <div className={cls("post_item")}>
            <div className={cls("post_image")}>
                <Link to={"/post-detail/" + post.slug}>
                    <img
                        src={process.env.REACT_APP_URL + post.review_image}
                        alt=""
                    />
                </Link>
            </div>
            <div className={cls("post_info")}>
                <h2 className={cls("post_title")}>
                    <Link to={"/post-detail/" + post.slug}>{post.title}</Link>
                </h2>
                <div className={cls("post_footer")}>
                    <div className={cls("post_meta")}>
                        <span className={cls("post_author")}>
                            {post.auth.fullName}
                        </span>
                        <span className={cls("post_date")}>{post.date}</span>
                    </div>
                    <p className={cls("post_snippet")}>{post.introduce}</p>
                </div>
            </div>
        </div>
    );
}

export default memo(PostItem);
