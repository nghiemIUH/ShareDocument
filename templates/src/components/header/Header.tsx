import { useState, useEffect, memo, FormEvent } from "react";
import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import userAPI from "../../redux/user/userAPI";
import { IoNotificationsOutline } from "react-icons/io5";
import notifyService from "../../services/notify.service";
import { useSocket } from "../../config/socket";

const cls = classNames.bind(style);

const Header = (): JSX.Element => {
    const userState = useAppSelector((state) => state.user);
    const [toggleUser, setToggleUser] = useState(false);
    const [showToggle, setShowToggle] = useState(false);
    const [showNote, setShowNote] = useState(false);
    const [notification, setNotification] = useState<NoteType[]>([]);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const socket = useSocket();

    useEffect(() => {
        const closeToggleUser = (event: Event) => {
            const toggle = document.getElementById(
                "account_username"
            ) as HTMLDivElement;
            if (userState.is_login) {
                if (!toggle.contains(event.target as Node)) {
                    setToggleUser((prev) => false);
                }
            }
        };

        document.addEventListener("click", closeToggleUser);
        return () => document.removeEventListener("click", closeToggleUser);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState]);

    useEffect(() => {
        const closeToggleUser = (event: Event) => {
            const toggle = document.getElementById("notify") as HTMLDivElement;
            if (userState.is_login) {
                if (!toggle.contains(event.target as Node)) {
                    setShowNote((prev) => false);
                }
            }
        };

        document.addEventListener("click", closeToggleUser);
        return () => document.removeEventListener("click", closeToggleUser);
    }, [userState]);

    const handleLogout = () => {
        dispatch(userAPI.logout()());
    };
    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        const keyword = ((e.target as any)[0] as HTMLInputElement).value;
        navigate("/search?keyword=" + keyword);
    };

    useEffect(() => {
        socket?.on("notification:" + userState.user.username, (data) => {
            setNotification((prev) => {
                return [data, ...prev];
            });
        });

        return () => {
            socket?.off("connect");
            socket?.off("disconnect");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState]);

    useEffect(() => {
        if (userState.is_login) {
            const res = async () => {
                return await notifyService.getNotification();
            };
            res().then((result) => {
                setNotification((prev) => {
                    return [...prev, ...result.data];
                });
            });
        }
    }, [userState]);

    const handleSeenNotify = async () => {
        const result = await notifyService.seen();
        if (result.status === 200) {
            setNotification((prev) => {
                prev.map((value) => {
                    return (value.seen = true);
                });
                return [...prev];
            });
        }
        setShowNote((prev) => !prev);
    };

    const handleReadNotify = async (id: string, url: string) => {
        const result = await notifyService.read(id);
        if (result.status === 200) navigate(url);
    };

    return (
        <div className={cls("header")}>
            <div
                className={cls("header_toggle")}
                onClick={() => setShowToggle((prev) => !prev)}
            ></div>
            <div className={cls("header_logo")}>
                <Link to="/">
                    <img src="/logo1.png" alt="" width="90px" />
                </Link>
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
                            <Link to="/forum">Diễn đàn</Link>
                        </li>
                        <li onClick={() => setShowToggle(false)}>
                            <Link to="/code">Luyện code</Link>
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
                        <li className={cls("search")}>
                            <form action="" onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="Search this blog..."
                                />
                                <button type="submit">
                                    <BiSearch />
                                </button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={cls("header_menu")}>
                <ul>
                    <li>
                        <Link to="/">Trang chủ</Link>
                    </li>
                    <li>
                        <Link to="/document">Tài liệu</Link>
                    </li>
                    <li>
                        <Link to="/forum">Diễn đàn</Link>
                    </li>
                    <li>
                        <Link to="/coding">Luyện code</Link>
                    </li>
                </ul>
            </div>
            <div className={cls("header_search")}>
                <form action="" onSubmit={handleSearch}>
                    <input type="text" placeholder="Search this blog..." />
                    <button type="submit">
                        <BiSearch />
                    </button>
                </form>
            </div>

            {userState.is_login ? (
                <div className={cls("header_account_loged")}>
                    <div className={cls("note")}>
                        <IoNotificationsOutline
                            onClick={handleSeenNotify}
                            id="notify"
                        />
                        <div className={cls("note_count")}>
                            {notification
                                .map((value) => {
                                    return value.seen ? 0 : 1;
                                })
                                .reduce((a: number, b: number) => {
                                    return a + b;
                                }, 0)}
                        </div>
                        <div
                            className={cls("note_expand")}
                            style={
                                showNote
                                    ? {
                                          display: "block",
                                          opacity: "1",
                                          visibility: "visible",
                                      }
                                    : {
                                          display: "none",
                                          opacity: "0",
                                          visibility: "hidden",
                                      }
                            }
                        >
                            {notification.map((value) => {
                                return (
                                    <div
                                        className={cls("note_item")}
                                        key={value.id}
                                    >
                                        <div
                                            onClick={() =>
                                                handleReadNotify(
                                                    value.id as string,
                                                    value.url
                                                )
                                            }
                                        >
                                            <img
                                                src={
                                                    process.env.REACT_APP_URL +
                                                    value.otherUser.avatar
                                                }
                                                alt=""
                                            />
                                            <div
                                                style={{
                                                    color: value.read
                                                        ? "#aaa"
                                                        : "#050505",
                                                }}
                                            >
                                                <span>
                                                    {value.otherUser.username +
                                                        " "}
                                                </span>
                                                {value.description}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
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

interface NoteType {
    id?: string;
    user: {
        username: string;
        avatar: string;
    };
    otherUser: {
        username: string;
        avatar: string;
    };
    url: string;
    description: string;
    read: boolean;
    seen: boolean;
}

export default memo(Header);
