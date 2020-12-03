import express from "express";
import { getListTheme, getTheme, putTheme, createTheme, previewCv, createCv } from "../handles";

const router = express.Router();

// cv
router.get("/cv/list", getListTheme);
router.get('/cv/:id', getTheme);
router.post("/cv/preview", previewCv);
router.post("/cv", createCv);

// theme
router.get("/theme/list", getListTheme);
router.get('/theme/:id', getTheme);
router.put("/theme/:id", putTheme);
router.post("/theme", createTheme);

export { router as CvRouter };