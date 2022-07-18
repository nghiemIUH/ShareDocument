import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ContentWrapper from "../components/content/ContentWrapper";
import Forum from "../components/forum/Forum";

const ForumPage = () => {
    return (
        <div>
            <Header />
            <ContentWrapper Component={<Forum />} />
            <Footer />
        </div>
    );
};

export default ForumPage;
