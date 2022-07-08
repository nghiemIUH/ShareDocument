import { createSlice } from "@reduxjs/toolkit";
import postAPI from "./postAPI";

interface Post {
    review_image: string;
    title: string;
    slug: string;
}

interface Category {
    title: string;
    count: number;
}

interface Tag {
    id: number;
    name: string;
}

interface StateType {
    posts: Post[];
    categories: Category[];
    tags: Tag[];
}

const initialState = {
    posts: [],
    categories: [],
    tags: [],
} as StateType;

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        builder.addCase(postAPI.getPopularPost().fulfilled, (state, action) => {
            state.posts = action.payload;
        });

        builder.addCase(postAPI.getCategory().fulfilled, (state, action) => {
            state.categories = action.payload;
        });

        builder.addCase(postAPI.getTag().fulfilled, (state, action) => {
            state.tags = action.payload;
        });
    },
});
