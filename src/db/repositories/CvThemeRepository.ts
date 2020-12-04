import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";
import { CrudContract } from "../contracts/CrudContract";
import CvTheme from "../schemas/CvTheme";
import puppeteer from "puppeteer";
import { PDFDocument } from 'pdf-lib';
import { s3Upload } from "../../aws/s3";

interface ICvThemeFilterType {
    created_by?: string;
    status?: string;
}

interface IGetCvThemeType {
    _id?: string;
    slug?: string;
}

interface IGetBy {
    _id?: string;
}

const getCondition = (filter: ICvThemeFilterType) => {
    let condition = {};
    if (filter.created_by) {
        condition = Object.assign(condition, { created_by: filter.created_by });
    }
    if (filter.status) {
        condition = Object.assign(condition, { status: filter.status });
    }
    return condition;
};

class CvThemeRepository implements CrudContract {
    public create = (data: any) => {
        try {
            return CvTheme.create(data);
        } catch (e) {
            errorLog(`CvTheme::create ${e.message}`);
            return promiseNull();
        }
    };
    public delete = (_id: string) => {
        try {
            return CvTheme.findByIdAndRemove(_id);
        } catch (e) {
            errorLog(`CvTheme::delete ${e.message}`);
            return promiseNull();
        }
    };
    public get = (_id: string, projection = {}) => {
        try {
            return CvTheme.findById(_id, projection);
        } catch (e) {
            errorLog(`CvTheme::find ${e.message}`);
            return promiseNull();
        }
    };
    public update = (data: any) => {
        try {
            return CvTheme.findByIdAndUpdate(data._id, data, { new: true });
        } catch (e) {
            errorLog(`CvTheme::update ${e.message}`);
            return promiseNull();
        }
    };

    public filter = (filter: ICvThemeFilterType, page: number, limit: number, projection = {}) => {
        try {
            let condition = getCondition(filter);
            return CvTheme.find(condition, projection)
                .sort({ title: "asc" })
                .skip(limit * (page - 1))
                .limit(limit);
        } catch (e) {
            errorLog(`CvTheme::filter ${e.message}`);
            return promiseNull();
        }
    };

    public getBy(getBy: IGetBy, projection) {
        try {
            if (getBy._id) {
                return CvTheme.findById(getBy._id, projection);
            } else {
                return promiseNull();
            }
        } catch (e) {
            errorLog(`CvTheme::getBy ${e.message}`)
            return promiseNull();
        }
    }

    public count = (filter: ICvThemeFilterType) => {
        try {
            let condition = getCondition(filter);
            return CvTheme.countDocuments(condition);
        } catch (e) {
            errorLog(`CvTheme::count ${e.message}`);
            return promiseNull();
        }
    };

    public preview = (title, html, height) => {
        const document = `
            <!DOCTYPE html>
            <html>
                <style>
                @page { 
                    size: A4 portrait; 
                    margin:0px 0px 0px 0px;
                }
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

        return puppeteer
            .launch({
                ignoreDefaultArgs: ["--disable-extensions"],
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                headless: true,
            })
            .then(async (browser) => {
                let page = await browser.newPage();
                page.on("console", consoleObj => console.log(consoleObj.text()));
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
                // pdfDoc.setAuthor("Humpty Dumpty");
                // pdfDoc.setSubject("📘 An Epic Tale of Woe 📖");
                // pdfDoc.setKeywords(["eggs", "wall", "fall", "king", "horses", "men"]);
                // pdfDoc.setProducer("PDF App 9000 🤖");
                // pdfDoc.setCreator("pdf-lib (https://github.com/Hopding/pdf-lib)");

                const pdfDocSave = await pdfDoc.saveAsBase64();

                await browser.close();
                return pdfDocSave;
            });
    };
}

const CvThemeService = new CvThemeRepository();
export default CvThemeService;
