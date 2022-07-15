import React from "react";
import Header from "../components/header/Header";
import PostCategory from "../components/post/postCategory/PostCategory";
import Footer from "../components/footer/Footer";
import ContentWrapper from "../components/content/ContentWrapper";

const PostCategoryPage = () => {
    return (
        <div>
            <Header />
            <ContentWrapper Component={<PostCategory />} />
            <Footer />
        </div>
    );
};

export default PostCategoryPage;
