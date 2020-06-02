import express from "express";
import {s3UploadImage, s3UploadFile} from "../../../aws/s3";
const router = express.Router();

router.post("/upload_image", async (req, res) => {
    if (req.isAuthenticated()) {
        let base64 = req.body.base64_image;
        let fileName = req.body.fileName;
        let typeUpload = req.body.typeUpload;
        let url = await s3UploadImage(base64, fileName, typeUpload);
        res.send({location: url});
    } else {
        res.send("fail");
    }
});

router.post("/upload_file", async (req, res) => {
  if (req.isAuthenticated()) {
    let base64 = req.body.base64_image;
    let fileName = req.body.fileName;
    let typeUpload = req.body.typeUpload;
    let url = await s3UploadFile(base64, fileName, typeUpload);
    res.send({location: url});
  } else {
    res.send("fail");
  }
});

router.post("/private_upload_image_app", async (req, res) => {
    let base64 = req.body.base64_image;
    let fileName = req.body.fileName;
    let typeUpload = req.body.typeUpload;
    let url = await s3UploadImage(base64, fileName, typeUpload);
    res.send({location: url});
});
export {
    router as UploadRouter
};
