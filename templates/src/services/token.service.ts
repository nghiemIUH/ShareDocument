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
        Cookies.set("refresh_token", token, {
            path: "/",
            domain: process.env.REACT_APP_DOMAIN,
            expires: 365,
            // secure: true,
        });
    }

    setAccessToken(token: string) {
        Cookies.set("access_token", token, {
            path: "/",
            domain: process.env.REACT_APP_DOMAIN,
            // secure: true,
        });
    }

    remove() {
        Cookies.remove("access_token", {
            path: "/",
            domain: process.env.REACT_APP_DOMAIN,
        });
        Cookies.remove("refresh_token", {
            path: "/",
            domain: process.env.REACT_APP_DOMAIN,
        });
    }
}

export default new TokenService();
