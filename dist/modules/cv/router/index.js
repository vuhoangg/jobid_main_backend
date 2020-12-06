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
router.get("/cv/list", handles_1.getListCv);
router.get('/cv/:id', handles_1.getCv);
router.put("/cv/:id", handles_1.updateCv);
router.delete("/cv/:id", handles_1.deleteCv);
router.post("/cv/main", handles_1.makeMainCv);
router.post("/cv/request", handles_1.requestCv);
router.get("/cv/request/all", handles_1.getAllRequestCv);
router.get("/cv/request-history/:cv_user_id", handles_1.getHistoryRequestCv);
router.get("/cv/request/:id", handles_1.getRequestCv);
router.put("/cv/request/:id", handles_1.putRequestCv);
router.post("/cv/preview", handles_1.previewCv);
router.post("/cv", handles_1.createCv);
// theme
router.get("/theme/list", handles_1.getListTheme);
router.get('/theme/:id', handles_1.getTheme);
router.put("/theme/:id", handles_1.putTheme);
router.post("/theme", handles_1.createTheme);
//# sourceMappingURL=index.js.map