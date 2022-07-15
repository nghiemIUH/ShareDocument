import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ContentWrapper from "../components/content/ContentWrapper";
import SearchResult from "../components/SearchResult/SearchResult";

const SearchResultPage = () => {
    return (
        <div>
            <Header />
            <ContentWrapper Component={<SearchResult />} />
            <Footer />
        </div>
    );
};

export default SearchResultPage;
