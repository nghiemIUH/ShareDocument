import { useState, useEffect } from "react";
import style from "./Forum.module.scss";
import classNames from "classnames/bind";
import ForumItem from "./forumItem/ForumItem";
import { useAppSelector } from "../../redux/hooks";
import forumService from "../../services/forum.service";
import ModalUpload from "./modal_upload/ModalUpload";

const cls = classNames.bind(style);
const Forum = () => {
    const currentUser = useAppSelector((state) => state.user);
    const [post, setPost] = useState<Post[]>([]);
    const [nextPost, setNextPost] = useState<string | null>("/forum/post/");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const res = async () => {
            return await forumService.getPost(nextPost as string);
        };
        res().then((result) => {
            setNextPost((prev) => result.data.next);
            setPost((prev) => [...prev, ...result.data.results]);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cls("forum")}>
            <div className={cls("writting")}>
                <img
                    src={
                        process.env.REACT_APP_URL +
                        (currentUser.user.avatar
                            ? currentUser.user.avatar
                            : "/media/avatars/default.jpg")
                    }
                    alt=""
                />
                <div onClick={() => setShowModal(true)}>
                    Chia sẻ hoặc đặt câu hỏi tại đây
                </div>
            </div>
            <ModalUpload showModal={showModal} setShowModal={setShowModal} />

            {post.map((value, index) => {
                return <ForumItem {...value} key={index} />;
            })}
        </div>
    );
};

interface Post {
    id: string;
    auth: {
        username: string;
        avatar: string;
    };
    date: string;
    content: string;
    media: {
        file: string;
    }[];
}

export default Forum;
