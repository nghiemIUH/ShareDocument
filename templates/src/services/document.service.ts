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
    getDocumentDetail(url: string) {
        return axiosNotAuth({
            url,
            method: "get",
        });
    }
}

export default new DocumentService();
