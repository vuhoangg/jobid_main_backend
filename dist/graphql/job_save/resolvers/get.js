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
const JobSaveRepository_1 = __importDefault(require("../../../db/repositories/JobSaveRepository"));
const helpers_1 = require("../../helpers");
function getJobSave(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    return JobSaveRepository_1.default.get(args._id, fields)
        .then((jobSave) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: jobSave._id,
            job_post: jobSave.job_post,
            user: jobSave.user,
            created_at: jobSave.created_at,
            updated_at: jobSave.updated_at,
        };
        return node;
    }));
}
exports.getJobSave = getJobSave;
function getJobSaves(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    return JobSaveRepository_1.default.filter(filter, limit, page, infos.edges)
        .then((jobSaves) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobSaves.length; i++) {
            let jobSave = {
                cursor: jobSaves[i]._id,
                node: {
                    _id: jobSaves[i]._id,
                    job_post: jobSaves[i].job_post,
                    user: jobSaves[i].user,
                    created_at: jobSaves[i].created_at,
                    updated_at: jobSaves[i].updated_at,
                }
            };
            edges.push(jobSave);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield JobSaveRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobSaves.length >= limit,
                hasPreviousPage: page > 1
            } });
        return dataRet;
    }));
}
exports.getJobSaves = getJobSaves;
//# sourceMappingURL=get.js.map