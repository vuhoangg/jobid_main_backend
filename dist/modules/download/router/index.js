"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadRouter = exports.s3 = void 0;
const express_1 = __importDefault(require("express"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
exports.DownloadRouter = router;
exports.s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
});
router.post("/", (req, res, next) => {
    const { url } = req.body;
    axios_1.default({
        method: "get",
        url,
        responseType: "stream",
    }).then(function (response) {
        response.data.pipe(fs_1.default.createWriteStream("./temp/my.pdf"));
    });
    res.send("ok");
});
//# sourceMappingURL=index.js.map