import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ContentWrapper from "../components/content/ContentWrapper";
import Document from "../components/document/Document";

const DocumentPage = () => {
    return (
        <div>
            <Header />
            <ContentWrapper Component={<Document />} />
            <Footer />
        </div>
    );
};

export default DocumentPage;
