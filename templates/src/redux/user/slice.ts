import { createSlice } from "@reduxjs/toolkit";
import userAPI from "./userAPI";
import tokenService from "../../services/token.service";

interface User {
    username: string;
    avatar: string;
    fullName: string;
    email: string;
}

interface StateType {
    user: User;
    error: boolean;
    is_login: boolean;
}

const initialState = {
    user: {
        username: "",
        avatar: "",
        fullName: "",
        email: "",
    },
    error: false,
    is_login: false,
} as StateType;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        builder.addCase(
            userAPI.login().fulfilled,
            (state: StateType, action) => {
                tokenService.setAccessToken(action.payload.access_token);
                tokenService.setRefreshToken(action.payload.refresh_token);
                state.error = false;
                state.is_login = true;
            }
        );
        builder.addCase(userAPI.login().rejected, (state) => {
            state.error = true;
            state.is_login = false;
        });

        builder.addCase(
            userAPI.getUserInfo().fulfilled,
            (state: StateType, action) => {
                state.user = action.payload;
                state.error = false;
                state.is_login = true;
            }
        );

        builder.addCase(userAPI.logout().fulfilled, (state) => {
            tokenService.remove();
            return { ...initialState };
        });
    },
});
