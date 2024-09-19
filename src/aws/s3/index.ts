import AWS from "aws-sdk";
import dataUriToBuffer from "data-uri-to-buffer";

export const s3 = new AWS.S3({
  endpoint: process.env.AWS_ENPOINT,
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  signatureVersion: "v4",
  region: process.env.AWS_REGION
});
export const s3UploadImage = (fileContent, fileName, typeUpload) => {
  const type = fileContent.split(";")[0].split("/")[1];
  const base64Data = Buffer.from(fileContent.replace(/^data:image\/\w+;base64,/, ""), "base64");
  return new Promise((resolve) => {
    const params = {
      Bucket: `${process.env.S3_BUCKET_NAME}/${typeUpload}`,
      Key: `${fileName}`, // File name you want to save as in S3
      Body: base64Data,
      ContentType: `image/${type}`,
      ACL: process.env.S3_FILE_PERMISSION,
    };

    // Uploading files to the bucket
    s3.upload(params, (err, data) => {
      if (err) {
        throw err;
      }
      let dataReturn = data?.Location?.replace(process.env.CLOUDFLARE_ACCOUNT_URL_FIRST, process.env.CLOUDFLARE_PUBLIC_URL);
      dataReturn = dataReturn?.replace(process.env.CLOUDFLARE_ACCOUNT_URL, process.env.CLOUDFLARE_PUBLIC_URL);
      dataReturn = dataReturn?.replace(process.env.CLOUDFLARE_ACCOUNT_URL_SECOND, process.env.CLOUDFLARE_PUBLIC_URL);
      dataReturn = dataReturn?.replace(process.env.CLOUDFLARE_ACCOUNT_URL_THIRD, process.env.CLOUDFLARE_PUBLIC_URL);
      resolve(dataReturn);
    });
  });
  // Read content from the file
  // const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
};

export const s3UploadFile = (fileContent, fileName, typeUpload) => {
  const type = fileContent.split(";")[0].split("/")[1];
  const base64Data = Buffer.from(fileContent.replace(/^data:image\/\w+;base64,/, ""), "base64");
  return new Promise((resolve) => {
    const params = {
      Bucket: `${process.env.S3_BUCKET_NAME}/${typeUpload}`,
      Key: fileName, // File name you want to save as in S3
      Body: base64Data,
      ContentType: `image/${type}`,
      ACL: process.env.S3_FILE_PERMISSION,
    };

    // Uploading files to the bucket
    s3.upload(params, (err, data) => {
      if (err) {
        throw err;
      }
      let dataReturn = data?.Location?.replace(process.env.CLOUDFLARE_ACCOUNT_URL_FIRST, process.env.CLOUDFLARE_PUBLIC_URL);
      dataReturn = dataReturn?.replace(process.env.CLOUDFLARE_ACCOUNT_URL, process.env.CLOUDFLARE_PUBLIC_URL);
      dataReturn = dataReturn?.replace(process.env.CLOUDFLARE_ACCOUNT_URL_SECOND, process.env.CLOUDFLARE_PUBLIC_URL);
      dataReturn = dataReturn?.replace(process.env.CLOUDFLARE_ACCOUNT_URL_THIRD, process.env.CLOUDFLARE_PUBLIC_URL);
      resolve(dataReturn);
    });
  });
  // Read content from the file
  // const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
};

export const s3UploadPdf = (fileContent, fileName, typeUpload) => {
  const type = fileContent.split(";")[0].split("/")[1];
  const baseData = dataUriToBuffer(fileContent);
  return new Promise((resolve) => {
    const params = {
      Bucket: `${process.env.S3_BUCKET_NAME}/${typeUpload}`,
      Key: fileName, // File name you want to save as in S3
      Body: baseData,
      ContentType: `application/${type}`,
      ACL: process.env.S3_FILE_PERMISSION,
    };

    // Uploading files to the bucket
    s3.upload(params, (err, data) => {
      if (err) {
        throw err;
      }
      let dataReturn = data?.Location?.replace(process.env.CLOUDFLARE_ACCOUNT_URL_FIRST, process.env.CLOUDFLARE_PUBLIC_URL);
      dataReturn = dataReturn?.replace(process.env.CLOUDFLARE_ACCOUNT_URL, process.env.CLOUDFLARE_PUBLIC_URL);
      dataReturn = dataReturn?.replace(process.env.CLOUDFLARE_ACCOUNT_URL_SECOND, process.env.CLOUDFLARE_PUBLIC_URL);
      dataReturn = dataReturn?.replace(process.env.CLOUDFLARE_ACCOUNT_URL_THIRD, process.env.CLOUDFLARE_PUBLIC_URL);
      resolve(dataReturn);
    });
  });
  // Read content from the file
  // const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
};

export const s3Upload = (directory, fileName, fileContent) => {
  let headerData = fileContent.split(";")[0];
  let contentType = headerData.replace("data:", "");
  let extension = contentType.split("/")[1];

  let key = `${fileName}.${extension}`;

  const baseData = dataUriToBuffer(fileContent);
  return new Promise((resolve) => {
    const params = {
      Bucket: `${process.env.S3_BUCKET_NAME}/${directory}`,
      Key: key, // File name you want to save as in S3
      Body: baseData,
      ContentType: contentType,
      ACL: process.env.S3_FILE_PERMISSION,
    };

    // Uploading files to the bucket
    s3.upload(params, (err, data) => {
      if (err) {
        throw err;
      }
      let dataReturn = data?.Location?.replace(process.env.CLOUDFLARE_ACCOUNT_URL_FIRST, process.env.CLOUDFLARE_PUBLIC_URL);
      dataReturn = dataReturn?.replace(process.env.CLOUDFLARE_ACCOUNT_URL, process.env.CLOUDFLARE_PUBLIC_URL);
      dataReturn = dataReturn?.replace(process.env.CLOUDFLARE_ACCOUNT_URL_SECOND, process.env.CLOUDFLARE_PUBLIC_URL);
      dataReturn = dataReturn?.replace(process.env.CLOUDFLARE_ACCOUNT_URL_THIRD, process.env.CLOUDFLARE_PUBLIC_URL);
      resolve(dataReturn);
    });
  });
}
