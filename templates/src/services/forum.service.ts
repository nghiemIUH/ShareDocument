import { axiosAuth } from "../config/axiosConfig";

class ForumService {
    getPost(url: string) {
        return axiosAuth({
            url,
            method: "get",
        });
    }
    uploadPost(data: FormData) {
        return axiosAuth({
            url: "/forum/post/",
            method: "post",
            data,
        });
    }
}
export default new ForumService();
