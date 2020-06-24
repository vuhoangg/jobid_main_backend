const subscriptions = {};
import crypto from "crypto";
import webpush from "web-push";
import requestIp from "request-ip";
import geoIp from "geoip-lite";
import ClientSubscriberService from "./../../db/repositories/ClientSubcriberRepository";
const vapidKeys = {
  privateKey: "bdSiNzUhUP6piAxLH-tW88zfBlWWveIx0dAsDO66aVU",
  publicKey: "BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8",
};

webpush.setVapidDetails("mailto:example@yourdomain.org", vapidKeys.publicKey, vapidKeys.privateKey);

function createHash(input) {
  const md5sum = crypto.createHash("md5");
  md5sum.update(Buffer.from(input));
  return md5sum.digest("hex");
}

export async function handlePushNotificationSubscription(req, res) {
 
  const clientIp = requestIp.getClientIp(req);
  const blackListIp = ["127.0.0.1", "::1", "::ffff:127.0.0.1"];
  if (blackListIp.includes(clientIp)) {
    const geo = geoIp.lookup("42.113.204.212");
    const subscriptionRequest = req.body.data;
    const subscriptionId = createHash(JSON.stringify(subscriptionRequest));
    console.log("handlePushNotificationSubscription -> subscriptionId", subscriptionId)
    let locate = JSON.stringify(geo);
    let payload = {
      clientId: subscriptionId,
      location: locate,
      browser: req.headers["user-agent"],
    };
    await ClientSubscriberService.create(payload);
    subscriptions[subscriptionId] = subscriptionRequest;
    res.status(201).json({ id: subscriptionId });
  }
 
}

export function sendPushNotification(req, res) {
  const subscriptionId = req.params.id;
  console.log("sendPushNotification -> subscriptionId", subscriptionId)
  const pushSubscription = subscriptions[subscriptionId];
  webpush
    .sendNotification(
      pushSubscription,
      JSON.stringify({
        title: 'New Product Available ',
        text: 'HEY! Take a look at this brand new t-shirt!',
        image: '/images/jason-leung-HM6TMmevbZQ-unsplash.jpg',
        tag: 'new-product',
        url: '/new-product-jason-leung-HM6TMmevbZQ-unsplash.html'
      })
    )
    .catch((err) => {
      console.log(err);
    });

  res.status(202).json({});
}
