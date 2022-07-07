import React from "react";
import style from "./Tag.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cls = classNames.bind(style);

function Tag() {
    return (
        <div className={cls("tag")}>
            <div className={"title"}>
                <h3>Tags</h3>
            </div>
            <div className={cls("content")}>
                <Link to="">machine learning</Link>
                <Link to="">NLP</Link>
                <Link to="">opencv</Link>
                <Link to="">Nodejs</Link>
                <Link to="">JavaScript</Link>
            </div>
        </div>
    );
}

export default Tag;
