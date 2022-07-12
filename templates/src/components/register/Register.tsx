import { FormEvent, useState } from "react";
import style from "./Register.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import authService from "../../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../input/Input";
import { isAllowSubmit } from "../input/validate";

const cls = classNames.bind(style);

const Register = (): JSX.Element => {
    const [showPassword, setShowPassword] = useState("password");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        if (!isAllowSubmit("form_register")) {
            toast.error("Vui lòng kiểm tra lại thông tin", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false;
        }

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("fullName", fullName);
        if (avatar) formData.append("avatar", avatar as File, avatar?.name);
        try {
            await authService.register(formData);
            navigate("/login");
        } catch (error) {
            toast.error("Có lỗi xảy ra vui lòng thử lại sau", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className={cls("register_wrapper")}>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={cls("register")}>
                <form action="" onSubmit={handleRegister} id="form_register">
                    <div className={cls("form_avtar")}>
                        <img
                            src={
                                avatar
                                    ? URL.createObjectURL(avatar)
                                    : "avatar-default-icon.png"
                            }
                            alt=""
                        />
                        <label htmlFor="avatar">Chọn ảnh</label>
                        <input
                            type="file"
                            hidden
                            id="avatar"
                            accept=".gif,.jpg,.jpeg,.png"
                            onChange={(e) => {
                                const fileList = e.target.files;
                                if (!fileList) return;
                                setAvatar((prev) => {
                                    return fileList[0];
                                });
                            }}
                        />
                    </div>
                    <div className={cls("form_group")}>
                        <label htmlFor="">Tài khoản</label>
                        <Input
                            type="text"
                            name="username"
                            rule="required"
                            id="username"
                            value={username}
                            onChange={(e: any) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                    <div className={cls("form_password")}>
                        <label htmlFor="">Mật khẩu</label>
                        <div>
                            <Input
                                type={showPassword}
                                name="password"
                                value={password}
                                onChange={(e: any) =>
                                    setPassword(e.target.value)
                                }
                                rule="required"
                                id="password"
                            />

                            {showPassword === "password" ? (
                                <AiFillEye
                                    onClick={() => setShowPassword("text")}
                                />
                            ) : (
                                <AiFillEyeInvisible
                                    onClick={() => setShowPassword("password")}
                                />
                            )}
                        </div>
                    </div>
                    <div className={cls("form_group")}>
                        <label htmlFor="">Họ tên</label>
                        <Input
                            type="text"
                            name="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            id="fullName"
                            rule="required"
                        />
                    </div>
                    <div className={cls("form_group")}>
                        <label htmlFor="">Email</label>
                        <Input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            rule="required|email"
                        />
                    </div>
                    <button type="submit">Đăng ký</button>
                </form>
                <div className={cls("redirect")}>
                    <Link to="/login">Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
