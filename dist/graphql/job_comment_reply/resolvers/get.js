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
exports.getJobReplyComments = exports.getJobReplyComment = void 0;
const JobCommentReplyRepository_1 = __importDefault(require("../../../db/repositories/JobCommentReplyRepository"));
const helpers_1 = require("../../helpers");
function getJobReplyComment(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    return JobCommentReplyRepository_1.default.get(args._id, fields).then((jobCommentReply) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: jobCommentReply._id,
            job: jobCommentReply.job,
            user: jobCommentReply.user,
            comment: jobCommentReply.comment,
            parent: jobCommentReply.parent,
            created_at: jobCommentReply.created_at,
            updated_at: jobCommentReply.updated_at,
        };
        return node;
    }));
}
exports.getJobReplyComment = getJobReplyComment;
function getJobReplyComments(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 4000 ? 10 : args.page;
    return JobCommentReplyRepository_1.default.filter(filter, args.limit, page, infos.edges).then((jobCommentsReply) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobCommentsReply.length; i++) {
            let jobComment = {
                cursor: jobCommentsReply[i]._id,
                node: {
                    _id: jobCommentsReply[i]._id,
                    job: jobCommentsReply[i].job,
                    user: jobCommentsReply[i].user,
                    comment: jobCommentsReply[i].comment,
                    parent: jobCommentsReply[i].parent,
                    created_at: jobCommentsReply[i].created_at,
                    updated_at: jobCommentsReply[i].updated_at,
                },
            };
            edges.push(jobComment);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield JobCommentReplyRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobCommentsReply.length >= args.limit,
                hasPreviousPage: page > 1,
            } });
        return dataRet;
    }));
}
exports.getJobReplyComments = getJobReplyComments;
//# sourceMappingURL=get.js.map