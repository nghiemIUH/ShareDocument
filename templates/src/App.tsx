import { useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import tokenService from "./services/token.service";
import userAPI from "./redux/user/userAPI";
import postAPI from "./redux/baseData/postAPI";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostCategoryPage from "./pages/PostCategoryPage";
import DocumentPage from "./pages/DocumentPage";
import NotFound from "./pages/NotFound";
import SearchResultPage from "./pages/SearchResultPage";

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
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/post-detail/:slug" element={<PostDetailPage />} />
                <Route path="/category/:slug" element={<PostCategoryPage />} />
                <Route path="/document" element={<DocumentPage />} />
                <Route path="/search" element={<SearchResultPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
