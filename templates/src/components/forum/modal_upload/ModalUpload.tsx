import {
    useState,
    Dispatch,
    SetStateAction,
    ChangeEvent,
    memo,
    useRef,
} from "react";
import style from "./ModalUpload.module.scss";
import classNames from "classnames/bind";
import { IoCloseSharp } from "react-icons/io5";
import forumService from "../../../services/forum.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cls = classNames.bind(style);

const ModalUpload = ({
    showModal,
    setShowModal,
}: {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
    const [imagesPost, setImagesPost] = useState<File[]>([]);

    const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as FileList;
        setImagesPost((prev) => [...prev, ...(fileList as any)]);
    };
    const inputRef = useRef<HTMLDivElement>(null);
    const handleRemoveFile = (idx: number) => {
        setImagesPost((prev) => {
            const curState = [...prev];
            curState.splice(idx, 1);
            return curState;
        });
    };

    const handleUpload = async () => {
        if (
            ((inputRef.current?.innerHTML as string).length === 0 ||
                inputRef.current?.innerHTML === "Nội dung...") &&
            imagesPost.length === 0
        ) {
            toast.error("Vui lòng điền đầy đủ thông tin", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false;
        }
        const data = new FormData();
        data.append("content", inputRef.current?.innerHTML as string);
        for (const img of imagesPost) {
            data.append("images", img, img.name);
        }
        const result = await forumService.uploadPost(data);
        if (result.status === 200) {
            window.location.reload();
        } else {
            toast.error("Đã xảy ra lỗi vui lòng thử lại sau", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div
            className={cls("modal")}
            style={
                showModal
                    ? { opacity: 1, visibility: "visible", zIndex: 3 }
                    : { opacity: 0, visibility: "hidden", zIndex: -1 }
            }
        >
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
            <div className={cls("modal_content")}>
                <div className={cls("modal_header")}>
                    <div>Tạo bài viết</div>
                    <div
                        className={cls("modal_close")}
                        onClick={() => setShowModal(false)}
                    >
                        <IoCloseSharp />
                    </div>
                </div>
                <div className={cls("modal_body")}>
                    <div className={cls("content")}>
                        <div
                            className={cls("text")}
                            contentEditable={true}
                            suppressContentEditableWarning={true}
                            ref={inputRef}
                        >
                            Nội dung...
                        </div>
                        <div className={cls("images")}>
                            {imagesPost.map((value, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={cls("image_wrap")}
                                    >
                                        <IoCloseSharp
                                            onClick={() =>
                                                handleRemoveFile(index)
                                            }
                                        />
                                        <img
                                            src={URL.createObjectURL(value)}
                                            alt=""
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className={cls("modal_footer")}>
                    <div className={cls("choice_img")}>
                        <span>Thêm vào bài viết</span>
                        <label htmlFor="choice_img">
                            <i className={cls("icon_img")}></i>
                        </label>
                        <input
                            type="file"
                            id="choice_img"
                            hidden
                            onChange={handleUploadFile}
                        />
                    </div>
                    <div className={cls("btn_up")} onClick={handleUpload}>
                        Đăng
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ModalUpload);
