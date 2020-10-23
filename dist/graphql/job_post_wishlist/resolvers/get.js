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
exports.getJobPostWishlists = exports.getJobPostWishlist = void 0;
const JobPostWishlistRepository_1 = __importDefault(require("../../../db/repositories/JobPostWishlistRepository"));
const helpers_1 = require("../../helpers");
const authenticate_1 = require("../../../middlewares/authenticate");
exports.getJobPostWishlist = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = helpers_1.rootField(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    let loggedUser = null;
    if (yield authenticate_1.authenticate(context, context.res)) {
        loggedUser = context.res.locals.fullUser;
    }
    return JobPostWishlistRepository_1.default.getBy(getBy, fields).then((jobPostWishlist) => __awaiter(void 0, void 0, void 0, function* () {
        let job_post = jobPostWishlist.job_post;
        job_post = Object.assign(job_post, { is_featured: false, is_wishlist: true });
        let node = {
            _id: jobPostWishlist._id,
            user: jobPostWishlist.user,
            job_post: job_post,
            created_at: jobPostWishlist.created_at,
            updated_at: jobPostWishlist.updated_at,
        };
        return node;
    }));
});
function getJobPostWishlists(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let limit = args.limit > 50 ? 10 : args.limit;
    return JobPostWishlistRepository_1.default.filter(filter, limit, args.page, infos.edges).then((jobPostWishlists) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobPostWishlists.length; i++) {
            let job_post = jobPostWishlists[i].job_post;
            job_post = Object.assign(job_post, { is_featured: false, is_wishlist: true });
            let jobPostWishlist = {
                cursor: jobPostWishlists[i]._id,
                node: {
                    _id: jobPostWishlists[i]._id,
                    user: jobPostWishlists[i].user,
                    job_post: job_post,
                    created_at: jobPostWishlists[i].created_at,
                    updated_at: jobPostWishlists[i].updated_at,
                },
            };
            edges.push(jobPostWishlist);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield JobPostWishlistRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobPostWishlists.length >= limit,
                hasPreviousPage: args.page > 1,
            } });
        return dataRet;
    }));
}
exports.getJobPostWishlists = getJobPostWishlists;
//# sourceMappingURL=get.js.map