import React from "react";
import style from "./Category.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cls = classNames.bind(style);

function Category() {
    return (
        <div className={cls("category")}>
            <div className={cls("title")}>
                <h3>Categories</h3>
            </div>
            <div className={cls("content")}>
                <ul>
                    <li>
                        <Link to="/" className={cls("label_name")}>
                            Machine learning
                            <span className={cls("label_count")}>(3)</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className={cls("label_name")}>
                            Computer vision
                            <span className={cls("label_count")}>(3)</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className={cls("label_name")}>
                            Hacking
                            <span className={cls("label_count")}>(3)</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Category;
