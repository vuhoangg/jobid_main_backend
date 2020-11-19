import express from "express";
import { s3UploadImage, s3UploadFile, s3UploadPdf, s3Upload } from "../../../aws/s3";
import axios from "axios";
import { authenticateEmployer, authenticateUser } from "../../../middlewares/authenticate";
import { detectType } from "../../../helpers/base64";

const router = express.Router();

router.post("/upload_image", async (req, res) => {
  if (await authenticateUser(req, res)) {
    let base64 = req.body.base64_image;
    let fileName = req.body.fileName;
    let typeUpload = req.body.typeUpload;
    let url = await s3UploadImage(base64, fileName, typeUpload);
    res.send({ location: url });
  } else {
    res.send("fail");
  }
});

router.post("/upload_file", async (req, res) => {
  if (await authenticateUser(req, res)) {
    let base64 = req.body.base64_image;
    let fileName = req.body.fileName;
    let typeUpload = req.body.typeUpload;
    let url = await s3UploadFile(base64, fileName, typeUpload);
    res.send({ location: url });
  } else {
    res.send("fail");
  }
});

router.post("/upload_file_pdf", async (req, res) => {
  if (await authenticateUser(req, res)) {
    let baseData = req.body.baseData;
    let fileName = req.body.fileName;
    let typeUpload = req.body.typeUpload;
    let url = await s3UploadPdf(baseData, fileName, typeUpload);
    res.send({ location: url });
  } else {
    res.send("fail");
  }
});

router.post("/private_upload_image_app", async (req, res) => {
  let base64 = req.body.base64_image;
  let fileName = req.body.fileName;
  let typeUpload = req.body.typeUpload;
  let url = await s3UploadImage(base64, fileName, typeUpload);
  res.send({ location: url });
});

router.post("/detect_upload_file", async (req, res) => {
  if (await authenticateUser(req, res)) {
    let loggedInUser: any = req.user;
    let timestamp = new Date().getTime();

    let base64 = req.body.base64;
    let fileName = `${loggedInUser._id}_${timestamp}_${req.body.fileName}`;
    let typeUpload = req.body.typeUpload;
    let url = await s3UploadPdf(base64, fileName, typeUpload);
    let apiDetect = process.env.APP_ENV === "production" ? process.env.DETECT_URL : process.env.LOCAL_DETECT;
    let detected = await axios.post(`${apiDetect}/pdf_detect`, {
      url: url,
    });
    res.send({
      location: url,
      detected: detected ? detected.data : null,
    });
  } else {
    res.send("fail");
  }
});

// ==== TODO new
router.post("/apply", async (req, res) => {
  let isAuthenticated = await authenticateUser(req, res);
  if (isAuthenticated) {
    let loggedInUser = res.locals.user;
    let timestamp = new Date().getTime();

    let fileContent = req.body.file;
    let fileName = `${loggedInUser}_${timestamp}`;

    let url = await s3Upload("apply", fileName, fileContent);

    res.send({
      location: url
    })
  } else {
    res.status(404);
  }
});

router.post("/user_avatar", async (req, res) => {
  let isAuthenticated = await authenticateUser(req, res);
  if (isAuthenticated) {
    let loggedInUser = res.locals.user;
    let timestamp = new Date().getTime();

    let fileContent = req.body.file;
    let fileName = `${loggedInUser}_${timestamp}`;

    let url = await s3Upload("user_avatar", fileName, fileContent);

    res.send({
      location: url
    })
  } else {
    res.status(404);
  }
});
router.post("/job_post_featured", async (req, res) => {
  let isAuthenticated = await authenticateEmployer(req, res);
  if (isAuthenticated) {
    let loggedInEmployer = res.locals.employer;
    let timestamp = new Date().getTime();

    let fileContent = req.body.file;
    let fileName = `${loggedInEmployer}_${timestamp}`;

    let url = await s3Upload("job_post_featured", fileName, fileContent);

    res.send({
      location: url
    })
  } else {
    res.status(404);
  }
});
router.post("/job_post_image", async (req, res) => {
  let isAuthenticated = await authenticateEmployer(req, res);
  if (isAuthenticated) {
    let loggedInEmployer = res.locals.employer;
    let timestamp = new Date().getTime();

    let fileContent = req.body.file;
    let fileName = `${loggedInEmployer}_${timestamp}`;

    let url = await s3Upload("job_post_image", fileName, fileContent);

    res.send({
      location: url
    })
  } else {
    res.status(404);
  }
});


export { router as UploadRouter };
