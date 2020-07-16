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
function getJobPost(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    let loggedUser = null;
    if (context.isAuthenticated()) {
        loggedUser = context.user;
    }
    return JobPostRepository_1.default.getBy(getBy, fields).then((jobPost) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: jobPost._id,
            title: jobPost.title,
            slug: jobPost.slug,
            job_level: jobPost.job_level,
            job_category: jobPost.job_category,
            description: jobPost.description,
            requirement: jobPost.requirement,
            job_location: jobPost.job_location,
            salary: jobPost.salary.show || (loggedUser && loggedUser._id.toString() === jobPost.user.ref._id.toString())
                ? jobPost.salary
                : null,
            job_skill: jobPost.job_skill,
            job_prefer_language: jobPost.job_prefer_language,
            email_for_application: jobPost.email_for_application,
            company: jobPost.company,
            view_count: jobPost.view_count ? jobPost.view_count : 0,
            user: jobPost.user,
            status: jobPost.status,
            seo_title: jobPost.seo_title,
            seo_description: jobPost.seo_description,
            experience: jobPost.experience,
            latitude: jobPost.latitude,
            longitude: jobPost.longitude,
            created_at: jobPost.created_at,
            updated_at: jobPost.updated_at,
        };
        return node;
    }));
}
exports.getJobPost = getJobPost;
function getJobPosts(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let limit = args.limit > 50 ? 10 : args.limit;
    return JobPostRepository_1.default.filter(filter, limit, args.page, infos.edges).then((jobPosts) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobPosts.length; i++) {
            let jobPost = {
                cursor: jobPosts[i]._id,
                node: {
                    _id: jobPosts[i]._id,
                    title: jobPosts[i].title,
                    slug: jobPosts[i].slug,
                    job_level: jobPosts[i].job_level,
                    job_category: jobPosts[i].job_category,
                    description: jobPosts[i].description,
                    requirement: jobPosts[i].requirement,
                    job_location: jobPosts[i].job_location,
                    salary: jobPosts[i].salary.show ? jobPosts[i].salary : null,
                    job_skill: jobPosts[i].job_skill,
                    job_prefer_language: jobPosts[i].job_prefer_language,
                    email_for_application: jobPosts[i].email_for_application,
                    company: jobPosts[i].company,
                    view_count: jobPosts[i].view_count ? jobPosts[i].view_count : 0,
                    user: jobPosts[i].user,
                    latitude: jobPosts[i].latitude,
                    longitude: jobPosts[i].longitude,
                    experience: jobPosts[i].experience,
                    status: jobPosts[i].status,
                    seo_title: jobPosts[i].seo_title,
                    seo_description: jobPosts[i].seo_description,
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