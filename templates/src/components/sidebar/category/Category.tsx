import React from "react";
import style from "./Category.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cls = classNames.bind(style);

interface CategoryType {
    title: string;
    count: number;
}

interface Props {
    categories: CategoryType[];
}

const Category = ({ categories }: Props): JSX.Element => {
    return (
        <div className={cls("category")}>
            <div className={cls("title")}>
                <h3>Categories</h3>
            </div>
            <div className={cls("content")}>
                <ul>
                    {categories.map((value, index) => {
                        return (
                            <li key={index}>
                                <Link
                                    to={"/category/" + value.title}
                                    className={cls("label_name")}
                                >
                                    {value.title}
                                    <span className={cls("label_count")}>
                                        ({value.count})
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Category;
