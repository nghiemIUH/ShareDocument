import { useState, useEffect, ChangeEvent } from "react";
import classNames from "classnames/bind";
import style from "./Document.module.scss";
import { BiSearch } from "react-icons/bi";
import DocumentItem from "./document_item/DocumentItem";
import documentService from "../../services/document.service";

const cls = classNames.bind(style);

interface DocumentType {
    id: string;
    title: string;
    date: string;
    review_img: string;
    view: number;
    slug: string;
}

const Document = () => {
    const [categories, setCategories] = useState<
        { id: string; title: string }[]
    >([]);

    const [documents, setDocuments] = useState<{
        next: string | null;
        documents: DocumentType[];
    }>({ next: null, documents: [] });

    useEffect(() => {
        const res = async () => {
            return await documentService.getCategory();
        };
        res().then(async (result) => {
            setCategories((prev) => result.data);
            const response_document = await documentService.getDocument(
                "/document/get-document/" + result.data[0].title + "/"
            );
            setDocuments((prev) => {
                return {
                    next: response_document.data.next?.replace(
                        process.env.REACT_APP_URL,
                        ""
                    ),
                    documents: response_document.data.results,
                };
            });
        });
    }, []);

    const handleChangeCategory = async (e: ChangeEvent<HTMLSelectElement>) => {
        const response_document = await documentService.getDocument(
            "/document/get-document/" + e.target.value + "/"
        );
        setDocuments((prev) => {
            return {
                next: response_document.data.next?.replace(
                    process.env.REACT_APP_URL,
                    ""
                ),
                documents: response_document.data.results,
            };
        });
    };

    const loadMoreDocument = async () => {
        const response_document = await documentService.getDocument(
            documents.next as string
        );
        setDocuments((prev) => {
            return {
                next: response_document.data.next?.replace(
                    process.env.REACT_APP_URL,
                    ""
                ),
                documents: [
                    ...prev.documents,
                    ...response_document.data.results,
                ],
            };
        });
    };

    return (
        <div className={cls("document")}>
            <div className={cls("document_img")}>
                <img src="/document.jpg" alt="" />
            </div>
            <div className={cls("document_filter")}>
                <select
                    name=""
                    id=""
                    className={cls("document_select")}
                    onChange={handleChangeCategory}
                >
                    {categories.map((value, index) => {
                        return (
                            <option value={value.title} key={index}>
                                {value.title}
                            </option>
                        );
                    })}
                </select>
                <div className={cls("document_search")}>
                    <input type="text" placeholder="Tìm kiếm..." />
                    <BiSearch />
                </div>
            </div>
            <div className={cls("document_items")}>
                {documents.documents?.map((value, index) => {
                    return <DocumentItem {...value} key={index} />;
                })}
            </div>
            {documents.next && (
                <div className={cls("blog_page")} onClick={loadMoreDocument}>
                    <div>Load more documents</div>
                </div>
            )}
        </div>
    );
};

export default Document;
