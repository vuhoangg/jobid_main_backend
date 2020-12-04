import express from "express";
import { getListTheme, getTheme, putTheme, createTheme, previewCv, createCv, getListCv, getCv, updateCv, deleteCv, makeMainCv, requestCv } from "../handles";

const router = express.Router();

// cv
router.get("/cv/list", getListCv);
router.get('/cv/:id', getCv);
router.put("/cv/:id", updateCv);
router.delete("/cv/:id", deleteCv);
router.post("/cv/main", makeMainCv);
router.post("/cv/request", requestCv);

router.post("/cv/preview", previewCv);
router.post("/cv", createCv);

// theme
router.get("/theme/list", getListTheme);
router.get('/theme/:id', getTheme);
router.put("/theme/:id", putTheme);
router.post("/theme", createTheme);

export { router as CvRouter };