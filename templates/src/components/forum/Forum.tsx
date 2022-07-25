import { useState, useEffect, ChangeEvent, useCallback } from "react";
import style from "./Forum.module.scss";
import classNames from "classnames/bind";
import ForumItem from "./forumItem/ForumItem";
import { useAppSelector } from "../../redux/hooks";
import forumService from "../../services/forum.service";
import ModalUpload from "./modal_upload/ModalUpload";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const cls = classNames.bind(style);
const Forum = () => {
    const currentUser = useAppSelector((state) => state.user);
    const [post, setPost] = useState<Post[]>([]);
    const [nextPost, setNextPost] = useState<string | null>("/forum/post/");
    const [showModal, setShowModal] = useState(false);
    const [displayType, setDisplayType] = useState("accepted");

    useEffect(() => {
        const res = async () => {
            return await forumService.getPost(nextPost as string, displayType);
        };
        res().then((result) => {
            setNextPost((prev) =>
                result.data.next?.replace(process.env.REACT_APP_URL, "")
            );
            setPost((prev) => [...prev, ...result.data.results]);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayType]);

    const handleChangeDisplay = (e: ChangeEvent<HTMLSelectElement>) => {
        setDisplayType((prev) => e.target.value);
        setNextPost((prev) => "/forum/post/");
        setPost((prev) => []);
    };

    const handleAccept = useCallback(async (id: string) => {
        await forumService.accept(id);
        setPost((prev) => {
            const newState = prev.filter((value) => {
                return value.id !== id;
            });
            return [...newState];
        });
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        await forumService.delete(id);
        setPost((prev) => {
            const newState = prev.filter((value) => {
                return value.id !== id;
            });
            return [...newState];
        });
    }, []);

    return !currentUser.is_login ? (
        <div className={cls("not_login")}>
            <Helmet>
                <title>VNDev - Forum</title>
                <meta
                    name="description"
                    property="og:description"
                    content="Forum"
                />
                <meta property="og:title" content="VNDev - Forum" />
            </Helmet>
            <h4>Bạn vui lòng đăng nhập để sử dụng chức năng này</h4>
            <Link to="/login">Đăng nhập</Link>
        </div>
    ) : (
        <div className={cls("forum")}>
            <Helmet>
                <title>VNDev - Forum</title>
                <meta
                    name="description"
                    property="og:description"
                    content="Forum"
                />
                <meta property="og:title" content="VNDev - Forum" />
            </Helmet>
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
            {currentUser.user.is_superuser && (
                <select
                    className={cls("display")}
                    id="display"
                    onChange={handleChangeDisplay}
                >
                    <option value="accepted">Đã duyệt</option>
                    <option value="not_accept">Chưa duyệt</option>
                </select>
            )}

            {post.map((value, index) => {
                return (
                    <ForumItem
                        post={value}
                        handleAccept={handleAccept}
                        handleDelete={handleDelete}
                        key={index}
                    />
                );
            })}
        </div>
    );
};

interface Post {
    id: string;
    auth: {
        id: string;
        username: string;
        avatar: string;
    };
    date: string;
    content: string;
    media: {
        file: string;
    }[];
    accept: boolean;
}

export default Forum;
