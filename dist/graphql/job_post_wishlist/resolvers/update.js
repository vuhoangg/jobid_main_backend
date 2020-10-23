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
exports.deleteJobPostWishlist = exports.createJobPostWishlist = void 0;
const JobPostWishlistRepository_1 = __importDefault(require("../../../db/repositories/JobPostWishlistRepository"));
const authenticate_1 = require("../../../middlewares/authenticate");
exports.createJobPostWishlist = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield authenticate_1.authenticate(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });
        return JobPostWishlistRepository_1.default.getBy(input, {}).then((r1) => {
            if (r1) {
                return r1;
            }
            else {
                return JobPostWishlistRepository_1.default.create(input);
            }
        });
    }
});
exports.deleteJobPostWishlist = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield authenticate_1.authenticate(context, context.res)) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        input = Object.assign(input, { user: loggedUser._id });
        return JobPostWishlistRepository_1.default.getBy(input, {}).then((r1) => {
            if (r1) {
                return JobPostWishlistRepository_1.default.delete(r1._id).then(x => r1);
            }
            else {
                return null;
            }
        });
    }
});
//# sourceMappingURL=update.js.map