import { useState, FormEvent, useEffect } from "react";
import style from "./Login.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import userAPI from "../../redux/user/userAPI";
import { useNavigate } from "react-router-dom";

const cls = classNames.bind(style);

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const userState = useAppSelector((state) => state.user);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        dispatch(userAPI.login()({ username, password }));
    };

    useEffect(() => {
        if (userState.is_login) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState]);

    return (
        <div className={cls("login_wrapper")}>
            <div className={cls("login")}>
                <div className={cls("login_title")}>
                    <div>Đăng nhập</div>
                    <div>
                        <Link to="/register">Đăng ký</Link>
                    </div>
                </div>
                <form action="" onSubmit={handleLogin}>
                    <div className={cls("form_group")}>
                        <label htmlFor="">Tài khoản</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={cls("form_group")}>
                        <label htmlFor="">Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Đăng nhập</button>
                </form>
                <div className={cls("login_or")}>
                    <div></div>
                    <div>or</div>
                    <div></div>
                </div>
                <button className={cls("login_gg")}>
                    <span></span> Login with Google
                </button>
            </div>
        </div>
    );
}

export default Login;
