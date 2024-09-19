"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Upload = exports.s3UploadPdf = exports.s3UploadFile = exports.s3UploadImage = exports.s3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const data_uri_to_buffer_1 = __importDefault(require("data-uri-to-buffer"));
exports.s3 = new aws_sdk_1.default.S3({
    endpoint: process.env.AWS_ENPOINT,
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    signatureVersion: "v4",
    region: process.env.AWS_REGION
});
const s3UploadImage = (fileContent, fileName, typeUpload) => {
    const type = fileContent.split(";")[0].split("/")[1];
    const base64Data = Buffer.from(fileContent.replace(/^data:image\/\w+;base64,/, ""), "base64");
    return new Promise((resolve) => {
        const params = {
            Bucket: `${process.env.S3_BUCKET_NAME}/${typeUpload}`,
            Key: `${fileName}`, // File name you want to save as in S3
            Body: base64Data,
            ContentType: `image/${type}`,
            ACL: process.env.S3_FILE_PERMISSION,
        };
        // Uploading files to the bucket
        exports.s3.upload(params, (err, data) => {
            var _a;
            if (err) {
                throw err;
            }
            let dataReturn = (_a = data === null || data === void 0 ? void 0 : data.Location) === null || _a === void 0 ? void 0 : _a.replace(process.env.CLOUDFLARE_ACCOUNT_URL_FIRST, process.env.CLOUDFLARE_PUBLIC_URL);
            dataReturn = dataReturn === null || dataReturn === void 0 ? void 0 : dataReturn.replace(process.env.CLOUDFLARE_ACCOUNT_URL, process.env.CLOUDFLARE_PUBLIC_URL);
            dataReturn = dataReturn === null || dataReturn === void 0 ? void 0 : dataReturn.replace(process.env.CLOUDFLARE_ACCOUNT_URL_SECOND, process.env.CLOUDFLARE_PUBLIC_URL);
            dataReturn = dataReturn === null || dataReturn === void 0 ? void 0 : dataReturn.replace(process.env.CLOUDFLARE_ACCOUNT_URL_THIRD, process.env.CLOUDFLARE_PUBLIC_URL);
            resolve(dataReturn);
        });
    });
    // Read content from the file
    // const fileContent = fs.readFileSync(fileName);
    // Setting up S3 upload parameters
};
exports.s3UploadImage = s3UploadImage;
const s3UploadFile = (fileContent, fileName, typeUpload) => {
    const type = fileContent.split(";")[0].split("/")[1];
    const base64Data = Buffer.from(fileContent.replace(/^data:image\/\w+;base64,/, ""), "base64");
    return new Promise((resolve) => {
        const params = {
            Bucket: `${process.env.S3_BUCKET_NAME}/${typeUpload}`,
            Key: fileName, // File name you want to save as in S3
            Body: base64Data,
            ContentType: `image/${type}`,
            ACL: process.env.S3_FILE_PERMISSION,
        };
        // Uploading files to the bucket
        exports.s3.upload(params, (err, data) => {
            var _a;
            if (err) {
                throw err;
            }
            let dataReturn = (_a = data === null || data === void 0 ? void 0 : data.Location) === null || _a === void 0 ? void 0 : _a.replace(process.env.CLOUDFLARE_ACCOUNT_URL_FIRST, process.env.CLOUDFLARE_PUBLIC_URL);
            dataReturn = dataReturn === null || dataReturn === void 0 ? void 0 : dataReturn.replace(process.env.CLOUDFLARE_ACCOUNT_URL, process.env.CLOUDFLARE_PUBLIC_URL);
            dataReturn = dataReturn === null || dataReturn === void 0 ? void 0 : dataReturn.replace(process.env.CLOUDFLARE_ACCOUNT_URL_SECOND, process.env.CLOUDFLARE_PUBLIC_URL);
            dataReturn = dataReturn === null || dataReturn === void 0 ? void 0 : dataReturn.replace(process.env.CLOUDFLARE_ACCOUNT_URL_THIRD, process.env.CLOUDFLARE_PUBLIC_URL);
            resolve(dataReturn);
        });
    });
    // Read content from the file
    // const fileContent = fs.readFileSync(fileName);
    // Setting up S3 upload parameters
};
exports.s3UploadFile = s3UploadFile;
const s3UploadPdf = (fileContent, fileName, typeUpload) => {
    const type = fileContent.split(";")[0].split("/")[1];
    const baseData = (0, data_uri_to_buffer_1.default)(fileContent);
    return new Promise((resolve) => {
        const params = {
            Bucket: `${process.env.S3_BUCKET_NAME}/${typeUpload}`,
            Key: fileName, // File name you want to save as in S3
            Body: baseData,
            ContentType: `application/${type}`,
            ACL: process.env.S3_FILE_PERMISSION,
        };
        // Uploading files to the bucket
        exports.s3.upload(params, (err, data) => {
            var _a;
            if (err) {
                throw err;
            }
            let dataReturn = (_a = data === null || data === void 0 ? void 0 : data.Location) === null || _a === void 0 ? void 0 : _a.replace(process.env.CLOUDFLARE_ACCOUNT_URL_FIRST, process.env.CLOUDFLARE_PUBLIC_URL);
            dataReturn = dataReturn === null || dataReturn === void 0 ? void 0 : dataReturn.replace(process.env.CLOUDFLARE_ACCOUNT_URL, process.env.CLOUDFLARE_PUBLIC_URL);
            dataReturn = dataReturn === null || dataReturn === void 0 ? void 0 : dataReturn.replace(process.env.CLOUDFLARE_ACCOUNT_URL_SECOND, process.env.CLOUDFLARE_PUBLIC_URL);
            dataReturn = dataReturn === null || dataReturn === void 0 ? void 0 : dataReturn.replace(process.env.CLOUDFLARE_ACCOUNT_URL_THIRD, process.env.CLOUDFLARE_PUBLIC_URL);
            resolve(dataReturn);
        });
    });
    // Read content from the file
    // const fileContent = fs.readFileSync(fileName);
    // Setting up S3 upload parameters
};
exports.s3UploadPdf = s3UploadPdf;
const s3Upload = (directory, fileName, fileContent) => {
    let headerData = fileContent.split(";")[0];
    let contentType = headerData.replace("data:", "");
    let extension = contentType.split("/")[1];
    let key = `${fileName}.${extension}`;
    const baseData = (0, data_uri_to_buffer_1.default)(fileContent);
    return new Promise((resolve) => {
        const params = {
            Bucket: `${process.env.S3_BUCKET_NAME}/${directory}`,
            Key: key, // File name you want to save as in S3
            Body: baseData,
            ContentType: contentType,
            ACL: process.env.S3_FILE_PERMISSION,
        };
        // Uploading files to the bucket
        exports.s3.upload(params, (err, data) => {
            var _a;
            if (err) {
                throw err;
            }
            let dataReturn = (_a = data === null || data === void 0 ? void 0 : data.Location) === null || _a === void 0 ? void 0 : _a.replace(process.env.CLOUDFLARE_ACCOUNT_URL_FIRST, process.env.CLOUDFLARE_PUBLIC_URL);
            dataReturn = dataReturn === null || dataReturn === void 0 ? void 0 : dataReturn.replace(process.env.CLOUDFLARE_ACCOUNT_URL, process.env.CLOUDFLARE_PUBLIC_URL);
            dataReturn = dataReturn === null || dataReturn === void 0 ? void 0 : dataReturn.replace(process.env.CLOUDFLARE_ACCOUNT_URL_SECOND, process.env.CLOUDFLARE_PUBLIC_URL);
            dataReturn = dataReturn === null || dataReturn === void 0 ? void 0 : dataReturn.replace(process.env.CLOUDFLARE_ACCOUNT_URL_THIRD, process.env.CLOUDFLARE_PUBLIC_URL);
            resolve(dataReturn);
        });
    });
};
exports.s3Upload = s3Upload;
//# sourceMappingURL=index.js.map