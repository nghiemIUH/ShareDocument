import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";

class UserAPI {
    login() {
        return createAsyncThunk("user/login", async (data: any, thunkAPI) => {
            const { username, password } = data;
            const result = await authService.login(username, password);
            if (result.status === 200) return result.data;
            return thunkAPI.rejectWithValue("login_fail");
        });
    }

    getUserInfo() {
        return createAsyncThunk(
            "user/get-user-info",
            async (data, thunkAPI) => {
                const result = await authService.getUserInfo();
                if (result.status === 200) {
                    return result.data;
                }
                return thunkAPI.rejectWithValue("get_info_fail");
            }
        );
    }
}

export default new UserAPI();
