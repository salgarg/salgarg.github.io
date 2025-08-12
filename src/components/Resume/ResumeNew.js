import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import SidebarNav from "../SidebarNav";
import pdf from '../../Assets/SaloniGarg_Resume_0525_redacted.pdf';
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Home2 from "../Home/Home2";
import PasswordProtected from "../PasswordProtected";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <>
      <SidebarNav />
      <PasswordProtected correctPassword="saloniresume29">
        <div>
          <Container fluid className="resume-section">
          <Button
                variant="primary"
                href={pdf}
                target="_blank"
                style={{ maxWidth: "250px" }}
              >
                <AiOutlineDownload />
                &nbsp;Download Resume
              </Button>
            <Row className="resume">
              <Document file={pdf} className="d-flex justify-content-center">
                <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
              </Document>
            </Row>
          </Container>
          <Home2 />
        </div>
      </PasswordProtected>
    </>
  );
}

export default ResumeNew;
