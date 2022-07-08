import { useState, useEffect } from "react";
import style from "./Post.module.scss";
import classNames from "classnames/bind";
import NewPost from "./new_post/NewPost";
import HotWrapper from "./hot_wrapper/HotWrapper";
import PostItem from "./post_item/PostItem";
import postService from "../../services/post.service";

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

interface PostStateType {
    next: string | null;
    newPost: PostType;
    hotPost: PostType[];
    posts: PostType[];
}

function Post() {
    const [post, setPost] = useState<PostStateType>({
        next: "/post/get-post/",
        newPost: {
            id: "",
            introduce: "",
            title: "",
            slug: "",
            review_image: "",
            date: "",
            content: "",
            auth: {
                username: "",
                avatar: "",
                fullName: "",
                email: "",
            },
        },
        hotPost: [],
        posts: [],
    });

    useEffect(() => {
        const res = async () => await postService.getPost(post.next as string);
        res().then((result) => {
            const data = result.data;
            setPost((prev) => {
                return {
                    ...prev,
                    next: data.next.replace(process.env.REACT_APP_URL, ""),
                    newPost: data.results[0],
                    hotPost: data.results.slice(1, 3),
                    posts: data.results.slice(3),
                };
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadMoreData = async () => {
        if (post.next) {
            const result = await postService.getPost(post.next);
            setPost((prev) => {
                return {
                    ...prev,
                    posts: [...prev.posts, ...result.data.results],
                    next: result.data.next?.replace(
                        process.env.REACT_APP_URL,
                        ""
                    ),
                };
            });
        }
    };

    return (
        <div className={cls("post")}>
            {post.newPost.id !== "" && <NewPost post={post.newPost} />}
            <HotWrapper posts={post.hotPost} />
            <div className={cls("blog_post")}>
                {post.posts.map((value, index) => {
                    return <PostItem post={value} key={index} />;
                })}
            </div>
            <div className={cls("blog_page")}>
                <div onClick={loadMoreData}>Load more posts</div>
            </div>
        </div>
    );
}

export default Post;
