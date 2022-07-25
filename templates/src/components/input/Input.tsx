import React, { ChangeEventHandler, FocusEvent } from "react";
import style from "./Input.module.scss";
import classNames from "classnames/bind";
import { validate } from "./validate";

const cls = classNames.bind(style);

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    name: string;
    rule: string;
    id: string;
    type: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement> | undefined;
    placeholder?: string;
}

const Input = ({
    className,
    name,
    rule,
    id,
    type,
    value,
    onChange,
    placeholder,
}: Props): JSX.Element => {
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        validate(e.target);
    };

    return (
        <div className={cls("input") + " " + className} id={id}>
            <div
                className={cls("error_message")}
                id={"error_message_" + id}
            ></div>
            {
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    id={"input_" + id}
                    onBlur={(e) => handleBlur(e)}
                    data-rule={rule}
                    placeholder={placeholder}
                />
            }
        </div>
    );
};

export default React.memo(Input);
