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
const JobCommentRepository_1 = __importDefault(require("../../../db/repositories/JobCommentRepository"));
const helpers_1 = require("../../helpers");
function getJobComment(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    return JobCommentRepository_1.default.get(args._id, fields).then((jobComment) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: jobComment._id,
            job: jobComment.job,
            user: jobComment.user,
            comment: jobComment.comment,
            count: jobComment.count,
            created_at: jobComment.created_at,
            updated_at: jobComment.updated_at,
        };
        return node;
    }));
}
exports.getJobComment = getJobComment;
function getJobComments(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    return JobCommentRepository_1.default.filter(filter, limit, page, infos.edges).then((jobComments) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobComments.length; i++) {
            let jobComment = {
                cursor: jobComments[i]._id,
                node: {
                    _id: jobComments[i]._id,
                    job: jobComments[i].job,
                    user: jobComments[i].user,
                    comment: jobComments[i].comment,
                    children: jobComments[i].children,
                    created_at: jobComments[i].created_at,
                    updated_at: jobComments[i].updated_at,
                },
            };
            edges.push(jobComment);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield JobCommentRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobComments.length >= limit,
                hasPreviousPage: page > 1,
            } });
        return dataRet;
    }));
}
exports.getJobComments = getJobComments;
//# sourceMappingURL=get.js.map