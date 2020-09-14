import express from "express";
import { s3UploadImage, s3UploadFile, s3UploadPdf } from "../../../aws/s3";
import axios from "axios";
import { authenticate } from "../../../middlewares/authenticate";

const router = express.Router();

router.post("/upload_image", async (req, res) => {
  if (await authenticate(req, res)) {
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
  if (await authenticate(req, res)) {
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
  if (await authenticate(req, res)) {
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
  if (await authenticate(req, res)) {
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

export { router as UploadRouter };
