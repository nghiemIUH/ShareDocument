import { axiosAuth } from "../config/axiosConfig";

class NotifyService {
    getNotification() {
        return axiosAuth({
            url: "/notification/get-note/",
            method: "get",
        });
    }
    seen() {
        return axiosAuth({
            url: "/notification/seen/",
            method: "get",
        });
    }
    read(id: string) {
        return axiosAuth({
            url: "/notification/read/",
            method: "post",
            data: {
                id,
            },
        });
    }
}
export default new NotifyService();
