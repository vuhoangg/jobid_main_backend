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
exports.getCommunityAnswers = exports.getCommunityAnswer = void 0;
const CommunityAnswerRepository_1 = __importDefault(require("../../../db/repositories/CommunityAnswerRepository"));
const helpers_1 = require("../../helpers");
exports.getCommunityAnswer = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = helpers_1.rootField(info);
    let communityAnswer = yield CommunityAnswerRepository_1.default.get(args._id, fields);
    let node = {
        _id: communityAnswer._id,
        user: communityAnswer.user,
        question: communityAnswer.question,
        reply: communityAnswer.reply,
        description: communityAnswer.description,
        like_count: communityAnswer.like_count,
        reply_count: communityAnswer.reply_count,
        created_at: communityAnswer.created_at,
        updated_at: communityAnswer.updated_at,
    };
    return node;
});
exports.getCommunityAnswers = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 50 ? 10 : args.page;
    let communityAnswers = yield CommunityAnswerRepository_1.default.filter(filter, args.limit, page, infos.edges);
    let edges = [];
    for (let i = 0; i < communityAnswers.length; i++) {
        let communityAnswer = {
            cursor: communityAnswers[i]._id,
            node: {
                _id: communityAnswers[i]._id,
                user: communityAnswers[i].user,
                question: communityAnswers[i].question,
                reply: communityAnswers[i].reply,
                description: communityAnswers[i].description,
                like_count: communityAnswers[i].like_count,
                reply_count: communityAnswers[i].reply_count,
                created_at: communityAnswers[i].created_at,
                updated_at: communityAnswers[i].updated_at,
            }
        };
        edges.push(communityAnswer);
    }
    let countData = (infos.pageInfo && infos.pageInfo.length) ? yield CommunityAnswerRepository_1.default.count(filter) : 0;
    let dataRet = Object.assign({ edges }, { pageInfo: {
            length: countData,
            hasNextPage: communityAnswers.length >= args.limit,
            hasPreviousPage: page > 1
        } });
    return dataRet;
});
//# sourceMappingURL=get.js.map