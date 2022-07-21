import { axiosNotAuth } from "../config/axiosConfig";

class DocumentService {
    getCategory() {
        return axiosNotAuth({
            url: "/document/get-category/",
            method: "get",
        });
    }
    getDocument(url: string) {
        return axiosNotAuth({
            url,
            method: "get",
        });
    }

    getAll() {
        return axiosNotAuth({
            url: "/document/get-all/",
            method: "get",
        });
    }

    search(keyword: string, category: string) {
        return axiosNotAuth({
            url: "/document/search/",
            method: "get",
            params: {
                keyword,
                category,
            },
        });
    }
    increaseView(id: string) {
        return axiosNotAuth({
            url: "/document/increase-view/",
            method: "GET",
            params: {
                id,
            },
        });
    }
}

export default new DocumentService();
