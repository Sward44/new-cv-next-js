import nodemailer from "nodemailer";
import pug from "pug";
import fs from "fs";

class Email {
  constructor() {
    this.prodTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        type: "OAuth2",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      },
    });
    this.devTransporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async getTemplate(templateName, options, prod = false) {
    try {
      const template = pug.renderFile(
        `src/utils/email-template/${templateName}.pug`,
        options.metaData
      );
      const fileName = `${new Date().getFullYear()}${
        new Date().getMonth() + 1
      }${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}-message-${
        options.metaData.ownerName
      }.html`;
      fs.writeFile(
        `src/utils/email-template/html/${fileName}`,
        template,
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Fichier sauvegardé avec succès : ${fileName}`);
          }
        }
      );

      let data;
      if (prod) {
        data = await this.prodTransporter.sendMail({
          from: "David Launay <davidlaunay567@gmail.com>",
          to: options.to,
          subject: options.subject,
          html: template,
        });
      } else {
        data = await this.devTransporter.sendMail({
          from: "David Launay <no-reply@david-launay.com>",
          to: options.to,
          subject: options.subject,
          html: template,
        });
      }
      console.log("EMAIL OK ! : ", JSON.stringify(data));
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new Email();
