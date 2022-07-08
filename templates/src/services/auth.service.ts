import { axiosNotAuth, axiosAuth } from "../config/axiosConfig";
import tokenService from "./token.service";

class AuthService {
    login(username: string, password: string) {
        return axiosNotAuth({
            url: "/o/token/",
            method: "post",
            data: {
                username,
                password,
                grant_type: "password",
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
            },
        });
    }
    logout() {
        return axiosNotAuth({
            url: "/o/revoke_token/",
            method: "post",
            data: {
                token: tokenService.getAccessToken(),
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
            },
        });
    }
    getUserInfo() {
        return axiosAuth({
            url: "/user/get-user-info/",
            method: "get",
        });
    }
}

export default new AuthService();
