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
exports.getEmployerJobApplys = exports.getEmployerJobApply = exports.getJobApplys = exports.getJobApply = void 0;
const JobApplyRepository_1 = __importDefault(require("../../../db/repositories/JobApplyRepository"));
const helpers_1 = require("../../helpers");
const authenticate_1 = require("../../../middlewares/authenticate");
exports.getJobApply = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = helpers_1.rootField(info);
    let isAuthenticated = yield authenticate_1.authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let getBy = {
            _id: args._id,
            user: loggedUser._id,
        };
        let jobApply = yield JobApplyRepository_1.default.getBy(getBy, fields);
        let node = {
            _id: jobApply._id,
            job_post: jobApply.job_post,
            user: jobApply.user,
            status: jobApply.status,
            file: jobApply.file,
            email: jobApply.email,
            description: jobApply.description,
            created_at: jobApply.created_at,
            updated_at: jobApply.updated_at,
        };
        return node;
    }
});
exports.getJobApplys = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 4000 ? 10 : args.page;
    let isAuthenticated = yield authenticate_1.authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        filter = Object.assign(filter, { user: loggedUser._id });
        let jobApplys = yield JobApplyRepository_1.default.filter(filter, args.limit, page, infos.edges);
        let edges = [];
        for (let i = 0; i < jobApplys.length; i++) {
            let jobApply = {
                cursor: jobApplys[i]._id,
                node: {
                    _id: jobApplys[i]._id,
                    job_post: jobApplys[i].job_post,
                    user: jobApplys[i].user,
                    status: jobApplys[i].status,
                    file: jobApplys[i].file,
                    email: jobApplys[i].email,
                    description: jobApplys[i].description,
                    created_at: jobApplys[i].created_at,
                    updated_at: jobApplys[i].updated_at,
                },
            };
            edges.push(jobApply);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield JobApplyRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobApplys.length >= args.limit,
                hasPreviousPage: page > 1,
            } });
        return dataRet;
    }
});
exports.getEmployerJobApply = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = helpers_1.rootField(info);
    let isAuthenticated = yield authenticate_1.authenticateEmployer(context, context.res);
    if (isAuthenticated) {
        let loggedEmployer = context.res.locals.fullEmployer;
        let getBy = {
            _id: args._id,
            employer: loggedEmployer._id,
        };
        let jobApply = yield JobApplyRepository_1.default.getBy(getBy, fields);
        let node = {
            _id: jobApply._id,
            job_post: jobApply.job_post,
            user: jobApply.user,
            status: jobApply.status,
            file: jobApply.file,
            email: jobApply.email,
            description: jobApply.description,
            created_at: jobApply.created_at,
            updated_at: jobApply.updated_at,
        };
        return node;
    }
});
exports.getEmployerJobApplys = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 4000 ? 10 : args.page;
    let isAuthenticated = yield authenticate_1.authenticateEmployer(context, context.res);
    if (isAuthenticated) {
        let loggedEmployer = context.res.locals.fullEmployer;
        filter = Object.assign(filter, { employer: loggedEmployer._id });
        let jobApplys = yield JobApplyRepository_1.default.filter(filter, args.limit, page, infos.edges);
        let edges = [];
        for (let i = 0; i < jobApplys.length; i++) {
            let jobApply = {
                cursor: jobApplys[i]._id,
                node: {
                    _id: jobApplys[i]._id,
                    job_post: jobApplys[i].job_post,
                    user: jobApplys[i].user,
                    status: jobApplys[i].status,
                    file: jobApplys[i].file,
                    email: jobApplys[i].email,
                    description: jobApplys[i].description,
                    created_at: jobApplys[i].created_at,
                    updated_at: jobApplys[i].updated_at,
                },
            };
            edges.push(jobApply);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield JobApplyRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobApplys.length >= args.limit,
                hasPreviousPage: page > 1,
            } });
        return dataRet;
    }
});
//# sourceMappingURL=get.js.map