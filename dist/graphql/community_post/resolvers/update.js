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
exports.trackingBySlug = exports.createCommunityPost = exports.updateCommunityPost = void 0;
const CommunityPostRepository_1 = __importDefault(require("../../../db/repositories/CommunityPostRepository"));
const CommunityPostViewRepository_1 = __importDefault(require("../../../db/repositories/CommunityPostViewRepository"));
const string_1 = require("../../../helpers/string");
const authenticate_1 = require("../../../middlewares/authenticate");
exports.updateCommunityPost = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = yield authenticate_1.authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        let communityPost = yield CommunityPostRepository_1.default.get(input._id, {});
        if (communityPost.user._id == loggedUser._id) {
            return CommunityPostRepository_1.default.update(args.input);
        }
    }
});
exports.createCommunityPost = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    return CommunityPostRepository_1.default.create(args.input);
    let isAuthenticated = yield authenticate_1.authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let input = args.input;
        let slug = string_1.toSlug(input.title, true);
        input = Object.assign(input, { user: loggedUser._id, slug: slug });
        return CommunityPostRepository_1.default.create(input);
    }
});
exports.trackingBySlug = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let input = args.input;
    let community_post = yield CommunityPostRepository_1.default.increaseViewCountBySlug(input.slug);
    let isAuthenticated = yield authenticate_1.authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let payload = {
            community_post: community_post._id,
            user: loggedUser._id,
        };
        yield CommunityPostViewRepository_1.default.create(payload);
    }
    return {
        status: true
    };
});
//# sourceMappingURL=update.js.map