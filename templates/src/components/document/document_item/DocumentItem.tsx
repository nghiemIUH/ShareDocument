import React from "react";
import style from "./DocumentItem.module.scss";
import classNames from "classnames/bind";
import documentService from "../../../services/document.service";
import dateFormate from "../../../config/fortmateDate";

const cls = classNames.bind(style);

interface Props {
    id: string;
    title: string;
    date: string;
    view: number;
    review_img: string;
    slug: string;
    file: string;
}

const DocumentItem = ({
    id,
    title,
    date,
    view,
    review_img,
    slug,
    file,
}: Props) => {
    const handleIncreaseView = async () => {
        await documentService.increaseView(id);
    };
    return (
        <div className={cls("document_item")}>
            <a
                href={process.env.REACT_APP_URL + file}
                onClick={handleIncreaseView}
            >
                <img src={process.env.REACT_APP_URL + review_img} alt="" />
            </a>
            <div className={cls("document_content")}>
                <a
                    href={process.env.REACT_APP_URL + file}
                    onClick={handleIncreaseView}
                >
                    <h4>{title}</h4>
                </a>
                <div className={cls("meta")}>
                    <div className={cls("date")}>
                        <span></span>
                        {dateFormate(new Date(date))}
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
