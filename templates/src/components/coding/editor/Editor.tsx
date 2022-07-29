import { ChangeEvent, useState } from "react";
import style from "./Editor.module.scss";
import classNames from "classnames/bind";
import { default as E } from "@monaco-editor/react";
import "./Editor.css";
import { FcCancel } from "react-icons/fc";

const cls = classNames.bind(style);

const Editor = () => {
    const [value, setValue] = useState("");
    const [language, setLanguage] = useState("python");

    const handleEditorChange = (value: any) => {
        setValue(value);
    };

    const handleChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setLanguage((prev) => val);
        setValue((prev) =>
            val === "python"
                ? "# code"
                : val === "javascript"
                ? "// code"
                : val === "java"
                ? "// code"
                : "// code"
        );
    };

    return (
        <div id="container" className={cls("editor")}>
            <div className={cls("even")}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
                adipisci tempore consequuntur porro iste nulla est facilis
                optio! Facere hic nesciunt nemo sequi magnam illum neque eos
                corporis omnis quaerat.
            </div>
            <div className={cls("edit")}>
                <div className={cls("language")}>
                    <select name="" id="" onChange={handleChangeLanguage}>
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="c">C++</option>
                        <option value="java">Java</option>
                    </select>
                </div>
                <E
                    height="50%"
                    width="100%"
                    language={language}
                    value={value}
                    defaultValue="# code"
                    onChange={handleEditorChange}
                />
                <div className={cls("submit")}>
                    <button>Submit</button>
                    <div className={cls("result_content")}>
                        <div className={cls("result")}>Wrong Answer :(</div>
                        <div className={cls("result_testcase")}>
                            <div className={cls("left")}>
                                <div>
                                    <FcCancel />
                                    Sample test case 0
                                </div>
                                <div>
                                    <FcCancel />
                                    Sample test case 1
                                </div>
                            </div>
                            <div className={cls("right")}>
                                <div className={cls("inputs")}>
                                    <div className={cls("input_tlt")}>
                                        Input
                                    </div>
                                    {[1, 4, 6].map((value, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={cls("input_val")}
                                            >
                                                <div>{index}</div>
                                                <div>{value}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={cls("your_output")}>
                                    <div className={cls("your_output_tlt")}>
                                        Your Output
                                    </div>
                                    <div>~ no response on stdout ~</div>
                                </div>
                                <div className={cls("expected_output")}>
                                    <div className={cls("expected_output_tlt")}>
                                        Expected Output
                                    </div>
                                    <div>Weird</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editor;
