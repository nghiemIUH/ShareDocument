import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ContentWrapper from "../components/content/ContentWrapper";
import DocumentDetail from "../components/document/document_detail/DocumentDetail";
const DocumentDetailPage = () => {
    return (
        <div>
            <Header />
            <ContentWrapper Component={<DocumentDetail />} />
            <Footer />
        </div>
    );
};

export default DocumentDetailPage;
