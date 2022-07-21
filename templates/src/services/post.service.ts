import { axiosNotAuth } from "../config/axiosConfig";

class PostService {
    getPopularPost() {
        return axiosNotAuth({
            url: "/post/get-popular/",
            method: "get",
        });
    }

    getCategory() {
        return axiosNotAuth({
            url: "/post/get-all-category/",
            method: "get",
        });
    }

    getTag() {
        return axiosNotAuth({
            url: "/post/get-all-tag/",
            method: "get",
        });
    }

    getPost(url: string) {
        return axiosNotAuth({
            url: url,
            method: "get",
        });
    }

    getPostDetail(slug: string) {
        return axiosNotAuth({
            url: `/post${slug}/`,
            method: "get",
        });
    }

    getPostCategory(category_url: string) {
        return axiosNotAuth({
            url: `/post${category_url}/`,
            method: "get",
        });
    }
    search(url: string) {
        return axiosNotAuth({
            url,
            method: "get",
        });
    }
}

export default new PostService();
