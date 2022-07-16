import { useState, useEffect, useRef } from "react";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useLocation } from "react-router-dom";
import documentService from "../../../services/document.service";

import { usePdf } from "@mikecousins/react-pdf";

const fileUrl =
    "http://admin.vndev.info/media/document_file/2022/07/14/Programming_with_Python_-_T.R._Padmanabhan.pdf";

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

    const [page, setPage] = useState(1);
    const canvasRef = useRef(null);

    const { pdfDocument, pdfPage } = usePdf({
        file: fileUrl,
        page,
        canvasRef,
    });

    return (
        <div>
            {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                <div style={{ height: "80vh" }}>
                    <Viewer
                        // fileUrl={process.env.REACT_APP_URL + document.file}
                        fileUrl="http://vndev.info/media/document_file/2022/07/14/Programming_with_Python_-_T.R._Padmanabhan.pdf"
                    />
                </div>
            </Worker> */}
            {!pdfDocument && <span>Loading...</span>}
            <canvas ref={canvasRef} />
            {Boolean(pdfDocument && pdfDocument.numPages) && (
                <nav>
                    <ul className="pager">
                        <li className="previous">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </button>
                        </li>
                        <li className="next">
                            <button
                                disabled={page === pdfDocument.numPages}
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default DocumentDetail;
