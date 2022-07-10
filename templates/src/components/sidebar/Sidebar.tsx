import React from "react";
import style from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import PopularPost from "./poplular_post/PopularPost";
import Category from "./category/Category";
import Tag from "./tag/Tag";
import { useAppSelector } from "../../redux/hooks";

const cls = classNames.bind(style);

const Sidebar = (): JSX.Element => {
    const baseData = useAppSelector((state) => state.post);

    return (
        <div className={cls("sidebar")}>
            <PopularPost posts={baseData.posts} />
            <Category categories={baseData.categories} />
            <Tag tags={baseData.tags} />
        </div>
    );
};

export default Sidebar;
