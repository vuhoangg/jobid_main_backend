import express from "express";
import { getListTheme, getTheme, putTheme, createTheme } from "../handles";

const router = express.Router();

// cv
router.get("/cv/list", getListTheme);
router.get('/cv/:id', getTheme);
router.put("/cv/:id", putTheme);

// theme
router.get("/theme/list", getListTheme);
router.get('/theme/:id', getTheme);
router.put("/theme/:id", putTheme);
router.post("/theme", createTheme);

export { router as CvRouter };