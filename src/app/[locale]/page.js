import "./page.module.scss";
import { getDictionary } from "@/app/[locale]/dictionaries";
import Header from "@/components/home/header/Header";
import Section from "@/components/home/section/Section";
import Main from "@/components/home/main/Main";
import Aside from "@/components/home/aside/Aside";
import Selection from "@/components/home/selection/Selection";
import Footer from "@/components/home/footer/Footer";
import fs from "fs";
import path from "path";

export default async function Home({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const imagePath = path.join(
    process.cwd(),
    "src",
    "components",
    "img",
    "section",
    "david-launay-mini.webp"
  );
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString("base64");
  const dataUrl = `data:image/webp;base64,${base64Image}`;
  return (
    <span className="gridContainer">
      <Header title={dict.header.title} locale={locale} />
      <Section locale={locale} dataUrl={dataUrl} />
      <Main main={dict.main} />
      <Aside aside={dict.aside} />
      <Selection selection={dict.selection} />
      <Footer footer={dict.footer} formulaire={dict.formulaire} />
    </span>
  );
}
