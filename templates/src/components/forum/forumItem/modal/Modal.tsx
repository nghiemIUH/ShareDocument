import style from "./Modal.module.scss";
import classNames from "classnames/bind";
import "./Modal.css";
import { GiCancel } from "react-icons/gi";
import { memo } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const cls = classNames.bind(style);
const Modal = ({
    images,
    index,
    close,
}: {
    images: string[];
    index: number;
    close: any;
}) => {
    return (
        <div className={cls("modal")}>
            <div className={cls("close")} onClick={() => close()}>
                <GiCancel />
            </div>

            <Swiper spaceBetween={50} slidesPerView={1}>
                {images.map((value, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <img src={value} alt="" />;
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default memo(Modal);
