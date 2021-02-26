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
const JobPostReportRepository_1 = __importDefault(require("../../../db/repositories/JobPostReportRepository"));
const helpers_1 = require("../../helpers");
const authenticate_1 = require("../../../middlewares/authenticate");
exports.getJobPostReport = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = helpers_1.rootField(info);
    let isAuthenticated = yield authenticate_1.authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let getBy = { user: loggedUser._id };
        args._id ? getBy = Object.assign(getBy, { _id: args._id }) : null;
        args.job_post ? getBy = Object.assign(getBy, { job_post: args.job_post }) : null;
        let jobPostReport = yield JobPostReportRepository_1.default.getBy(getBy, fields);
        let node = {
            _id: jobPostReport._id,
            user: jobPostReport.user,
            job_post: jobPostReport.job_post,
            reason: jobPostReport.reason,
            description: jobPostReport.description,
            created_at: jobPostReport.created_at,
            updated_at: jobPostReport.updated_at,
        };
        return node;
    }
});
exports.getJobPostReports = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    let isAuthenticated = yield authenticate_1.authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        filter = Object.assign(filter, { user: loggedUser._id });
        let jobPostReports = yield JobPostReportRepository_1.default.filter(filter, page, limit, infos.edges);
        let edges = [];
        for (let i = 0; i < jobPostReports.length; i++) {
            let jobPostReport = {
                cursor: jobPostReports[i]._id,
                node: {
                    _id: jobPostReports[i]._id,
                    user: jobPostReports[i].user,
                    job_post: jobPostReports[i].job_post,
                    reason: jobPostReports[i].reason,
                    description: jobPostReports[i].description,
                    created_at: jobPostReports[i].created_at,
                    updated_at: jobPostReports[i].updated_at,
                },
            };
            edges.push(jobPostReport);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield JobPostReportRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobPostReports.length >= limit,
                hasPreviousPage: args.page > 1,
            } });
        return dataRet;
    }
    ;
});
//# sourceMappingURL=get.js.map