import Cookies from "js-cookie";

class TokenService {
    getRefreshToken() {
        const token = Cookies.get("refresh_token");
        return token;
    }

    getAccessToken() {
        const token = Cookies.get("access_token");
        return token;
    }

    setRefreshToken(token: string) {
        Cookies.set("refresh_token", token);
    }

    setAccessToken(token: string) {
        Cookies.set("access_token", token);
    }

    remove() {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
    }
}

export default new TokenService();
