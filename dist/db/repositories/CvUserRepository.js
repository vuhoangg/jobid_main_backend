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
const CvUser_1 = __importDefault(require("../schemas/CvUser"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const pdf_lib_1 = require("pdf-lib");
const s3_1 = require("../../aws/s3");
const getCondition = (filter) => {
    let condition = {};
    if (filter.user) {
        condition = Object.assign(condition, { user: filter.user });
    }
    if (filter.status) {
        condition = Object.assign(condition, { status: filter.status });
    }
    return condition;
};
class CvUserRepository {
    constructor() {
        this.create = (data) => {
            try {
                return CvUser_1.default.create(data);
            }
            catch (e) {
                (0, log_1.errorLog)(e);
                return (0, promise_1.promiseNull)();
            }
        };
        this.delete = (_id) => {
            try {
                return CvUser_1.default.findByIdAndRemove(_id);
            }
            catch (e) {
                (0, log_1.errorLog)(e);
                return (0, promise_1.promiseNull)();
            }
        };
        this.get = (_id, projection = {}) => {
            try {
                return CvUser_1.default.findById(_id, projection);
            }
            catch (e) {
                (0, log_1.errorLog)(e);
                return (0, promise_1.promiseNull)();
            }
        };
        this.update = (data) => {
            try {
                return CvUser_1.default.findByIdAndUpdate(data._id, data, { new: true });
            }
            catch (e) {
                (0, log_1.errorLog)(e);
                return (0, promise_1.promiseNull)();
            }
        };
        this.filter = (filter, page, limit, projection = {}) => {
            try {
                let condition = getCondition(filter);
                return CvUser_1.default.find(condition, projection)
                    .sort({ main_cv: "desc" })
                    .skip(limit * (page - 1))
                    .limit(limit);
            }
            catch (e) {
                (0, log_1.errorLog)(e);
                return (0, promise_1.promiseNull)();
            }
        };
        this.all = (filter) => {
            try {
                return CvUser_1.default.find(filter);
            }
            catch (e) {
                (0, log_1.errorLog)(e);
                return (0, promise_1.promiseNull)();
            }
        };
        this.count = (filter) => {
            try {
                let condition = getCondition(filter);
                return CvUser_1.default.countDocuments(condition);
            }
            catch (e) {
                (0, log_1.errorLog)(e);
                return (0, promise_1.promiseNull)();
            }
        };
        this.makeCv = (title, html_view, html_full, html_view_height, cv_data, user) => {
            const { avatar, name, job_position, birthday, gender, phone, email, address, objective, education, experience, activity, more_infomation, skill, favorite, reference, project, prize, certificate, } = cv_data;
            const document = `
            <!DOCTYPE html>
            <html>
                <style>
                // @page {
                //     size: A4 portrait;
                //     margin:0px 0px 0px 0px;
                // }
                #cv-container{
                    // height:${Math.ceil(html_view_height / 1122.2) * 1122.2}px;
                    height: 100vh;
                    margin-top:0px;
                    box-sizing: border-box;
                }
                </style>
                ${html_view}
            </html>
            `;
            return puppeteer_1.default
                .launch({
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
                    //@ts-ignore
                    deviceScaleFactor: 1,
                    format: 'A4'
                });
                const pdfDoc = yield pdf_lib_1.PDFDocument.load(bufferPdf);
                // pdfDoc.removePage(pdfDoc.getPageCount() - 1);
                pdfDoc.setTitle(`Xem CV Online ${title}`);
                let pdfDocBase64 = yield pdfDoc.saveAsBase64();
                page.setViewport({
                    width: 794,
                    height: 1122,
                    //@ts-ignore
                    deviceScaleFactor: 1,
                });
                let base64Image = yield page.screenshot({
                    clip: {
                        x: 8,
                        y: 0,
                        width: 794,
                        height: 1122,
                    },
                    encoding: "base64",
                });
                let timestamp = (new Date()).getTime();
                let fileNameThumnail = `${user}_${timestamp}`;
                let fileNameCv = `${user}_${timestamp}`;
                base64Image = `data:image/png;base64,${base64Image}`;
                pdfDocBase64 = `data:application/pdf;base64,${pdfDocBase64}`;
                const imageUrl = yield (0, s3_1.s3Upload)("cv_user", fileNameThumnail, base64Image);
                const pdfUrl = yield (0, s3_1.s3Upload)("cv_user", fileNameCv, pdfDocBase64);
                let cvUser = yield CvUser_1.default.create({
                    user: user,
                    title: title,
                    html: html_full,
                    image: imageUrl,
                    pdf: pdfUrl,
                    avatar: avatar,
                    name: name,
                    job_position: job_position,
                    birthday: birthday,
                    gender: gender,
                    phone: phone,
                    email: email,
                    address: address,
                    objective: objective,
                    education: education,
                    experience: experience,
                    activity: activity,
                    more_infomation: more_infomation,
                    skill: skill,
                    favorite: favorite,
                    reference: experience,
                    project: project,
                    prize: prize,
                    certificate: certificate,
                });
                yield browser.close();
                return cvUser;
            }));
        };
        this.updateCv = (_id, title, html_view, html_full, html_view_height, cv_data, user) => {
            const { avatar, name, job_position, birthday, gender, phone, email, address, objective, education, experience, activity, more_infomation, skill, favorite, reference, project, prize, certificate, } = cv_data;
            const document = `
            <!DOCTYPE html>
            <html>
                <style>
                // @page {
                //     size: A4 portrait;
                //     margin:0px 0px 0px 0px;
                // }
                #cv-container{
                    // height:${Math.ceil(html_view_height / 1122.2) * 1122.2}px;
                    height: 100vh;
                    margin-top:0px;
                    box-sizing: border-box;
                }
                </style>
                ${html_view}
            </html>
            `;
            return puppeteer_1.default
                .launch({
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
                    //@ts-ignore
                    deviceScaleFactor: 1,
                    format: 'A4'
                });
                const pdfDoc = yield pdf_lib_1.PDFDocument.load(bufferPdf);
                // pdfDoc.removePage(pdfDoc.getPageCount() - 1);
                pdfDoc.setTitle(`Xem CV Online ${title}`);
                let pdfDocBase64 = yield pdfDoc.saveAsBase64();
                page.setViewport({
                    width: 794,
                    height: 1122,
                    //@ts-ignore
                    deviceScaleFactor: 1,
                });
                let base64Image = yield page.screenshot({
                    clip: {
                        x: 8,
                        y: 0,
                        width: 794,
                        height: 1122,
                    },
                    encoding: "base64",
                });
                let timestamp = (new Date()).getTime();
                let fileNameThumnail = `${user}_${timestamp}`;
                let fileNameCv = `${user}_${timestamp}`;
                base64Image = `data:image/png;base64,${base64Image}`;
                pdfDocBase64 = `data:application/pdf;base64,${pdfDocBase64}`;
                const imageUrl = yield (0, s3_1.s3Upload)("cv_user", fileNameThumnail, base64Image);
                const pdfUrl = yield (0, s3_1.s3Upload)("cv_user", fileNameCv, pdfDocBase64);
                let cvUser = yield CvUser_1.default.findOneAndUpdate({ _id: _id, user: user }, {
                    title: title,
                    html: html_full,
                    image: imageUrl,
                    pdf: pdfUrl,
                    avatar: avatar,
                    name: name,
                    job_position: job_position,
                    birthday: birthday,
                    gender: gender,
                    phone: phone,
                    email: email,
                    address: address,
                    objective: objective,
                    education: education,
                    experience: experience,
                    activity: activity,
                    more_infomation: more_infomation,
                    skill: skill,
                    favorite: favorite,
                    reference: experience,
                    project: project,
                    prize: prize,
                    certificate: certificate,
                });
                yield browser.close();
                return cvUser;
            }));
        };
    }
    getBy(getBy, projection) {
        try {
            return CvUser_1.default.findOne(getBy, projection);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
}
const CvUserService = new CvUserRepository();
exports.default = CvUserService;
//# sourceMappingURL=CvUserRepository.js.map