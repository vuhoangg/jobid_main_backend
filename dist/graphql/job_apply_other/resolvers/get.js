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
exports.getJobApplyOther = getJobApplyOther;
exports.getJobApplyOthers = getJobApplyOthers;
const JobApplyOtherRepository_1 = __importDefault(require("../../../db/repositories/JobApplyOtherRepository"));
const helpers_1 = require("../../helpers");
function getJobApplyOther(source, args, context, info) {
    const fields = (0, helpers_1.rootField)(info);
    return JobApplyOtherRepository_1.default.get(args._id, fields).then((jobApplyOther) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: jobApplyOther._id,
            job_post: jobApplyOther.job_post,
            user: jobApplyOther.user,
            status: jobApplyOther.status,
            file: jobApplyOther.file,
            email: jobApplyOther.email,
            type: jobApplyOther.type,
            description: jobApplyOther.description,
            created_at: jobApplyOther.created_at,
            updated_at: jobApplyOther.updated_at,
        };
        return node;
    }));
}
function getJobApplyOthers(source, args, context, info) {
    let infos = (0, helpers_1.rootInfo)(info);
    let filter = (0, helpers_1.filterObject)(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    return JobApplyOtherRepository_1.default.filter(filter, limit, page, infos.edges).then((jobApplyOthers) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobApplyOthers.length; i++) {
            let jobApplyOther = {
                cursor: jobApplyOthers[i]._id,
                node: {
                    _id: jobApplyOthers[i]._id,
                    job_post: jobApplyOthers[i].job_post,
                    user: jobApplyOthers[i].user,
                    type: jobApplyOthers[i].type,
                    status: jobApplyOthers[i].status,
                    file: jobApplyOthers[i].file,
                    email: jobApplyOthers[i].email,
                    description: jobApplyOthers[i].description,
                    created_at: jobApplyOthers[i].created_at,
                    updated_at: jobApplyOthers[i].updated_at,
                },
            };
            edges.push(jobApplyOther);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield JobApplyOtherRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobApplyOthers.length >= limit,
                hasPreviousPage: page > 1,
            } });
        return dataRet;
    }));
}
//# sourceMappingURL=get.js.map