import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import postService from "../../../services/post.service";
import parse from "html-react-parser";
import style from "./PostDetail.module.scss";
import classNames from "classnames/bind";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import { has } from "lodash";

const cls = classNames.bind(style);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function unEscape(htmlStr: string) {
    htmlStr = htmlStr.replace(/&lt;/g, "<");
    htmlStr = htmlStr.replace(/&gt;/g, ">");
    htmlStr = htmlStr.replace(/&quot;/g, '"');
    htmlStr = htmlStr.replace(/&#39;/g, "'");
    htmlStr = htmlStr.replace(/&amp;/g, "&");
    return htmlStr;
}

const PostDetail = (): JSX.Element => {
    const location = useLocation();
    const [detail, setDetail] = useState<PostType>({
        id: "",
        introduce: "",
        title: "",
        slug: "",
        review_image: "",
        date: "",
        content: "",
        auth: {
            username: "",
            avatar: "",
            fullName: "",
            email: "",
        },
        tag: [],
    });

    useEffect(() => {
        if (global.document && has(global.window, "FB")) {
            (global as any).FB.XFBML.parse();
        }
    }, []);

    useEffect(() => {
        const res = async () => postService.getPostDetail(location.pathname);
        res().then((result) => {
            setDetail({
                ...result.data,
                content: unescape(result.data.content),
            });
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    useEffect(() => {
        document.querySelectorAll("pre code").forEach((el) => {
            hljs.highlightElement(el as HTMLElement);
        });

        document.querySelectorAll("img").forEach((el: HTMLImageElement) => {
            if (!el.src.startsWith("http"))
                el.src = process.env.REACT_APP_URL + el.src;
        });
    }, [detail]);

    return (
        <div className={cls("post_detail")}>
            <div className={cls("info")}>
                <h1 className={cls("title")}>{detail.title}</h1>
                <div className={cls("meta")}>
                    <span className={cls("auth")}>{detail.auth.fullName}</span>
                    <span className={cls("date")}>{detail.date}</span>
                </div>
                <div className={cls("tag")}>
                    {detail.tag.map((value, index) => {
                        return <div key={index}>{value.name}</div>;
                    })}
                </div>
                <div
                    className="fb-like"
                    data-href={window.location.href}
                    data-width=""
                    data-layout="standard"
                    data-action="like"
                    data-size="small"
                    data-share="true"
                ></div>
            </div>
            <div className={cls("content")}>{parse(detail.content)}</div>

            <div
                className="fb-comments"
                data-href={`${global.window.location.href}`}
                data-width="600"
                data-numposts="5"
            ></div>
        </div>
    );
};

interface Auth {
    username: string;
    avatar: string;
    fullName: string;
    email: string;
}

interface Tag {
    id: string;
    name: string;
}
interface PostType {
    id: string;
    introduce: string;
    title: string;
    slug: string;
    review_image: string;
    date: string;
    content: string;
    auth: Auth;
    tag: Tag[];
}

export default PostDetail;
