import express from "express";
import path from "path";
import fs from "fs";
import sgMail from "@sendgrid/mail";

const router = express.Router();
sgMail.setApiKey(process.env.SENDGRID_API_KEY.trim());

const template = path.resolve("src/modules/mail/template/noreply", "index.html");

router.post("/send", (req, res) => {
  let templateHtml = "";
  // @ts-ignore
  const {subject, name, email, button_text, button_link, content} = req.body.data;
  let file = fs.readFileSync(template, { encoding: "utf-8" });
  templateHtml += file.replace("{{hello_name}}", `Xin chào ${name}.`);
  templateHtml = templateHtml.replace("{{content}}", content);
  templateHtml = templateHtml.replace("{{button_text}}", button_text);
  templateHtml = templateHtml.replace("{{button_link}}", button_link);
  setTimeout(() => {
    let msg: any = {
      to: email,
      from: process.env.NOREPLY_EMAIL,
      subject: subject,
      html: templateHtml,
    };
    sgMail.send(msg).then(
      () => res.status(200).json({message: "ok"}),
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
  }, 5000);
});

export { router as MailRouter };
