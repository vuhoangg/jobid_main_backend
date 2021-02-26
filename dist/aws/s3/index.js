"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const data_uri_to_buffer_1 = __importDefault(require("data-uri-to-buffer"));
exports.s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
});
exports.s3UploadImage = (fileContent, fileName, typeUpload) => {
    const type = fileContent.split(";")[0].split("/")[1];
    const base64Data = Buffer.from(fileContent.replace(/^data:image\/\w+;base64,/, ""), "base64");
    return new Promise((resolve) => {
        const params = {
            Bucket: `${process.env.S3_BUCKET_NAME}/${typeUpload}`,
            Key: `${fileName}`,
            Body: base64Data,
            ContentType: `image/${type}`,
            ACL: process.env.S3_FILE_PERMISSION,
        };
        // Uploading files to the bucket
        exports.s3.upload(params, (err, data) => {
            if (err) {
                throw err;
            }
            resolve(data.Location);
        });
    });
    // Read content from the file
    // const fileContent = fs.readFileSync(fileName);
    // Setting up S3 upload parameters
};
exports.s3UploadFile = (fileContent, fileName, typeUpload) => {
    const type = fileContent.split(";")[0].split("/")[1];
    const base64Data = Buffer.from(fileContent.replace(/^data:image\/\w+;base64,/, ""), "base64");
    return new Promise((resolve) => {
        const params = {
            Bucket: `${process.env.S3_BUCKET_NAME}/${typeUpload}`,
            Key: fileName,
            Body: base64Data,
            ContentType: `image/${type}`,
            ACL: process.env.S3_FILE_PERMISSION,
        };
        // Uploading files to the bucket
        exports.s3.upload(params, (err, data) => {
            if (err) {
                throw err;
            }
            resolve(data.Location);
        });
    });
    // Read content from the file
    // const fileContent = fs.readFileSync(fileName);
    // Setting up S3 upload parameters
};
exports.s3UploadPdf = (fileContent, fileName, typeUpload) => {
    const type = fileContent.split(";")[0].split("/")[1];
    const baseData = data_uri_to_buffer_1.default(fileContent);
    return new Promise((resolve) => {
        const params = {
            Bucket: `${process.env.S3_BUCKET_NAME}/${typeUpload}`,
            Key: fileName,
            Body: baseData,
            ContentType: `application/${type}`,
            ACL: process.env.S3_FILE_PERMISSION,
        };
        // Uploading files to the bucket
        exports.s3.upload(params, (err, data) => {
            if (err) {
                throw err;
            }
            resolve(data.Location);
        });
    });
    // Read content from the file
    // const fileContent = fs.readFileSync(fileName);
    // Setting up S3 upload parameters
};
exports.s3Upload = (directory, fileName, fileContent) => {
    let headerData = fileContent.split(";")[0];
    let contentType = headerData.replace("data:", "");
    let extension = contentType.split("/")[1];
    let key = `${fileName}.${extension}`;
    const baseData = data_uri_to_buffer_1.default(fileContent);
    return new Promise((resolve) => {
        const params = {
            Bucket: `${process.env.S3_BUCKET_NAME}/${directory}`,
            Key: key,
            Body: baseData,
            ContentType: contentType,
            ACL: process.env.S3_FILE_PERMISSION,
        };
        // Uploading files to the bucket
        exports.s3.upload(params, (err, data) => {
            if (err) {
                throw err;
            }
            resolve(data.Location);
        });
    });
};
//# sourceMappingURL=index.js.map