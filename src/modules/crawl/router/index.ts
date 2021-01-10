import express from "express";
import { importCompany, importJobKeyword, importJobSkill, importJobPost } from "../handles";

const router = express.Router();


router.post("/import/job_keyword", importJobKeyword);
router.post("/import/job_skill", importJobSkill);
router.post("/import/company", importCompany);
router.post("/import/job_post", importJobPost);

export { router as CrawlRouter }