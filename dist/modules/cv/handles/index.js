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
exports.createTheme = exports.putTheme = exports.getTheme = exports.getListTheme = void 0;
const CvThemeRepository_1 = __importDefault(require("../../../db/repositories/CvThemeRepository"));
const authenticate_1 = require("../../../middlewares/authenticate");
exports.getListTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);
    let created_by = req.query.created_by;
    let status = req.query.status;
    let filter = {};
    if (created_by) {
        filter = Object.assign(filter, { created_by: created_by });
    }
    if (status) {
        filter = Object.assign(filter, { status: status });
    }
    const themes = yield CvThemeRepository_1.default.filter(filter, page, limit, {});
    res.json({ status: true, themes: themes });
});
exports.getTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    const theme = yield CvThemeRepository_1.default.get(id, {});
    res.json({ status: true, theme: theme });
});
exports.putTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(req, res);
    if (isAuthenticated) {
        let data = req.body;
        let userId = res.locals.user;
        let themeFind = yield CvThemeRepository_1.default.get(data._id, {});
        if (themeFind.created_by == userId) {
            const theme = yield CvThemeRepository_1.default.update(data);
            res.json({ status: true, theme: theme });
        }
        else {
            res.json({ status: false });
        }
    }
    else {
        res.json({ status: false });
    }
});
exports.createTheme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(req, res);
    if (isAuthenticated) {
        let data = req.body;
        let userId = res.locals.user;
        data = Object.assign(data, { created_by: userId });
        const theme = yield CvThemeRepository_1.default.create(data);
        res.json({ status: true, theme: theme });
    }
    else {
        res.json({ status: false });
    }
});
//# sourceMappingURL=index.js.map