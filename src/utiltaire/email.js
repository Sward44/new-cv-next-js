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
      },
    });
  }

  async getTemplate(templateName, options) {
    try {
      const template = pug.renderFile(
        `src/utiltaire/emailTemplate/${templateName}.pug`,
        options
      );
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

const newEmail = new Email();

export default newEmail;
