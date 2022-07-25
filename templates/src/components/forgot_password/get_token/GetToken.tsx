import { FormEvent, useState } from "react";
import style from "./GetToken.module.scss";
import classNames from "classnames/bind";
import Input from "../../input/Input";
import authService from "../../../services/auth.service";

const cls = classNames.bind(style);

const GetToken = () => {
    const [email, setEmail] = useState("");
    const [isSend, setIsSend] = useState(false);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await authService.getRetPasswordToken(email);
        setIsSend(true);
    };
    return isSend ? (
        <div className={cls("get_token")}>
            Vui lòng kiểm tra mail để đổi mật khẩu mới
        </div>
    ) : (
        <div className={cls("get_token")}>
            <div>Vui lòng nhập địa chỉ email khôi phục</div>
            <form action="" onSubmit={handleSubmit}>
                <div className={cls("form_group")}>
                    <Input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        rule="required|email"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <button type="submit">Xác nhận</button>
                </div>
            </form>
        </div>
    );
};

export default GetToken;
