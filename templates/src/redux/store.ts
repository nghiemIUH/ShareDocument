import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/slice";
import { postSlice } from "./baseData/slice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        post: postSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
