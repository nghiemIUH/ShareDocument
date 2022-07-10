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

const Post = (): JSX.Element => {
    const [next, setNext] = useState("/post/get-post/");

    const [newPost, setNewPost] = useState<PostType>({
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
    });

    const [hotPost, setHotPost] = useState<PostType[]>([]);
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        const res = async () => await postService.getPost(next);
        res().then((result) => {
            const data = result.data;
            setNext((prev) =>
                data.next?.replace(process.env.REACT_APP_URL, "")
            );
            setNewPost((prev) => {
                return { ...prev, ...data.results[0] };
            });
            setHotPost((prev) => {
                return data.results.slice(1, 3);
            });

            setPosts((prev) => {
                return data.results.slice(3);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadMoreData = async () => {
        if (next) {
            const result = await postService.getPost(next);
            setPosts((prev) => {
                return [...prev, ...result.data.results];
            });

            setNext((prev) => {
                return result.data.next?.replace(process.env.REACT_APP_URL, "");
            });
        }
    };

    return (
        <div className={cls("post")}>
            {newPost.id !== "" && <NewPost post={newPost} />}
            <HotWrapper posts={hotPost} />
            <div className={cls("blog_post")}>
                {posts.map((value, index) => {
                    return <PostItem post={value} key={index} />;
                })}
            </div>

            {next === "" && (
                <div className={cls("blog_page")}>
                    <div onClick={loadMoreData}>Load more posts</div>
                </div>
            )}
        </div>
    );
};

export default Post;
