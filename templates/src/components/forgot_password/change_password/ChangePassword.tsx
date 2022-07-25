import { FormEvent, useState } from "react";
import style from "./ChangePassword.module.scss";
import classNames from "classnames/bind";
import Input from "../../input/Input";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useParams } from "react-router-dom";
import authService from "../../../services/auth.service";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cls = classNames.bind(style);

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState("password");
    const [password, setPassword] = useState("");
    const [display, setDisplay] = useState(false);
    const params = useParams();

    const handleChangePassword = async (e: FormEvent) => {
        e.preventDefault();
        await authService
            .handleResetPassword({
                ...params,
                password,
            } as any)
            .then((result) => {
                setDisplay(true);
            })
            .catch((error) => {
                toast.error("Đã xảy ra lỗi vui lòng thử lại sau", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    return display ? (
        <div className={cls("change_password_success")}>
            <h3>Đổi mật khẩu thành công</h3>
            <Link to="/login">Đăng nhập</Link>
        </div>
    ) : (
        <div className={cls("change_password")}>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <h3>Khôi phục mật khẩu</h3>
            <form action="" onSubmit={handleChangePassword}>
                <div className={cls("form_group")}>
                    <Input
                        type={showPassword}
                        name="password"
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                        rule="required"
                        id="password"
                        placeholder="Mật khẩu mới"
                    />
                    {showPassword === "password" ? (
                        <AiFillEye onClick={() => setShowPassword("text")} />
                    ) : (
                        <AiFillEyeInvisible
                            onClick={() => setShowPassword("password")}
                        />
                    )}
                </div>
                <div>
                    <button type="submit">Xác nhận</button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
