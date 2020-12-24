"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
const CvTheme_1 = __importDefault(require("../schemas/CvTheme"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const pdf_lib_1 = require("pdf-lib");
const getCondition = (filter) => {
    let condition = {};
    if (filter.created_by) {
        condition = Object.assign(condition, { created_by: filter.created_by });
    }
    if (filter.status) {
        condition = Object.assign(condition, { status: filter.status });
    }
    return condition;
};
class CvThemeRepository {
    constructor() {
        this.create = (data) => {
            try {
                return CvTheme_1.default.create(data);
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
        this.delete = (_id) => {
            try {
                return CvTheme_1.default.findByIdAndRemove(_id);
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
        this.get = (_id, projection = {}) => {
            try {
                return CvTheme_1.default.findById(_id, projection);
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
        this.update = (data) => {
            try {
                return CvTheme_1.default.findByIdAndUpdate(data._id, data, { new: true });
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
        this.filter = (filter, page, limit, projection = {}) => {
            try {
                let condition = getCondition(filter);
                return CvTheme_1.default.find(condition, projection)
                    .sort({ title: "asc" })
                    .skip(limit * (page - 1))
                    .limit(limit);
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
        this.count = (filter) => {
            try {
                let condition = getCondition(filter);
                return CvTheme_1.default.countDocuments(condition);
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
        this.preview = (title, html, height) => {
            const document = `
            <!DOCTYPE html>
            <html>
                <style>
                // @page {
                //     size: A4 portrait;
                //     margin:0px 0px 0px 0px;
                // }
                #cv-container{
                    // height:${Math.ceil(height / 1122.2) * 1122.2}px;
                    height: 100vh;
                    margin-top: 0px;
                    box-sizing: border-box;
                }
                </style>
                ${html}
            </html>
            `;
            return puppeteer_1.default
                .launch({
                ignoreDefaultArgs: ["--disable-extensions"],
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                headless: true,
            })
                .then((browser) => __awaiter(this, void 0, void 0, function* () {
                let page = yield browser.newPage();
                yield page.setContent(document, {
                    waitUntil: ["networkidle0", "networkidle2"],
                });
                const bufferPdf = yield page.pdf({
                    displayHeaderFooter: true,
                    printBackground: true,
                    // preferCSSPageSize: false,
                    deviceScaleFactor: 1,
                    format: 'A4'
                });
                const pdfDoc = yield pdf_lib_1.PDFDocument.load(bufferPdf);
                // pdfDoc.removePage(pdfDoc.getPageCount() - 1);
                pdfDoc.setTitle(`Xem CV Online ${title}`);
                // pdfDoc.setAuthor("Humpty Dumpty");
                // pdfDoc.setSubject("📘 An Epic Tale of Woe 📖");
                // pdfDoc.setKeywords(["eggs", "wall", "fall", "king", "horses", "men"]);
                // pdfDoc.setProducer("PDF App 9000 🤖");
                // pdfDoc.setCreator("pdf-lib (https://github.com/Hopding/pdf-lib)");
                const pdfDocSave = yield pdfDoc.saveAsBase64();
                yield browser.close();
                return pdfDocSave;
            }));
        };
    }
    getBy(getBy, projection) {
        try {
            if (getBy._id) {
                return CvTheme_1.default.findById(getBy._id, projection);
            }
            else {
                return promise_1.promiseNull();
            }
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
}
const CvThemeService = new CvThemeRepository();
exports.default = CvThemeService;
//# sourceMappingURL=CvThemeRepository.js.map