"use client";
import React from "react";
import Link from "next/link";
import {
  PdfIcon,
  PrintIcon,
  DownloadIcon,
} from "@/components/img/header_pdf/logoPdf";

function TelechargerPDF({ locale }) {
  const iframeRef = React.useRef(null);
  const [isHoveredPDF, setIsHoveredPDF] = React.useState(false);
  const [isHoveredDownload, setIsHoveredDownload] = React.useState(false);
  const [isHoveredPrint, setIsHoveredPrint] = React.useState(false);
  const handleMouseEnter = () => setIsHoveredPDF(true);
  const handleMouseLeave = () => setIsHoveredPDF(false);
  const handleMouseEnterDownload = () => setIsHoveredDownload(true);
  const handleMouseLeaveDownload = () => setIsHoveredDownload(false);
  const handleMouseEnterPrint = () => setIsHoveredPrint(true);
  const handleMouseLeavePrint = () => setIsHoveredPrint(false);

  const handlePrint = () => {
    if (iframeRef.current) {
      iframeRef.current.focus();
      iframeRef.current.contentWindow.print();
    }
  };

  return (
    <>
      <Link
        href={`${process.env.NEXT_PUBLIC_HOST}/${locale}/20240830_CV_David-Launay_${locale}.pdf`}
      >
        <span
          style={{ width: "24px", marginLeft: "16px", marginRight: "16px" }}
        >
          <PdfIcon
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              fontSize: "20px",
              transform: isHoveredPDF ? "scale(1.05)" : "scale(1)",
              transition: "all 0.3s",
            }}
          />
        </span>
      </Link>
      <Link
        href={`${locale}/20240830_CV_David-Launay_${locale}.pdf`}
        download={`20240830_CV_David-Launay_${locale}.pdf`}
      >
        <span style={{ width: "26px", marginRight: "16px" }}>
          <DownloadIcon
            onMouseEnter={handleMouseEnterDownload}
            onMouseLeave={handleMouseLeaveDownload}
            style={{
              fontSize: "20px",
              color: isHoveredDownload ? "white" : "white",
              transform: isHoveredDownload ? "scale(1.05)" : "scale(1)",
              transition: "all 0.3s",
            }}
          />
        </span>
      </Link>

      <iframe
        ref={iframeRef}
        title="print"
        style={{ display: "none" }}
        src={`${locale}/20240830_CV_David-Launay_${locale}.pdf`}
      />
      <span
        onMouseEnter={handleMouseEnterPrint}
        onMouseLeave={handleMouseLeavePrint}
        onClick={handlePrint}
        style={{
          width: "24px",
          transform: isHoveredPrint ? "scale(1.1)" : "scale(1)",
          transition: "all 0.3s",
          cursor: "pointer",
        }}
      >
        <PrintIcon
          style={{
            fontSize: "20px",
            color: isHoveredPrint ? "white" : "white",
          }}
        />
      </span>
    </>
  );
}

export default TelechargerPDF;
