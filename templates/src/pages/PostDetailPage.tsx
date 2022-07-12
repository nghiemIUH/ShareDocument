import React from "react";
import Header from "../components/header/Header";
import PostDetail from "../components/post/post_detail/PostDetail";
import Footer from "../components/footer/Footer";
import ContentWrapper from "../components/content/ContentWrapper";

const PostDetailPage = () => {
    return (
        <div>
            <Header />
            <ContentWrapper Component={<PostDetail />} />
            <Footer />
        </div>
    );
};

export default PostDetailPage;
