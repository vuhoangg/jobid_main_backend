import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";
import { CrudContract } from "../contracts/CrudContract";
import CvUser from "../schemas/CvUser";
import puppeteer from "puppeteer";
import { PDFDocument } from 'pdf-lib';
import { s3Upload } from "../../aws/s3";


interface ICvUserFilterType {
    user?: string;
    status?: string;
}

interface IGetBy {
    _id?: string;
    user?: string;
}

const getCondition = (filter: ICvUserFilterType) => {
    let condition = {};
    if (filter.user) {
        condition = Object.assign(condition, { user: filter.user });
    }
    if (filter.status) {
        condition = Object.assign(condition, { status: filter.status });
    }
    return condition;
};

class CvUserRepository implements CrudContract {
    public create = (data: any) => {
        try {
            return CvUser.create(data);
        } catch (e) {
            errorLog(`CvUser::create ${e.message}`);
            return promiseNull();
        }
    };
    public delete = (_id: string) => {
        try {
            return CvUser.findByIdAndRemove(_id);
        } catch (e) {
            errorLog(`CvUser::delete ${e.message}`);
            return promiseNull();
        }
    };
    public get = (_id, projection = {}) => {
        try {
            return CvUser.findById(_id, projection);
        } catch (e) {
            errorLog(`CvUser::find ${e.message}`);
            return promiseNull();
        }
    };
    public update = (data: any) => {
        try {
            return CvUser.findByIdAndUpdate(data._id, data, { new: true });
        } catch (e) {
            errorLog(`CvUser::update ${e.message}`);
            return promiseNull();
        }
    };

    public filter = (filter: ICvUserFilterType, page: number, limit: number, projection = {}) => {
        try {
            let condition = getCondition(filter);
            return CvUser.find(condition, projection)
                .sort({ main_cv: "desc" })
                .skip(limit * (page - 1))
                .limit(limit);
        } catch (e) {
            errorLog(`CvUser::filter ${e.message}`);
            return promiseNull();
        }
    };

    public getBy(getBy: IGetBy, projection) {
        try {
            return CvUser.findOne(getBy, projection);
        } catch (e) {
            errorLog(`CvUser::getBy ${e.message}`)
            return promiseNull();
        }
    }
    public all = (filter: ICvUserFilterType) => {
        try {
            return CvUser.find(filter);
        } catch (e) {
            errorLog(`CvUser::getBy ${e.message}`)
            return promiseNull();
        }
    }

    public count = (filter: ICvUserFilterType) => {
        try {
            let condition = getCondition(filter);
            return CvUser.countDocuments(condition);
        } catch (e) {
            errorLog(`CvUser::count ${e.message}`);
            return promiseNull();
        }
    };

    public makeCv = (title, html_view, html_full, html_view_height, cv_data, user) => {
        const {
            avatar,
            name,
            job_position,
            birthday,
            gender,
            phone,
            email,
            address,
            objective,
            education,
            experience,
            activity,
            more_infomation,
            skill,
            favorite,
            reference,
            project,
            prize,
            certificate,
        } = cv_data;

        const document = `
            <!DOCTYPE html>
            <html>
                <style>
                @page { 
                    size: A4 portrait; 
                    margin:0px 0px 0px 0px;
                }
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
        return puppeteer
            .launch({
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                headless: true,
            })
            .then(async (browser) => {
                let page = await browser.newPage();
                await page.setContent(document, {
                    waitUntil: ["networkidle0", "networkidle2"],
                });

                const bufferPdf = await page.pdf({
                    displayHeaderFooter: true,
                    printBackground: true,
                    preferCSSPageSize: true,
                    deviceScaleFactor: 1,
                });

                const pdfDoc = await PDFDocument.load(bufferPdf);

                // pdfDoc.removePage(pdfDoc.getPageCount() - 1);

                pdfDoc.setTitle(`Xem CV Online ${title}`);

                let pdfDocBase64 = await pdfDoc.saveAsBase64();

                page.setViewport({
                    width: 794,
                    height: 1122,
                    deviceScaleFactor: 1,
                });

                let base64Image = await page.screenshot({
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

                const imageUrl = await s3Upload(
                    "cv_user",
                    fileNameThumnail,
                    base64Image
                );

                const pdfUrl = await s3Upload(
                    "cv_user",
                    fileNameCv,
                    pdfDocBase64
                );

                let cvUser = await CvUser.create({
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

                await browser.close();
                return cvUser;
            });
    }

    public updateCv = (_id, title, html_view, html_full, html_view_height, cv_data, user) => {
        const {
            avatar,
            name,
            job_position,
            birthday,
            gender,
            phone,
            email,
            address,
            objective,
            education,
            experience,
            activity,
            more_infomation,
            skill,
            favorite,
            reference,
            project,
            prize,
            certificate,
        } = cv_data;

        const document = `
            <!DOCTYPE html>
            <html>
                <style>
                @page { 
                    size: A4 portrait; 
                    margin:0px 0px 0px 0px;
                }
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
        return puppeteer
            .launch({
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                headless: true,
            })
            .then(async (browser) => {
                let page = await browser.newPage();
                await page.setContent(document, {
                    waitUntil: ["networkidle0", "networkidle2"],
                });

                const bufferPdf = await page.pdf({
                    displayHeaderFooter: true,
                    printBackground: true,
                    preferCSSPageSize: true,
                    deviceScaleFactor: 1,
                });

                const pdfDoc = await PDFDocument.load(bufferPdf);

                // pdfDoc.removePage(pdfDoc.getPageCount() - 1);

                pdfDoc.setTitle(`Xem CV Online ${title}`);

                let pdfDocBase64 = await pdfDoc.saveAsBase64();

                page.setViewport({
                    width: 794,
                    height: 1122,
                    deviceScaleFactor: 1,
                });

                let base64Image = await page.screenshot({
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

                const imageUrl = await s3Upload(
                    "cv_user",
                    fileNameThumnail,
                    base64Image
                );

                const pdfUrl = await s3Upload(
                    "cv_user",
                    fileNameCv,
                    pdfDocBase64
                );

                let cvUser = await CvUser.findOneAndUpdate({ _id: _id, user: user }, {
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

                await browser.close();
                return cvUser;
            });
    }
}

const CvUserService = new CvUserRepository();
export default CvUserService;
