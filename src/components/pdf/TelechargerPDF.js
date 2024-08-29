"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faFilePdf,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function TelechargerPDF() {
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
      <Link href="fr/20240828_CV_David-Launay_fr.pdf">
        <FontAwesomeIcon
          icon={faFilePdf}
          color="white"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            marginLeft: "20px",
            paddingRight: "10px",
            paddingLeft: "10px",
            fontSize: "20px",
            color: isHoveredPDF ? "white" : "white",
            transform: isHoveredPDF ? "scale(1.15)" : "scale(1)",
            transition: "all 0.3s",
          }}
        />
      </Link>
      <a
        href="fr/20240828_CV_David-Launay_fr.pdf"
        download="20240828_CV_David-Launay_fr.pdf"
      >
        <FontAwesomeIcon
          icon={faDownload}
          color="white"
          onMouseEnter={handleMouseEnterDownload}
          onMouseLeave={handleMouseLeaveDownload}
          style={{
            paddingRight: "10px",
            paddingLeft: "10px",
            fontSize: "20px",
            color: isHoveredDownload ? "white" : "white",
            transform: isHoveredDownload ? "scale(1.15)" : "scale(1)",
            transition: "all 0.3s",
          }}
        />
      </a>

      <iframe
        ref={iframeRef}
        title="print"
        style={{ display: "none" }}
        src="fr/20240828_CV_David-Launay_fr.pdf"
      ></iframe>
      <FontAwesomeIcon
        icon={faPrint}
        color="white"
        onMouseEnter={handleMouseEnterPrint}
        onMouseLeave={handleMouseLeavePrint}
        style={{
          paddingLeft: "10px",
          paddingRight: "10px",
          fontSize: "20px",
          color: isHoveredPrint ? "white" : "white",
          transform: isHoveredPrint ? "scale(1.15)" : "scale(1)",
          transition: "all 0.3s",
        }}
        onClick={handlePrint}
      />
    </>
  );
}

export default TelechargerPDF;
