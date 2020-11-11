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
exports.getJobPosts = exports.getJobPost = void 0;
const JobPostRepository_1 = __importDefault(require("../../../db/repositories/JobPostRepository"));
const helpers_1 = require("../../helpers");
const authenticate_1 = require("../../../middlewares/authenticate");
const JobPostWishlistRepository_1 = __importDefault(require("../../../db/repositories/JobPostWishlistRepository"));
const JobSaveRepository_1 = __importDefault(require("../../../db/repositories/JobSaveRepository"));
const JobApplyRepository_1 = __importDefault(require("../../../db/repositories/JobApplyRepository"));
exports.getJobPost = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = helpers_1.rootField(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    let jobPost = yield JobPostRepository_1.default.getBy(getBy, fields);
    let isAuthenticated = yield authenticate_1.authenticateUser(context, context.res);
    let loggedUser = null;
    if (isAuthenticated) {
        loggedUser = context.res.locals.fullUser;
    }
    let is_featured = false;
    let is_wishlist = false;
    if (loggedUser) {
        is_wishlist = !!(yield JobPostWishlistRepository_1.default.count({ job_post: jobPost._id, user: loggedUser._id }));
    }
    let save_count = yield JobSaveRepository_1.default.count({ job_post: jobPost._id });
    let apply_count = yield JobApplyRepository_1.default.count({ job_post: jobPost._id });
    let node = {
        _id: jobPost._id,
        title: jobPost.title,
        slug: jobPost.slug,
        job_type: jobPost.job_type,
        job_level: jobPost.job_level,
        job_category: jobPost.job_category,
        number: jobPost.number,
        description: jobPost.description,
        requirement: jobPost.requirement,
        salary: jobPost.salary,
        address: jobPost.address,
        company: jobPost.company,
        contact: jobPost.contact,
        image: jobPost.image,
        photos: jobPost.photos,
        video: jobPost.video,
        benefit: jobPost.benefit,
        end_date: jobPost.end_date,
        user: jobPost.user,
        view_count: jobPost.view_count,
        save_count: save_count,
        apply_count: apply_count,
        status: jobPost.status,
        seo_title: jobPost.seo_title,
        seo_description: jobPost.seo_description,
        is_featured: is_featured,
        is_wishlist: is_wishlist,
        created_at: jobPost.created_at,
        updated_at: jobPost.updated_at,
    };
    return node;
});
function getJobPosts(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let limit = args.limit > 50 ? 10 : args.limit;
    return JobPostRepository_1.default.filter(filter, limit, args.page, infos.edges).then((jobPosts) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        let loggedUser = null;
        if (yield authenticate_1.authenticateUser(context, context.res)) {
            loggedUser = context.res.locals.fullUser;
        }
        for (let i = 0; i < jobPosts.length; i++) {
            let is_featured = false;
            let is_wishlist = false;
            if (loggedUser) {
                is_wishlist = !!(yield JobPostWishlistRepository_1.default.count({ job_post: jobPosts[i]._id, user: loggedUser._id }));
            }
            let jobPost = {
                cursor: jobPosts[i]._id,
                node: {
                    _id: jobPosts[i]._id,
                    title: jobPosts[i].title,
                    slug: jobPosts[i].slug,
                    job_type: jobPosts[i].job_type,
                    job_level: jobPosts[i].job_level,
                    job_category: jobPosts[i].job_category,
                    number: jobPosts[i].number,
                    description: jobPosts[i].description,
                    requirement: jobPosts[i].requirement,
                    salary: jobPosts[i].salary,
                    address: jobPosts[i].address,
                    company: jobPosts[i].company,
                    contact: jobPosts[i].contact,
                    image: jobPosts[i].image,
                    photos: jobPosts[i].photos,
                    video: jobPosts[i].video,
                    benefit: jobPosts[i].benefit,
                    end_date: jobPosts[i].end_date,
                    user: jobPosts[i].user,
                    view_count: jobPosts[i].view_count,
                    status: jobPosts[i].status,
                    seo_title: jobPosts[i].seo_title,
                    seo_description: jobPosts[i].seo_description,
                    is_featured: is_featured,
                    is_wishlist: is_wishlist,
                    created_at: jobPosts[i].created_at,
                    updated_at: jobPosts[i].updated_at,
                },
            };
            edges.push(jobPost);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield JobPostRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobPosts.length >= limit,
                hasPreviousPage: args.page > 1,
            } });
        return dataRet;
    }));
}
exports.getJobPosts = getJobPosts;
//# sourceMappingURL=get.js.map