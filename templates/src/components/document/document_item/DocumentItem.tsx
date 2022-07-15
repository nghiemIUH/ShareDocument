import React from "react";
import style from "./DocumentItem.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cls = classNames.bind(style);

interface Props {
    title: string;
    date: string;
    view: number;
    review_img: string;
    slug: string;
}

const DocumentItem = ({ title, date, view, review_img, slug }: Props) => {
    return (
        <div className={cls("document_item")}>
            <Link to={"/detail/" + slug}>
                <img src={process.env.REACT_APP_URL + review_img} alt="" />
            </Link>
            <div className={cls("document_content")}>
                <Link to={"/detail/" + slug}>
                    <h4>{title}</h4>
                </Link>
                <div className={cls("meta")}>
                    <div className={cls("date")}>
                        <span></span>
                        {date}
                    </div>
                    <div className={cls("view")}>
                        <span></span>
                        {view}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentItem;
