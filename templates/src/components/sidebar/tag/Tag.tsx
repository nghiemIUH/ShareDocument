import React from "react";
import style from "./Tag.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cls = classNames.bind(style);

interface TagType {
    id: number;
    name: string;
}
interface Props {
    tags: TagType[];
}

function Tag({ tags }: Props) {
    return (
        <div className={cls("tag")}>
            <div className={"title"}>
                <h3>Tags</h3>
            </div>
            <div className={cls("content")}>
                {tags.map((value, index) => {
                    return (
                        <Link to="" key={index}>
                            {value.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default Tag;
