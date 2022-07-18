import React from "react";
import style from "./ImageGrid.module.scss";
import classNames from "classnames/bind";
import Modal from "../modal/Modal";

const cls = classNames.bind(style);

const ImageGrid = ({ images }: { images: string[] }) => {
    return (
        <div className={cls("image_grid")}>
            {images.length === 1 ? (
                <ImageGrid1 images={images} />
            ) : images.length === 2 ? (
                <ImageGrid2 images={images} />
            ) : images.length === 3 ? (
                <ImageGrid3 images={images} />
            ) : images.length === 4 ? (
                <ImageGrid4 images={images} />
            ) : images.length === 5 ? (
                <ImageGrid5 images={images} />
            ) : (
                <ImageGrid6 images={images} />
            )}
        </div>
    );
};

interface Props {
    images: string[];
}
interface State {
    index: number;
    isShow: boolean;
}

class ImageGridBase extends React.Component<Props, State> {
    state: State = {
        index: 0,
        isShow: false,
    };

    handleShow(idx: number) {
        this.setState((state) => {
            return { ...state, index: idx, isShow: true };
        });
    }
    handleHidden() {
        this.setState((state) => {
            return { ...state, index: 0, isShow: false };
        });
    }
}

class ImageGrid1 extends ImageGridBase {
    render(): React.ReactNode {
        return (
            <div className={cls("grid1")}>
                <div
                    className={cls("grid_item_1")}
                    onClick={() => this.handleShow(0)}
                >
                    <img src={this.props.images[0]} alt="" />
                </div>
                {this.state.isShow && (
                    <Modal
                        images={this.props.images}
                        index={this.state.index}
                        close={this.handleHidden.bind(this)}
                    />
                )}
            </div>
        );
    }
}

class ImageGrid2 extends ImageGridBase {
    render(): React.ReactNode {
        return (
            <div className={cls("grid2")}>
                {this.props.images.map((values, index) => {
                    return (
                        <div
                            className={cls(`grid_item_${index + 1}`)}
                            key={index}
                            onClick={() => this.handleShow(index)}
                        >
                            <img src={values} alt="" />
                        </div>
                    );
                })}
                {this.state.isShow && (
                    <Modal
                        images={this.props.images}
                        index={this.state.index}
                        close={this.handleHidden.bind(this)}
                    />
                )}
            </div>
        );
    }
}

class ImageGrid3 extends ImageGridBase {
    render(): React.ReactNode {
        return (
            <div className={cls("grid3", "grid")}>
                {this.props.images.map((values, index) => {
                    return (
                        <div
                            className={cls(`grid_item_${index + 1}`)}
                            key={index}
                            onClick={() => this.handleShow(index)}
                        >
                            <img src={values} alt="" />
                        </div>
                    );
                })}
                {this.state.isShow && (
                    <Modal
                        images={this.props.images}
                        index={this.state.index}
                        close={this.handleHidden.bind(this)}
                    />
                )}
            </div>
        );
    }
}

class ImageGrid4 extends ImageGridBase {
    render(): React.ReactNode {
        return (
            <div className={cls("grid4", "grid")}>
                {this.props.images.map((values, index) => {
                    return (
                        <div
                            className={cls(`grid_item_${index + 1}`)}
                            key={index}
                            onClick={() => this.handleShow(index)}
                        >
                            <img src={values} alt="" />
                        </div>
                    );
                })}
                {this.state.isShow && (
                    <Modal
                        images={this.props.images}
                        index={this.state.index}
                        close={this.handleHidden.bind(this)}
                    />
                )}
            </div>
        );
    }
}

class ImageGrid5 extends ImageGridBase {
    render(): React.ReactNode {
        return (
            <div className={cls("grid5", "grid")}>
                {this.props.images.map((values, index) => {
                    return (
                        <div
                            className={cls(`grid_item_${index + 1}`)}
                            key={index}
                            onClick={() => this.handleShow(index)}
                        >
                            <img src={values} alt="" />
                        </div>
                    );
                })}
                {this.state.isShow && (
                    <Modal
                        images={this.props.images}
                        index={this.state.index}
                        close={this.handleHidden.bind(this)}
                    />
                )}
            </div>
        );
    }
}

class ImageGrid6 extends ImageGridBase {
    render(): React.ReactNode {
        return (
            <div className={cls("grid6", "grid")}>
                {this.props.images.map((values, index) => {
                    if (index < 5)
                        return (
                            <div
                                className={cls(`grid_item_${index + 1}`)}
                                key={index}
                                onClick={() => this.handleShow(index)}
                            >
                                <img src={values} alt="" />
                            </div>
                        );
                    else {
                        return <div key={index}></div>;
                    }
                })}
                <div
                    className={cls("grid_item_6")}
                    key={5}
                    onClick={() => this.handleShow(5)}
                >
                    {this.props.images.length > 6 && (
                        <div className={cls("more")}>
                            <h2>+ {this.props.images.length - 6}</h2>
                        </div>
                    )}
                    <img src={this.props.images[5]} alt="" />
                </div>
                {this.state.isShow && (
                    <Modal
                        images={this.props.images}
                        index={this.state.index}
                        close={this.handleHidden.bind(this)}
                    />
                )}
            </div>
        );
    }
}

export default React.memo(ImageGrid);
