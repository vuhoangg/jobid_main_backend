import CvThemeService from "../../../db/repositories/CvThemeRepository";
import CvUserService from "../../../db/repositories/CvUserRepository";
import CvRequestService from "../../../db/repositories/CvRequestRepository";
import { authenticateUser } from "../../../middlewares/authenticate";

export const getListTheme = async (req, res) => {
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

    const themes = await CvThemeService.filter(filter, page, limit, {});
    res.json({ status: true, themes: themes });
};
export const getTheme = async (req, res) => {
    let id = req.params.id;
    const theme = await CvThemeService.get(id, {});
    res.json({ status: true, theme: theme });
}
export const putTheme = async (req, res) => {
    let isAuthenticated = await authenticateUser(req, res);
    if (isAuthenticated) {
        let data = req.body;
        let userId = res.locals.user;
        let themeFind = await CvThemeService.get(data._id, {});
        if (themeFind.created_by == userId) {
            const theme = await CvThemeService.update(data);
            res.json({ status: true, theme: theme });
        } else {
            res.json({ status: false });
        }
    } else {
        res.json({ status: false });
    }
}
export const createTheme = async (req, res) => {
    let isAuthenticated = await authenticateUser(req, res);
    if (isAuthenticated) {
        let data = req.body;
        let userId = res.locals.user;
        data = Object.assign(data, { created_by: userId });
        const theme = await CvThemeService.create(data);
        res.json({ status: true, theme: theme });
    } else {
        res.json({ status: false });
    }
}

export const previewCv = async (req, res) => {
    let isAuthenticated = await authenticateUser(req, res);
    if (isAuthenticated) {
        let data = req.body;
        let title = data.title;
        let html = data.html;
        let height = data.height;

        const pdfBase64 = await CvThemeService.preview(title, html, height);

        res.json({ status: true, pdf: pdfBase64 });
    } else {
        res.json({ status: false, pdf: null });
    }
}

export const createCv = async (req, res) => {
    let isAuthenticated = await authenticateUser(req, res);
    if (isAuthenticated) {
        let { title, html_view, html_full, html_view_height, cv_data } = req.body;
        let user = res.locals.user;
        let cvUser = await CvUserService.makeCv(title, html_view, html_full, html_view_height, cv_data, user);
        res.json({ status: true, cv: cvUser });
    } else {
        res.json({ status: false });
    }
}

export const getListCv = async (req, res) => {
    let isAuthenticated = await authenticateUser(req, res);
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
        let cvs = await CvUserService.filter(filter, page, limit, {});
        for (let i = 0; i < cvs.length; i++) {
            let is_request = !! await CvRequestService.getBy({ cv_user: cvs[i]._id, status: "request" }, {});
            let item = cvs[i].toObject();
            item = Object.assign(item, { is_request: is_request });
            tmp_cvs.push(item);
        }
        let totalCv = await CvUserService.count(filter);

        res.json({ status: true, cvs: tmp_cvs, total: totalCv });
    } else {
        res.json({ status: false });
    }
}
export const getCv = async (req, res) => {
    let isAuthenticated = await authenticateUser(req, res);
    if (isAuthenticated) {
        let user = res.locals.user;
        let id = req.params.id;
        let cv = await CvUserService.getBy({ user: user, _id: id }, {});
        res.json({ status: true, cv: cv });
    } else {
        res.json({ status: false, cv: null });
    }
}

export const updateCv = async (req, res) => {
    let isAuthenticated = await authenticateUser(req, res);
    if (isAuthenticated) {
        let user = res.locals.user;
        let id = req.params.id;
        let cv = await CvUserService.getBy({ user: user, _id: id }, {});
        if (cv) {
            let { title, html_view, html_full, html_view_height, cv_data } = req.body;
            cv = await CvUserService.updateCv(id, title, html_view, html_full, html_view_height, cv_data, user);
        }
        res.json({ status: true, cv: cv });
    } else {
        res.json({ status: false, cv: null });
    }
}

export const deleteCv = async (req, res) => {
    let isAuthenticated = await authenticateUser(req, res);
    if (isAuthenticated) {
        let user = res.locals.user;
        let id = req.params.id;
        let cv = await CvUserService.getBy({ user: user, _id: id }, {});
        if (cv) {
            await CvUserService.update({ _id: id, status: "delete" });
        }
        res.json({ status: true, cv: cv });
    } else {
        res.json({ status: false, cv: null });
    }
}
export const makeMainCv = async (req, res) => {
    let isAuthenticated = await authenticateUser(req, res);
    if (isAuthenticated) {
        let user = res.locals.user;
        let _id = req.body._id;
        let cvs = await CvUserService.all({ user: user });
        for (let i = 0; i < cvs.length; i++) {
            if (cvs[i]._id == _id) {
                await CvUserService.update({ _id: cvs[i]._id, main_cv: true });
            } else {
                await CvUserService.update({ _id: cvs[i]._id, main_cv: false });
            }
        }
        res.json({ status: true });
    } else {
        res.json({ status: false });
    }
}

export const requestCv = async (req, res) => {
    let isAuthenticated = await authenticateUser(req, res);
    if (isAuthenticated) {
        let user = res.locals.user;
        let cv = req.body.cv;
        let description = req.body.description;

        let findCv = await CvUserService.getBy({ user: user, _id: cv }, {});
        if (findCv) {
            let findRequest = await CvRequestService.getBy({ cv_user: cv, status: "request" }, {});
            if (findRequest) {
                res.json({ status: false, message: "CV đang chờ nhận xét của chuyên gia" });
            } else {
                let data = {
                    request: description,
                    cv_user: cv,
                }
                let request = await CvRequestService.create(data);
                res.json({ status: true, request: request, message: "Đã gửi CV. Vui lòng chờ nhận xét của chuyên gia" });
            }
        } else {
            res.json({ status: false, message: "CV không phải của bạn" });
        }
    } else {
        res.json({ status: false });
    }
}