import CvThemeService from "../../../db/repositories/CvThemeRepository";
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
        let data = req.body;

    } else {
        res.json({ status: false });
    }
}