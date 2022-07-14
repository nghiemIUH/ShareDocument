import { useState, useEffect } from "react";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useLocation } from "react-router-dom";
import documentService from "../../../services/document.service";

const DocumentDetail = () => {
    const location = useLocation();
    const [document, setDocument] = useState<{
        id: string;
        title: string;
        date: string;
        review_img: string;
        view: number;
        slug: string;
        file: string;
    }>({
        id: "",
        title: "",
        date: "",
        review_img: "",
        view: 0,
        slug: "",
        file: "",
    });

    useEffect(() => {
        const res = async () => {
            return documentService.getDocumentDetail(
                "/document" + location.pathname + "/"
            );
        };
        res().then((result) => {
            setDocument(result.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                <div style={{ height: "80vh" }}>
                    <Viewer
                        fileUrl={process.env.REACT_APP_URL + document.file}
                    />
                </div>
            </Worker>
        </div>
    );
};

export default DocumentDetail;
