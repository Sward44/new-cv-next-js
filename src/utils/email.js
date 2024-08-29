"server only";
import nodemailer from "nodemailer";
import pug from "pug";
// import fs from "fs";
class Email {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
        // host: "sandbox.smtp.mailtrap.io",
        // port: 2525,
        //   auth: {
        //     user: "f6473c6bce4408",
        //     pass: "f8cf1756e55fb5",
        //   },
        // });
      },
    });

    try {
      const result = transporter.verify();
      console.log("Email transporter est prêt : ", result);
    } catch (e) {
      console.log("Le resultat de connexion n'est pas bon : ", e);
    }
  }

  async getTemplate(templateName, options) {
    try {
      const template = pug.renderFile(
        `src/utils/email-template/${templateName}.pug`,
        options
      );
      // const year = new Date().getFullYear();
      // const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
      // const day = new Date().getDate().toString().padStart(2, "0");
      // const hour = new Date().getHours().toString().padStart(2, "0");
      // const minute = new Date().getMinutes().toString().padStart(2, "0");
      // const second = new Date().getSeconds().toString().padStart(2, "0");
      // const fileName = `${year}${month}${day}${hour}${minute}${second}-message-${options.ownerSurname}-${options.ownerName}.html`;

      // fs.writeFile(
      //   `src/utils/email-template/html/${fileName}`,
      //   template,
      //   (err) => {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //       console.log(`Fichier sauvegardé avec succès : ${fileName}`);
      //     }
      //   }
      // );

      const data = await this.transporter.sendMail({
        from: "David Launay <no-reply@david-launay.com>",
        to: "David Launay <davidlaunay567@gmail.com>",
        subject: "[david-launay.com] Nouveau message",
        html: template,
      });
      console.log("EMAIL OK ! : ", data);
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new Email();
