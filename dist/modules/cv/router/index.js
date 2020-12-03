"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CvRouter = void 0;
const express_1 = __importDefault(require("express"));
const handles_1 = require("../handles");
const router = express_1.default.Router();
exports.CvRouter = router;
// cv
router.get("/cv/list", handles_1.getListTheme);
router.get('/cv/:id', handles_1.getTheme);
router.post("/cv/preview", handles_1.previewCv);
router.post("/cv", handles_1.createCv);
// theme
router.get("/theme/list", handles_1.getListTheme);
router.get('/theme/:id', handles_1.getTheme);
router.put("/theme/:id", handles_1.putTheme);
router.post("/theme", handles_1.createTheme);
//# sourceMappingURL=index.js.map