import React from "react";
import style from "./Footer.module.scss";
import classNames from "classnames/bind";

const cls = classNames.bind(style);

const Footer = (): JSX.Element => {
    return (
        <div className={cls("footer")}>
            <div className={cls("container")}>
                <div className={cls("content")}>
                    Blog designed with <span className={cls("heart")}></span> by
                    nghiem
                </div>
            </div>
        </div>
    );
};

export default Footer;
