import { createAsyncThunk } from "@reduxjs/toolkit";
import postService from "../../services/post.service";

class PostAPI {
    getPopularPost() {
        return createAsyncThunk(
            "post/get-popular-post",
            async (data, thunkAPI) => {
                const result = await postService.getPopularPost();
                if (result.status === 200) return result.data;
                return thunkAPI.rejectWithValue("fail get popular post");
            }
        );
    }

    getCategory() {
        return createAsyncThunk("post/category", async (data, thunkAPI) => {
            const result = await postService.getCategory();
            if (result.status === 200) {
                return result.data;
            }
            return thunkAPI.rejectWithValue("get category fail");
        });
    }

    getTag() {
        return createAsyncThunk("post/get-tag", async (data, thunkAPI) => {
            const result = await postService.getTag();
            if (result.status === 200) {
                return result.data;
            }
            return thunkAPI.rejectWithValue("get tag fail");
        });
    }
}

export default new PostAPI();
