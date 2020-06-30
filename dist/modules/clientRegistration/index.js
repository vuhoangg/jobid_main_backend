"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceNotificationRouter = void 0;
const express_1 = __importDefault(require("express"));
const web_push_1 = __importDefault(require("web-push"));
const request_ip_1 = __importDefault(require("request-ip"));
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const ClientSubcriberRepository_1 = __importDefault(require("./../../db/repositories/ClientSubcriberRepository"));
const router = express_1.default.Router();
exports.ServiceNotificationRouter = router;
web_push_1.default.setVapidDetails(process.env.MAILTO_WEBPUSH, process.env.PUBLIC_WEBPUSH_KEY, process.env.PRIVATE_WEBPUSH_KEY);
router.post("/subscription", (req, res) => {
    const clientIp = request_ip_1.default.getClientIp(req);
    const geo = geoip_lite_1.default.lookup(clientIp);
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
});
router.post("/send/subscription", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    else {
        res.status(403).json("Permission denied, you must login first");
    }
}));
function saveSubscriptionToDatabase(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield ClientSubcriberRepository_1.default.create(payload);
    });
}
function deleteSubscriptionFromDatabase(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield ClientSubcriberRepository_1.default.delete(payload);
    });
}
function getSubscriptionsFromDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield ClientSubcriberRepository_1.default.getAll();
    });
}
function triggerPushMsg(subscription, dataToSend) {
    return web_push_1.default.sendNotification(subscription, dataToSend).catch((err) => {
        if (err.statusCode === 404 || err.statusCode === 410) {
            console.log("Subscription has expired or is no longer valid: ", err);
            return deleteSubscriptionFromDatabase(subscription._id);
        }
        else {
            throw err;
        }
    });
}
//# sourceMappingURL=index.js.map