import { axiosAuth } from "../config/axiosConfig";

class ForumService {
    getPost(url: string, type: string) {
        return axiosAuth({
            url,
            method: "get",
            params: {
                type,
            },
        });
    }

    getPostWithID(id: string) {
        return axiosAuth({
            url: "/forum/get-post/",
            method: "get",
            params: {
                id,
            },
        });
    }

    uploadPost(data: FormData) {
        return axiosAuth({
            url: "/forum/post/",
            method: "post",
            data,
        });
    }

    getComment(url: string, post_id: string) {
        return axiosAuth({
            url,
            method: "get",
            params: { post_id: post_id },
        });
    }

    uploadComment(content: string, post_id: string) {
        return axiosAuth({
            url: "/forum/comment/",
            method: "post",
            data: {
                content: content,
                post_id: post_id,
            },
        });
    }
    getLike(post_id: string) {
        return axiosAuth({
            url: "/forum/like/",
            method: "get",
            params: {
                post_id,
            },
        });
    }
    handleLike(post_id: string) {
        return axiosAuth({
            url: "/forum/like/",
            method: "post",
            data: {
                post_id,
            },
        });
    }
    getNotification() {
        return axiosAuth({
            url: "/forum/get-note/",
            method: "get",
        });
    }
    accept(id: string) {
        return axiosAuth({
            url: "/forum/accept/",
            method: "put",
            data: {
                id,
            },
        });
    }
    delete(id: string) {
        return axiosAuth({
            url: "/forum/delete/",
            method: "put",
            data: {
                id,
            },
        });
    }
}
export default new ForumService();
