import style from "./Modal.module.scss";
import classNames from "classnames/bind";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Modal.css";
import { GiCancel } from "react-icons/gi";
import { memo } from "react";

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
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: index,
    };
    return (
        <div className={cls("modal")}>
            <div className={cls("close")} onClick={() => close()}>
                <GiCancel />
            </div>
            <Slider {...settings}>
                {images.map((value, index) => {
                    return <img src={value} key={index} alt="" />;
                })}
            </Slider>
        </div>
    );
};

export default memo(Modal);
