import React from "react";
import style from "./DocumentItem.module.scss";
import classNames from "classnames/bind";

const cls = classNames.bind(style);

interface Props {
    title: string;
    date: string;
    view: number;
    review_img: string;
    slug: string;
    file: string;
}

const DocumentItem = ({ title, date, view, review_img, slug, file }: Props) => {
    return (
        <div className={cls("document_item")}>
            <a href={process.env.REACT_APP_URL + file}>
                <img src={process.env.REACT_APP_URL + review_img} alt="" />
            </a>
            <div className={cls("document_content")}>
                <a href={process.env.REACT_APP_URL + file}>
                    <h4>{title}</h4>
                </a>
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
