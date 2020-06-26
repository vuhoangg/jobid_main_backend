import express from "express";
import webpush from "web-push";
import requestIp from "request-ip";
import geoIp from "geoip-lite";
import ClientSubscriberService from "./../../db/repositories/ClientSubcriberRepository";
const router = express.Router();

webpush.setVapidDetails(process.env.MAILTO_WEBPUSH, process.env.PUBLIC_WEBPUSH_KEY, process.env.PRIVATE_WEBPUSH_KEY);
router.post("/subscription", (req, res) => {
  const clientIp = requestIp.getClientIp(req);
  const blackListIp = ["127.0.0.1", "::1", "::ffff:127.0.0.1"];
  if (blackListIp.includes(clientIp)) {
    const geo = geoIp.lookup("42.113.204.212");
    const subscriptionRequest = req.body.data;
    let locate = JSON.stringify(geo);
    let client = JSON.stringify(subscriptionRequest);
    let payload = {
      clientId: client,
      location: locate,
      browser: req.headers["user-agent"],
    };
    return saveSubscriptionToDatabase(payload)
      .then(function (subscriptionId) {
        res.send(JSON.stringify({ data: { success: true, client: subscriptionId } }));
      })
      .catch(function (err) {
        res.status(500);
        res.send({
          error: {
            id: "unable-to-save-subscription",
            message: "The subscription was received but we were unable to save it to our database.",
          },
        });
      });
  }
});
router.post("/send/subscription", async (req, res) => {
  if (req.isAuthenticated()) {
    const payload = {
      title: req.body.data.title,
      text: req.body.data.text,
      url: req.body.data.href,
      tag: req.body.data.tag,
      icon: "https://ketnoiviec.net/favicon.png",
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      image: "https://ketnoiviec.net/favicon.png",
      badge: "https://ketnoiviec.net/favicon.png",
      actions: [{ action: "Chi tiết", title: "Xem chi tiết", icon: "https://ketnoiviec.net/favicon.png" }],
    };
    return getSubscriptionsFromDatabase().then(function (subscriptions) {
      let promiseChain = Promise.resolve();

      for (let i = 0; i < subscriptions.length; i++) {
        const subscription = subscriptions[i];
        promiseChain = promiseChain.then(() => {
          return triggerPushMsg(JSON.parse(subscription.clientId), JSON.stringify(payload));
        });
      }
      return promiseChain
        .then(() => {
          res.send({ data: { success: true } });
        })
        .catch(function (err) {
          res.status(500);
          res.send({
            error: {
              id: "unable-to-send-messages",
              message: `We were unable to send messages to all subscriptions : ` + `'${err.message}'`,
            },
          });
        });
    });
  }else {
    res.status(403).json("Permission denied, you must login first")
  }
});

async function saveSubscriptionToDatabase(payload) {
  return await ClientSubscriberService.create(payload);
}
async function deleteSubscriptionFromDatabase(payload) {
  return await ClientSubscriberService.delete(payload);
}
async function getSubscriptionsFromDatabase() {
  return await ClientSubscriberService.getAll();
}

function triggerPushMsg(subscription, dataToSend) {
  return webpush.sendNotification(subscription, dataToSend).catch((err) => {
    if (err.statusCode === 404 || err.statusCode === 410) {
      console.log("Subscription has expired or is no longer valid: ", err);
      return deleteSubscriptionFromDatabase(subscription._id);
    } else {
      throw err;
    }
  });
}
export {
  router as ServiceNotificationRouter
};