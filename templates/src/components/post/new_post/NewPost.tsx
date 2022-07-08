import { memo } from "react";
import { Link } from "react-router-dom";
import style from "./NewPost.module.scss";
import classNames from "classnames/bind";

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

function NewPost({ post }: Props) {
    return (
        <div className={cls("new_post")}>
            <div className={cls("post_content")}>
                <Link to="/" className={cls("post-image-link")}>
                    <img
                        src={process.env.REACT_APP_URL + post.review_image}
                        alt=""
                    />
                </Link>
                <div className={cls("post_info")}>
                    <h2 className={cls("post_title")}>
                        <Link to="/">{post.title}</Link>
                    </h2>
                    <div className={cls("post_meta")}>
                        <span className={cls("post_author")}>
                            {post.auth.fullName}
                        </span>
                        <span className={cls("post_date")}>{post.date}</span>
                    </div>
                    <p className={cls("post_snippet")}>{post.introduce}</p>
                    <div className={cls("jump_link")}>
                        <Link to="/">Read more</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(NewPost);
