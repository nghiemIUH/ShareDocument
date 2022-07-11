import { useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ContentWrapper from "./components/content/ContentWrapper";
import Post from "./components/post/Post";
import Login from "./components/login/Login";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import tokenService from "./services/token.service";
import userAPI from "./redux/user/userAPI";
import postAPI from "./redux/baseData/postAPI";
import PostDetail from "./components/post/post_detail/PostDetail";
import PostCategory from "./components/post/postCategory/PostCategory";
import Register from "./components/register/Register";

function App() {
    const userState = useAppSelector((state) => state.user);
    const postBaseState = useAppSelector((state) => state.post);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tokenService.getRefreshToken() && userState.user.username === "") {
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

    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<ContentWrapper Component={<Post />} />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/post-detail/:slug"
                    element={<ContentWrapper Component={<PostDetail />} />}
                />
                <Route
                    path="/category/:slug"
                    element={<ContentWrapper Component={<PostCategory />} />}
                />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
