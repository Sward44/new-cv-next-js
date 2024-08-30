"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faFilePdf,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function TelechargerPDF({ locale }) {
  console.log("Paramètre locale dans TelechargerPDF : ", locale);
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
      <Link href={`${locale}/20240830_CV_David-Launay_${locale}.pdf`}>
        <FontAwesomeIcon
          icon={faFilePdf}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            marginLeft: "20px",
            paddingRight: "10px",
            paddingLeft: "10px",
            fontSize: "20px",
            color: isHoveredPDF ? "white" : "white",
            transform: isHoveredPDF ? "scale(1.05)" : "scale(1)",
            transition: "all 0.3s",
          }}
        />
      </Link>
      <a
        href={`${locale}/20240830_CV_David-Launay_${locale}.pdf`}
        download={`20240830_CV_David-Launay_${locale}.pdf`}
      >
        <FontAwesomeIcon
          icon={faDownload}
          onMouseEnter={handleMouseEnterDownload}
          onMouseLeave={handleMouseLeaveDownload}
          style={{
            paddingRight: "10px",
            paddingLeft: "10px",
            fontSize: "20px",
            color: isHoveredDownload ? "white" : "white",
            transform: isHoveredDownload ? "scale(1.05)" : "scale(1)",
            transition: "all 0.3s",
          }}
        />
      </a>

      <iframe
        ref={iframeRef}
        title="print"
        style={{ display: "none" }}
        src={`${locale}/20240830_CV_David-Launay_${locale}.pdf`}
      />
      <span
        style={{
          paddingLeft: "10px",
          paddingRight: "10px",
          fontSize: "20px",
          color: isHoveredPrint ? "white" : "white",
          transform: isHoveredPrint ? "scale(1.1)" : "scale(1)",
          transition: "all 0.3s",
        }}
      >
        <FontAwesomeIcon
          icon={faPrint}
          onMouseEnter={handleMouseEnterPrint}
          onMouseLeave={handleMouseLeavePrint}
          onClick={handlePrint}
        />
      </span>
    </>
  );
}

export default TelechargerPDF;
