import React from "react";
import style from "./Course.module.scss";
import classNames from "classnames/bind";
import { FaPython } from "react-icons/fa";
import { Link } from "react-router-dom";

const cls = classNames.bind(style);

const Course = () => {
    return (
        <div className={cls("course")}>
            <div className={cls("your_process")}>
                <h2>Your Process</h2>
                <div className={cls("list_process")}>
                    <div className={cls("process_item")}>
                        <h5>Your Process</h5>
                        <h1>Python</h1>
                        <FaPython />
                        <div className={cls("progressBar")}>
                            <div
                                style={{
                                    width: "60%",
                                }}
                            >
                                <span>{60 + "%"}</span>
                            </div>
                        </div>
                        <div className={cls("btn_solve")}>
                            <Link to="editor">Solve</Link>
                        </div>
                    </div>
                    <div className={cls("process_item")}>
                        <h5>Your Process</h5>
                        <h1>Python</h1>
                        <FaPython />
                        <div className={cls("progressBar")}>
                            <div
                                style={{
                                    width: "60%",
                                }}
                            >
                                <span>{60 + "%"}</span>
                            </div>
                        </div>
                        <div className={cls("btn_solve")}>
                            <Link to="editor">Solve</Link>
                        </div>
                    </div>
                    <div className={cls("process_item")}>
                        <h5>Your Process</h5>
                        <h1>Python</h1>
                        <FaPython />
                        <div className={cls("progressBar")}>
                            <div
                                style={{
                                    width: "60%",
                                }}
                            >
                                <span>{60 + "%"}</span>
                            </div>
                        </div>
                        <div className={cls("btn_solve")}>
                            <Link to="editor">Solve</Link>
                        </div>
                    </div>
                    {/* <div className={cls("process_item")}>
                        <h5>Your Process</h5>
                        <h1>Python</h1>
                        <FaPython />
                        <div className={cls("progressBar")}>
                            <div
                                style={{
                                    width: "60%",
                                }}
                            >
                                <span>{60 + "%"}</span>
                            </div>
                        </div>
                        <div className={cls("btn_solve")}>
                            <Link to="editor">Solve</Link>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Course;
