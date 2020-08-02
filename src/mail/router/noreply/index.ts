import express from "express";
import path from "path";
import fs from "fs";
import sgMail from "@sendgrid/mail";

const router = express.Router();
sgMail.setApiKey(process.env.SENDGRID_API_KEY.trim());

const template = path.resolve("src/mail/template/noreply", "welcome.html");

router.post("/send", (req, res) => {
console.log("req", req.body.data)
  let templateHtml = "";
  // @ts-ignore
  const {subject, name, email, button_text, button_link, content, note} = req.body.data;
  let file = fs.readFileSync(template, { encoding: "utf-8" });
  templateHtml += file.replace("{{user_name}}", `Xin chào ${name}.`);
  templateHtml = templateHtml.replace("{{content}}", content);
  templateHtml = templateHtml.replace("{{button_text}}", button_text);
  templateHtml = templateHtml.replace("{{button_link}}", button_link);
  templateHtml = templateHtml.replace("{{note}}", note);
  setTimeout(() => {
    let msg: any = {
      to: "viethd98@gmail.com",
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

export { router as MailNoReplyRouter };
