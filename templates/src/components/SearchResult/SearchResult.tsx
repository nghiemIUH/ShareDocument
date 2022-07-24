import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import postService from "../../services/post.service";
import style from "./SearchResult.module.scss";
import classNames from "classnames/bind";
import PostItem from "../post/post_item/PostItem";

const cls = classNames.bind(style);
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

const SearchResult = () => {
    const searchParams = useSearchParams();
    const [post, setPost] = useState<{ next: string; posts: PostType[] }>({
        next: "",
        posts: [],
    });

    useEffect(() => {
        const res = async () => {
            const url =
                "/post/search/?keyword=" + searchParams[0].get("keyword");
            return await postService.search(url);
        };

        res().then((result) => {
            setPost((prev) => {
                return {
                    next: result.data.next?.replace(
                        process.env.REACT_APP_URL,
                        ""
                    ),
                    posts: result.data.results,
                };
            });
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams[0]]);

    return (
        <div className={cls("search")}>
            <div className={cls("blog_post")}>
                {post.posts.map((value, index) => {
                    return <PostItem post={value} key={index} />;
                })}
            </div>
        </div>
    );
};

export default SearchResult;
