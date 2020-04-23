"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
exports.s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
});
exports.s3UploadFile = (fileContent, fileName, typeUpload) => {
    const type = fileContent.split(';')[0].split('/')[1];
    const base64Data = Buffer.from(fileContent.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    return new Promise(resolve => {
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
//# sourceMappingURL=index.js.map