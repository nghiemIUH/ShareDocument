import React from "react";
import style from "./Comment.module.scss";
import classNames from "classnames/bind";
import { useAppSelector } from "../../../../redux/hooks";

const cls = classNames.bind(style);

const Comment = () => {
    const user = useAppSelector((state) => state.user);
    return (
        <div className={cls("comment")}>
            <div className={cls("list_comment")}>
                <div className={cls("comment_item")}>
                    <img src="logo1.png" alt="" />
                    <div className={cls("content")}>
                        <div className={cls("username")}>TestUser</div>
                        <p>Đâu ai muốn làm người bình thường khi yêu =))</p>
                    </div>
                </div>
            </div>
            <form action="" className={cls("form_comment")}>
                <img
                    src={process.env.REACT_APP_URL + user.user.avatar}
                    alt=""
                />
                <input type="text" placeholder="Trả lời..." />
            </form>
        </div>
    );
};

export default React.memo(Comment);
