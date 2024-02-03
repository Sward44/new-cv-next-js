import "./page.module.scss";
import { getDictionary } from "@/app/[locale]/dictionaries";
import Header from "@/components/home/header/Header";
import Section from "@/components/home/section/Section";
import Main from "@/components/home/main/Main";
import Aside from "@/components/home/aside/Aside";
import Selection from "@/components/home/selection/Selection";
import Footer from "@/components/home/footer/Footer";

export default async function Home({ params: { locale } }) {
  const dict = await getDictionary(locale);
  return (
    <>
      <Header title={dict.header.title} />
      <Section />
      <Main main={dict.main} />
      <Aside aside={dict.aside} />
      <Selection selection={dict.selection} />
      <Footer footer={dict.footer} formulaire={dict.formulaire} />
    </>
  );
}
