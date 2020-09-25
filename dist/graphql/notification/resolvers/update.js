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
exports.updateReadAllNotification = exports.updateReadNotification = exports.updateNotification = void 0;
const NotificationRepository_1 = __importDefault(require("../../../db/repositories/NotificationRepository"));
const permission_1 = require("../../../helpers/permission");
const authenticate_1 = require("../../../middlewares/authenticate");
exports.updateNotification = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield authenticate_1.authenticate(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return NotificationRepository_1.default.update(input);
        }
    }
});
exports.updateReadNotification = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield authenticate_1.authenticate(context, context.res)) {
        let input = args.input;
        let loggedUser = context.res.locals.fullUser;
        input = Object.assign(input, { target: loggedUser._id });
        return NotificationRepository_1.default.readNotification(input).then((r) => ({ status: true }));
    }
});
exports.updateReadAllNotification = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield authenticate_1.authenticate(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = { target: loggedUser._id };
        return NotificationRepository_1.default.readAllNotification(input).then((r) => ({ status: true }));
    }
});
//# sourceMappingURL=update.js.map