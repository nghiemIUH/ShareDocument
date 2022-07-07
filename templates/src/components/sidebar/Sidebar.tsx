import React from "react";
import style from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import PopularPost from "./poplular_post/PopularPost";
import Category from "./category/Category";
import Tag from "./tag/Tag";

const cls = classNames.bind(style);

function Sidebar() {
    return (
        <div className={cls("sidebar")}>
            <PopularPost />
            <Category />
            <Tag />
        </div>
    );
}

export default Sidebar;
