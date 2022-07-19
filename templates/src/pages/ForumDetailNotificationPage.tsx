import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ContentWrapper from "../components/content/ContentWrapper";
import ForumDetailNotification from "../components/forum/forumDetailNotification/ForumDetailNotification";

const ForumDetailNotificationPage = () => {
    return (
        <div>
            <Header />
            <ContentWrapper Component={<ForumDetailNotification />} />
            <Footer />
        </div>
    );
};

export default ForumDetailNotificationPage;
