import { useState, useEffect, memo } from "react";
import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { GiCancel } from "react-icons/gi";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import userAPI from "../../redux/user/userAPI";

const cls = classNames.bind(style);

const Header = (): JSX.Element => {
    const userState = useAppSelector((state) => state.user);
    const [toggleUser, setToggleUser] = useState(false);

    const [showSearch, setShowSearch] = useState(false);
    const [showToggle, setShowToggle] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const closeToggleUser = (event: Event) => {
            const toggle = document.getElementById(
                "account_username"
            ) as HTMLDivElement;
            if (userState.is_login) {
                if (!toggle.contains(event.target as Node)) {
                    setToggleUser(false);
                }
            }
        };

        document.addEventListener("click", closeToggleUser);
        return () => document.removeEventListener("click", closeToggleUser);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = () => {
        dispatch(userAPI.logout()());
    };

    return (
        <div className={cls("header")}>
            <div
                className={cls("header_toggle")}
                onClick={() => setShowToggle((prev) => !prev)}
            ></div>
            <div className={cls("header_logo")}>
                Hello <span>.</span> Dev
            </div>

            <div
                className={cls("header_mobile_wrap")}
                style={
                    showToggle
                        ? {
                              display: "block",
                              visibility: "visible",
                              opacity: 1,
                              zIndex: 3,
                          }
                        : { zIndex: -1 }
                }
            >
                <div className={cls("mobile_menu")}>
                    <ul>
                        <li onClick={() => setShowToggle(false)}>
                            <Link to="/">Trang chủ</Link>
                        </li>

                        <li onClick={() => setShowToggle(false)}>
                            <Link to="/document">Tài liệu</Link>
                        </li>
                        <li onClick={() => setShowToggle(false)}>
                            <Link to="/qa">Hỏi đáp</Link>
                        </li>
                        {!userState.is_login && (
                            <>
                                <li onClick={() => setShowToggle(false)}>
                                    <Link to="/login">Đăng nhập</Link>
                                </li>
                                <li onClick={() => setShowToggle(false)}>
                                    <Link to="/register">Đăng ký</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            <div className={cls("header_menu")}>
                <ul>
                    <li>
                        <Link to="/">Trang chủ</Link>
                    </li>
                    <li>
                        <Link to="/document">tài liệu</Link>
                    </li>
                    <li>
                        <Link to="/qa">Hỏi đáp</Link>
                    </li>
                </ul>
            </div>
            <div
                className={cls("header_search")}
                style={
                    showSearch
                        ? { opacity: 1, visibility: "visible" }
                        : { opacity: 0, visibility: "hidden" }
                }
            >
                <form action="">
                    <input type="text" placeholder="Search this blog..." />
                    <GiCancel onClick={() => setShowSearch(false)} />
                </form>
            </div>
            <div className={cls("btn_search")}>
                <BiSearch onClick={() => setShowSearch(true)} />
            </div>
            {userState.is_login ? (
                <div className={cls("header_account_loged")}>
                    <div className={cls("header_account_avatar")}>
                        <img
                            src={
                                userState.user.avatar
                                    ? process.env.REACT_APP_URL +
                                      userState.user.avatar
                                    : "/avatar-default-icon.png"
                            }
                            alt=""
                        />
                    </div>
                    <div
                        className={cls("header_account_username")}
                        onClick={() => setToggleUser((prev) => !prev)}
                        style={
                            toggleUser
                                ? { borderBottom: "2px solid #203656" }
                                : {}
                        }
                        id="account_username"
                    >
                        {userState.user.username}
                        <span
                            style={
                                toggleUser
                                    ? { transform: "rotate(180deg)" }
                                    : {}
                            }
                        ></span>
                        <div
                            className={cls("account_submenu")}
                            style={
                                toggleUser
                                    ? { opacity: "1", visibility: "visible" }
                                    : {}
                            }
                        >
                            <div className={cls("setting_account")}>
                                Cài đặt tài khoản
                            </div>
                            <div
                                className={cls("logout")}
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cls("header_account")}>
                    <ul>
                        <li>
                            <Link to="/login">Đăng nhập</Link>
                        </li>
                        <li>
                            <Link to="/register">Đăng ký</Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default memo(Header);
