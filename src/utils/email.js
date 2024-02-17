import nodemailer from "nodemailer";
import pug from "pug";
import fs from "fs";
import dotenv from "dotenv";
import { exchangeCodeForTokens, writeTokensToFile } from "./connexion.js";

dotenv.config({ path: ".env.production.local" });

if (!process.env.REFRESH_TOKEN) {
  const code =
    "4/0AeaYSHCfHI8rWYpK4E3S7cG3oYVb43TH2m5N1j0_Bz54wZMJizdsX31GY_E2CpdSYkkOMQ";

  exchangeCodeForTokens(code)
    .then((tokens) => {
      writeTokensToFile(tokens);
      console.log("Tokens saved successfully - ", tokens);
    })
    .catch((error) => {
      console.error("Failed to save tokens:", error);
    });
}
class Email {
  constructor() {
    this.prodTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USERNAME,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN,
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
