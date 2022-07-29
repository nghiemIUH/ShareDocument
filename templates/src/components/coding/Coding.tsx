import { useState } from "react";
import style from "./Coding.module.scss";
import classNames from "classnames/bind";
import Course from "./course/Course";
import CompoundExercise from "./compound_exercise/CompoundExercise";
import Challeng from "./challeng/Challeng";

const cls = classNames.bind(style);

const Coding = () => {
    const [tab, setTab] = useState("course");
    return (
        <div className={cls("coding")}>
            <div className={cls("menu")}>
                <div
                    onClick={() => setTab("course")}
                    style={
                        tab === "course"
                            ? { borderBottom: "3px solid #1ba94c" }
                            : {}
                    }
                >
                    Khóa học
                </div>
                <div
                    onClick={() => setTab("exercise")}
                    style={
                        tab === "exercise"
                            ? { borderBottom: "3px solid #1ba94c" }
                            : {}
                    }
                >
                    Bài tập tổng hợp
                </div>
                <div
                    onClick={() => setTab("challeng")}
                    style={
                        tab === "challeng"
                            ? { borderBottom: "3px solid #1ba94c" }
                            : {}
                    }
                >
                    Thử thách
                </div>
            </div>
            <div className={cls("content")}>
                {tab === "course" ? (
                    <Course />
                ) : tab === "exercise" ? (
                    <CompoundExercise />
                ) : (
                    <Challeng />
                )}
            </div>
        </div>
    );
};

export default Coding;
