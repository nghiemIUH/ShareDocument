import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import classNames from "classnames/bind";
import style from "./Document.module.scss";
import { BiSearch } from "react-icons/bi";
import DocumentItem from "./document_item/DocumentItem";
import documentService from "../../services/document.service";
import { Helmet } from "react-helmet";

const cls = classNames.bind(style);

interface DocumentType {
    id: string;
    title: string;
    date: string;
    review_img: string;
    view: number;
    slug: string;
    file: string;
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
            const response_document = await documentService.getAll();
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
        const response_document =
            e.target.value === "All"
                ? await documentService.getAll()
                : await documentService.getDocument(
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

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        const keyword = (document.getElementById("search") as HTMLInputElement)
            .value;
        const category = (
            document.getElementById("category_select") as HTMLSelectElement
        ).value;
        const result = await documentService.search(keyword, category);
        setDocuments((prev) => {
            return {
                next: result.data.next?.replace(process.env.REACT_APP_URL, ""),
                documents: [...result.data.results],
            };
        });
    };

    return (
        <div className={cls("document")}>
            <Helmet>
                <title>VNDev - Document</title>
                <meta
                    name="description"
                    property="og:description"
                    content="Document"
                />
                <meta property="og:title" content="VNDev - Document" />
            </Helmet>
            <div className={cls("document_img")}>
                <img src="/document.jpg" alt="" />
            </div>
            <div className={cls("document_filter")}>
                <select
                    name=""
                    id="category_select"
                    className={cls("document_select")}
                    onChange={handleChangeCategory}
                >
                    <option value="All">All</option>
                    {categories.map((value, index) => {
                        return (
                            <option value={value.title} key={index}>
                                {value.title}
                            </option>
                        );
                    })}
                </select>
                <form
                    action=""
                    className={cls("document_search")}
                    onSubmit={handleSearch}
                >
                    <input type="text" placeholder="Tìm kiếm..." id="search" />
                    <button type="submit">
                        <BiSearch />
                    </button>
                </form>
            </div>
            {documents.documents.length === 0 && (
                <div style={{ marginTop: 20 }}>Không tìm thấy</div>
            )}
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
