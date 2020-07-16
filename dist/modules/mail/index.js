"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailRouter = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const router = express_1.default.Router();
exports.MailRouter = router;
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY.trim());
const template = path_1.default.resolve("src/modules/mail/template/noreply", "index.html");
router.post("/send", (req, res) => {
    let templateHtml = "";
    // @ts-ignore
    const { subject, name, email, button_text, button_link, content } = req.body.data;
    let file = fs_1.default.readFileSync(template, { encoding: "utf-8" });
    templateHtml += file.replace("{{hello_name}}", `Xin chào ${name}.`);
    templateHtml = templateHtml.replace("{{content}}", content);
    templateHtml = templateHtml.replace("{{button_text}}", button_text);
    templateHtml = templateHtml.replace("{{button_link}}", button_link);
    setTimeout(() => {
        let msg = {
            to: email,
            from: process.env.NOREPLY_EMAIL,
            subject: subject,
            html: templateHtml,
        };
        mail_1.default.send(msg).then(() => res.status(200).json({ message: "ok" }), (error) => {
            console.error(error);
            if (error.response) {
                console.error(error.response.body);
            }
        });
    }, 5000);
});
//# sourceMappingURL=index.js.map