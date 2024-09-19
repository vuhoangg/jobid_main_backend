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
exports.UploadRouter = void 0;
const express_1 = __importDefault(require("express"));
const s3_1 = require("../../../aws/s3");
const axios_1 = __importDefault(require("axios"));
const authenticate_1 = require("../../../middlewares/authenticate");
const router = express_1.default.Router();
exports.UploadRouter = router;
router.post("/upload_image", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, authenticate_1.authenticateUser)(req, res)) {
        let base64 = req.body.base64_image;
        let fileName = req.body.fileName;
        let typeUpload = req.body.typeUpload;
        let url = yield (0, s3_1.s3UploadImage)(base64, fileName, typeUpload);
        res.send({ location: url });
    }
    else {
        res.send("fail");
    }
}));
router.post("/upload_file", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, authenticate_1.authenticateUser)(req, res)) {
        let base64 = req.body.base64_image;
        let fileName = req.body.fileName;
        let typeUpload = req.body.typeUpload;
        let url = yield (0, s3_1.s3UploadFile)(base64, fileName, typeUpload);
        res.send({ location: url });
    }
    else {
        res.send("fail");
    }
}));
router.post("/upload_file_pdf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, authenticate_1.authenticateUser)(req, res)) {
        let baseData = req.body.baseData;
        let fileName = req.body.fileName;
        let typeUpload = req.body.typeUpload;
        let url = yield (0, s3_1.s3UploadPdf)(baseData, fileName, typeUpload);
        res.send({ location: url });
    }
    else {
        res.send("fail");
    }
}));
router.post("/private_upload_image_app", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let base64 = req.body.base64_image;
    let fileName = req.body.fileName;
    let typeUpload = req.body.typeUpload;
    let url = yield (0, s3_1.s3UploadImage)(base64, fileName, typeUpload);
    res.send({ location: url });
}));
router.post("/detect_upload_file", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, authenticate_1.authenticateUser)(req, res)) {
        let loggedInUser = req.user;
        let timestamp = new Date().getTime();
        let base64 = req.body.base64;
        let fileName = `${loggedInUser._id}_${timestamp}_${req.body.fileName}`;
        let typeUpload = req.body.typeUpload;
        let url = yield (0, s3_1.s3UploadPdf)(base64, fileName, typeUpload);
        let apiDetect = process.env.APP_ENV === "production" ? process.env.DETECT_URL : process.env.LOCAL_DETECT;
        let detected = yield axios_1.default.post(`${apiDetect}/pdf_detect`, {
            url: url,
        });
        res.send({
            location: url,
            detected: detected ? detected.data : null,
        });
    }
    else {
        res.send("fail");
    }
}));
// ==== TODO new
router.post("/apply", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield (0, authenticate_1.authenticateUser)(req, res);
    if (isAuthenticated) {
        let loggedInUser = res.locals.user;
        let timestamp = new Date().getTime();
        let fileContent = req.body.file;
        let fileName = `${loggedInUser}_${timestamp}`;
        let url = yield (0, s3_1.s3Upload)("apply", fileName, fileContent);
        res.send({
            location: url
        });
    }
    else {
        res.status(404);
    }
}));
router.post("/user_avatar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield (0, authenticate_1.authenticateUser)(req, res);
    if (isAuthenticated) {
        let loggedInUser = res.locals.user;
        let timestamp = new Date().getTime();
        let fileContent = req.body.file;
        let fileName = `${loggedInUser}_${timestamp}`;
        let url = yield (0, s3_1.s3Upload)("user_avatar", fileName, fileContent);
        res.send({
            location: url
        });
    }
    else {
        res.status(404);
    }
}));
router.post("/job_post_featured", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield (0, authenticate_1.authenticateEmployer)(req, res);
    if (isAuthenticated) {
        let loggedInEmployer = res.locals.employer;
        let timestamp = new Date().getTime();
        let fileContent = req.body.file;
        let fileName = `${loggedInEmployer}_${timestamp}`;
        let url = yield (0, s3_1.s3Upload)("job_post_featured", fileName, fileContent);
        res.send({
            location: url
        });
    }
    else {
        res.status(404);
    }
}));
router.post("/job_post_image", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield (0, authenticate_1.authenticateEmployer)(req, res);
    if (isAuthenticated) {
        let loggedInEmployer = res.locals.employer;
        let timestamp = new Date().getTime();
        let fileContent = req.body.file;
        let fileName = `${loggedInEmployer}_${timestamp}`;
        let url = yield (0, s3_1.s3Upload)("job_post_image", fileName, fileContent);
        res.send({
            location: url
        });
    }
    else {
        res.status(404);
    }
}));
router.post("/company_people", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield (0, authenticate_1.authenticateEmployer)(req, res);
    if (isAuthenticated) {
        let loggedInEmployer = res.locals.employer;
        let timestamp = new Date().getTime();
        let fileContent = req.body.file;
        let fileName = `${loggedInEmployer}_${timestamp}`;
        let url = yield (0, s3_1.s3Upload)("company_people", fileName, fileContent);
        res.send({
            location: url
        });
    }
    else {
        res.status(404);
    }
}));
router.post("/company_media", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield (0, authenticate_1.authenticateEmployer)(req, res);
    if (isAuthenticated) {
        let loggedInEmployer = res.locals.employer;
        let timestamp = new Date().getTime();
        let fileContent = req.body.file;
        let fileName = `${loggedInEmployer}_${timestamp}`;
        let url = yield (0, s3_1.s3Upload)("company_media", fileName, fileContent);
        res.send({
            location: url
        });
    }
    else {
        res.status(404);
    }
}));
router.post("/company_avatar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield (0, authenticate_1.authenticateEmployer)(req, res);
    if (isAuthenticated) {
        let loggedInEmployer = res.locals.employer;
        let timestamp = new Date().getTime();
        let fileContent = req.body.file;
        let fileName = `${loggedInEmployer}_${timestamp}`;
        let url = yield (0, s3_1.s3Upload)("company_avatar", fileName, fileContent);
        res.send({
            location: url
        });
    }
    else {
        res.status(404);
    }
}));
router.post("/cv_warehouse", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield (0, authenticate_1.authenticateEmployer)(req, res);
    if (isAuthenticated) {
        let loggedInEmployer = res.locals.employer;
        let timestamp = new Date().getTime();
        let fileContent = req.body.file;
        let fileName = `${loggedInEmployer}_${timestamp}`;
        let url = yield (0, s3_1.s3Upload)("cv_warehouse", fileName, fileContent);
        res.send({
            location: url
        });
    }
    else {
        res.status(404);
    }
}));
//# sourceMappingURL=index.js.map