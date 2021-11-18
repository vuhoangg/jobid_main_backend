"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlRouter = void 0;
const express_1 = __importDefault(require("express"));
const handles_1 = require("../handles");
const router = express_1.default.Router();
exports.CrawlRouter = router;
router.post("/import/job_keyword", handles_1.importJobKeyword);
router.post("/import/job_skill", handles_1.importJobSkill);
router.post("/import/company", handles_1.importCompany);
router.post("/import/job_post", handles_1.importJobPost);
//# sourceMappingURL=index.js.map