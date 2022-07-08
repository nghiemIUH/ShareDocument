import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ContentWrapper from "./components/content/ContentWrapper";
import Post from "./components/post/Post";
import Login from "./components/login/Login";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import tokenService from "./services/token.service";
import userAPI from "./redux/user/userAPI";
import postAPI from "./redux/baseData/postAPI";

function App() {
    const userState = useAppSelector((state) => state.user);
    const postBaseState = useAppSelector((state) => state.post);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tokenService.getAccessToken() && userState.user.username === "") {
            dispatch(userAPI.getUserInfo()());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState]);

    useEffect(() => {
        if (postBaseState.categories.length === 0) {
            dispatch(postAPI.getPopularPost()());
            dispatch(postAPI.getCategory()());
            dispatch(postAPI.getTag()());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<ContentWrapper Component={<Post />} />}
                />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
