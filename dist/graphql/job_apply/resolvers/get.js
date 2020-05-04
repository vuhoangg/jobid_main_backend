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
const JobApplyRepository_1 = __importDefault(require("../../../db/repositories/JobApplyRepository"));
const helpers_1 = require("../../helpers");
function getJobApply(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    let _id = args._id ? args._id : context.jobApply._id;
    return JobApplyRepository_1.default.get(_id, fields)
        .then((jobApply) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: jobApply._id,
            job_post: jobApply.job_post,
            user: jobApply.user,
            created_at: jobApply.created_at,
            updated_at: jobApply.updated_at,
        };
        return node;
    }));
}
exports.getJobApply = getJobApply;
function getJobApplys(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 50 ? 10 : args.page;
    return JobApplyRepository_1.default.filter(filter, args.limit, page, infos.edges)
        .then((jobApplys) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobApplys.length; i++) {
            let jobApply = {
                cursor: jobApplys[i]._id,
                node: {
                    _id: jobApplys[i]._id,
                    job_post: jobApplys[i].job_post,
                    user: jobApplys[i].user,
                    created_at: jobApplys[i].created_at,
                    updated_at: jobApplys[i].updated_at,
                }
            };
            edges.push(jobApply);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield JobApplyRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobApplys.length >= args.limit,
                hasPreviousPage: page > 1
            } });
        return dataRet;
    }));
}
exports.getJobApplys = getJobApplys;
//# sourceMappingURL=get.js.map