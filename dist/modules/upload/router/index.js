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
const express_1 = __importDefault(require("express"));
const s3_1 = require("../../../aws/s3");
const router = express_1.default.Router();
exports.UploadRouter = router;
router.post("/upload_image", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.isAuthenticated()) {
        let base64 = req.body.base64_image;
        let fileName = req.body.fileName;
        let typeUpload = req.body.typeUpload;
        let url = yield s3_1.s3UploadFile(base64, fileName, typeUpload);
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
    let url = yield s3_1.s3UploadFile(base64, fileName, typeUpload);
    res.send({ location: url });
}));
//# sourceMappingURL=index.js.map