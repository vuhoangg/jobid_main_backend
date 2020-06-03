export const cloudFrontImageUrl = (imageUrl: string) => {
  imageUrl = imageUrl.replace(/ketnoiviec.s3.ap-southeast-1.amazonaws.com/g, "static.ketnoiviec.net");
  imageUrl = imageUrl.replace(/ketnoiviec.s3-ap-southeast-1.amazonaws.com/g, "static.ketnoiviec.net");
  imageUrl = imageUrl.replace(/ketnoiviec.s3.amazonaws.com/g, "static.ketnoiviec.net");
  imageUrl = imageUrl.replace(/http:\/\//g, "https://");
  return imageUrl;
};
