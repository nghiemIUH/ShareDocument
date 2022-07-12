import React from "react";
import Header from "../components/header/Header";
import Post from "../components/post/Post";
import ContentWrapper from "../components/content/ContentWrapper";
import Footer from "../components/footer/Footer";

const HomePage = () => {
    return (
        <div>
            <Header />
            <ContentWrapper Component={<Post />} />
            <Footer />
        </div>
    );
};

export default HomePage;
