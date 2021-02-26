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
const CvThemeRepository_1 = __importDefault(require("../../../db/repositories/CvThemeRepository"));
const CvUserRepository_1 = __importDefault(require("../../../db/repositories/CvUserRepository"));
const CvRequestRepository_1 = __importDefault(require("../../../db/repositories/CvRequestRepository"));
const authenticate_1 = require("../../../middlewares/authenticate");
const permission_1 = require("../../../helpers/permission");
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
exports.previewCv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(req, res);
    if (isAuthenticated) {
        let data = req.body;
        let title = data.title;
        let html = data.html;
        let height = data.height;
        const pdfBase64 = yield CvThemeRepository_1.default.preview(title, html, height);
        res.json({ status: true, pdf: pdfBase64 });
    }
    else {
        res.json({ status: false, pdf: null });
    }
});
exports.createCv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(req, res);
    if (isAuthenticated) {
        let { title, html_view, html_full, html_view_height, cv_data } = req.body;
        let user = res.locals.user;
        let cvUser = yield CvUserRepository_1.default.makeCv(title, html_view, html_full, html_view_height, cv_data, user);
        res.json({ status: true, cv: cvUser });
    }
    else {
        res.json({ status: false });
    }
});
exports.getListCv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(req, res);
    if (isAuthenticated) {
        let user = res.locals.user;
        let page = Number(req.query.page);
        let limit = Number(req.query.limit);
        let status = req.query.status;
        let filter = {};
        filter = Object.assign(filter, { user: user });
        if (status) {
            filter = Object.assign(filter, { status: "active" });
        }
        let tmp_cvs = [];
        let cvs = yield CvUserRepository_1.default.filter(filter, page, limit, {});
        for (let i = 0; i < cvs.length; i++) {
            let is_request = !!(yield CvRequestRepository_1.default.getBy({ cv_user: cvs[i]._id, status: "request" }, {}));
            let item = cvs[i].toObject();
            item = Object.assign(item, { is_request: is_request });
            tmp_cvs.push(item);
        }
        let totalCv = yield CvUserRepository_1.default.count(filter);
        res.json({ status: true, cvs: tmp_cvs, total: totalCv });
    }
    else {
        res.json({ status: false });
    }
});
exports.getCv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(req, res);
    if (isAuthenticated) {
        let user = res.locals.user;
        let id = req.params.id;
        let cv = yield CvUserRepository_1.default.getBy({ user: user, _id: id }, {});
        res.json({ status: true, cv: cv });
    }
    else {
        res.json({ status: false, cv: null });
    }
});
exports.updateCv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(req, res);
    if (isAuthenticated) {
        let user = res.locals.user;
        let id = req.params.id;
        let cv = yield CvUserRepository_1.default.getBy({ user: user, _id: id }, {});
        if (cv) {
            let { title, html_view, html_full, html_view_height, cv_data } = req.body;
            cv = yield CvUserRepository_1.default.updateCv(id, title, html_view, html_full, html_view_height, cv_data, user);
        }
        res.json({ status: true, cv: cv });
    }
    else {
        res.json({ status: false, cv: null });
    }
});
exports.deleteCv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(req, res);
    if (isAuthenticated) {
        let user = res.locals.user;
        let id = req.params.id;
        let cv = yield CvUserRepository_1.default.getBy({ user: user, _id: id }, {});
        if (cv) {
            yield CvUserRepository_1.default.update({ _id: id, status: "delete" });
        }
        res.json({ status: true, cv: cv });
    }
    else {
        res.json({ status: false, cv: null });
    }
});
exports.makeMainCv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(req, res);
    if (isAuthenticated) {
        let user = res.locals.user;
        let _id = req.body._id;
        let cvs = yield CvUserRepository_1.default.all({ user: user });
        for (let i = 0; i < cvs.length; i++) {
            if (cvs[i]._id == _id) {
                yield CvUserRepository_1.default.update({ _id: cvs[i]._id, main_cv: true });
            }
            else {
                yield CvUserRepository_1.default.update({ _id: cvs[i]._id, main_cv: false });
            }
        }
        res.json({ status: true });
    }
    else {
        res.json({ status: false });
    }
});
exports.requestCv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(req, res);
    if (isAuthenticated) {
        let user = res.locals.user;
        let cv = req.body.cv;
        let description = req.body.description;
        let findCv = yield CvUserRepository_1.default.getBy({ user: user, _id: cv }, {});
        if (findCv) {
            let findRequest = yield CvRequestRepository_1.default.getBy({ cv_user: cv, status: "request" }, {});
            if (findRequest) {
                res.json({ status: false, message: "CV đang chờ nhận xét của chuyên gia" });
            }
            else {
                let data = {
                    request: description,
                    cv_user: cv,
                };
                let request = yield CvRequestRepository_1.default.create(data);
                res.json({ status: true, request: request, message: "Đã gửi CV. Vui lòng chờ nhận xét của chuyên gia" });
            }
        }
        else {
            res.json({ status: false, message: "CV không phải của bạn" });
        }
    }
    else {
        res.json({ status: false });
    }
});
exports.getRequestCv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(req, res);
    if (isAuthenticated) {
        let user = res.locals.user;
        let fullUser = res.locals.fullUser;
        if (permission_1.isSuperUser(fullUser.email)) {
            let id = req.params.id;
            let request = yield CvRequestRepository_1.default.get(id, {});
            let cv_user = yield CvUserRepository_1.default.get(request.cv_user, {});
            let page = Number(req.query.page);
            let limit = Number(req.query.limit);
            let history = yield CvRequestRepository_1.default.filter({ cv_user: request.cv_user }, page, limit, {});
            res.json({ status: true, request: request, cv_user: cv_user, history: history });
        }
        else {
            res.json({ status: false, message: "Không phải là Admin" });
        }
    }
    else {
        res.json({ status: false });
    }
});
exports.getHistoryRequestCv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(req, res);
    if (isAuthenticated) {
        let user = res.locals.user;
        let cv_user = req.params.cv_user_id;
        let page = Number(req.query.page);
        let limit = Number(req.query.limit);
        let findCv = yield CvUserRepository_1.default.getBy({ user: user, _id: cv_user }, {});
        if (findCv) {
            let findRequest = yield CvRequestRepository_1.default.filter({ cv_user: cv_user }, page, limit, {});
            res.json({ status: true, request: findRequest });
        }
        else {
            res.json({ status: false, message: "CV không phải của bạn" });
        }
    }
    else {
        res.json({ status: false });
    }
});
exports.getAllRequestCv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(req, res);
    if (isAuthenticated) {
        let user = res.locals.user;
        let fullUser = res.locals.fullUser;
        if (permission_1.isSuperUser(fullUser.email)) {
            let page = Number(req.query.page);
            let limit = Number(req.query.limit);
            let findRequest = yield CvRequestRepository_1.default.filter({}, page, limit, {});
            let requests = [];
            for (let i = 0; i < findRequest.length; i++) {
                let cv_user = yield CvUserRepository_1.default.get(findRequest[i].cv_user, {});
                let item = findRequest[i].toObject();
                item = Object.assign(item, { cv: cv_user });
                requests.push(item);
            }
            res.json({ status: true, requests: requests });
        }
        else {
            res.json({ status: false, message: "Không phải là Admin" });
        }
    }
    else {
        res.json({ status: false });
    }
});
exports.putRequestCv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(req, res);
    if (isAuthenticated) {
        let user = res.locals.user;
        let fullUser = res.locals.fullUser;
        if (permission_1.isSuperUser(fullUser.email)) {
            let data = req.body;
            data = Object.assign(data, { _id: req.params.id });
            let request = yield CvRequestRepository_1.default.update(data);
            res.json({ status: true, request: request });
        }
        else {
            res.json({ status: false, message: "Không phải là Admin" });
        }
    }
    else {
        res.json({ status: false });
    }
});
//# sourceMappingURL=index.js.map