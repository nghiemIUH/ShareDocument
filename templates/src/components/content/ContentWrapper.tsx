import * as React from "react";
import style from "./ContentWrapper.module.scss";
import classNames from "classnames/bind";
import Sidebar from "../sidebar/Sidebar";

const cls = classNames.bind(style);

interface Props {
    Component: JSX.Element;
}

const ContentWrapper = ({ Component }: Props): JSX.Element => {
    return (
        <div className={cls("content_wrapper")}>
            <div className={cls("container")}>
                <div className={cls("main_wrapper")}>{Component}</div>
                <div className={cls("sidebar")}>
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default ContentWrapper;
