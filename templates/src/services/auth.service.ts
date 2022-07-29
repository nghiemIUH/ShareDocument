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
    register(data: FormData) {
        return axiosNotAuth({
            url: "/user/register/",
            method: "post",
            data,
        });
    }
    getRetPasswordToken(email: string) {
        // send mail
        return axiosNotAuth({
            url: "/user/send-mail-password/",
            method: "post",
            data: {
                email,
            },
        });
    }
    handleResetPassword(data: {
        toke: string;
        uidb64: string;
        password: string;
    }) {
        return axiosNotAuth({
            url: "/user/reset-password/",
            method: "post",
            data: { ...data },
        });
    }
}

export default new AuthService();
