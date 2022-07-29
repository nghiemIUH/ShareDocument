import { useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import tokenService from "./services/token.service";
import userAPI from "./redux/user/userAPI";
import postAPI from "./redux/baseData/postAPI";
import NotFound from "./components/NotFound";
import ContentWrapper from "./components/content/ContentWrapper";
import Post from "./components/post/Post";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import PostDetail from "./components/post/post_detail/PostDetail";
import PostCategory from "./components/post/postCategory/PostCategory";
import Document from "./components/document/Document";
import SearchResult from "./components/SearchResult/SearchResult";
import Forum from "./components/forum/Forum";
import ForumDetailNotification from "./components/forum/forumDetailNotification/ForumDetailNotification";
import Footer from "./components/footer/Footer";
import GetToken from "./components/forgot_password/get_token/GetToken";
import ChangePassword from "./components/forgot_password/change_password/ChangePassword";
import Coding from "./components/coding/Coding";
import Editor from "./components/coding/editor/Editor";

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
                <Route
                    path="/document"
                    element={<ContentWrapper Component={<Document />} />}
                />
                <Route
                    path="/search"
                    element={<ContentWrapper Component={<SearchResult />} />}
                />
                <Route
                    path="/forum"
                    element={<ContentWrapper Component={<Forum />} />}
                />
                <Route
                    path="/forum/:id"
                    element={
                        <ContentWrapper
                            Component={<ForumDetailNotification />}
                        />
                    }
                />
                <Route path="/forgot-password" element={<GetToken />} />
                <Route
                    path="/reset-password/:uidb64/:token"
                    element={<ChangePassword />}
                />
                <Route path="/coding" element={<Coding />} />
                <Route path="/coding/editor" element={<Editor />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
