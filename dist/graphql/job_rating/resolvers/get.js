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
exports.getJobRatings = exports.getJobRating = void 0;
const JobRatingRepository_1 = __importDefault(require("../../../db/repositories/JobRatingRepository"));
const helpers_1 = require("../../helpers");
function getJobRating(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    let getBy = args._id ? { _id: args._id } : { job_post: args.job_post };
    return JobRatingRepository_1.default.getBy(getBy, fields).then((jobRating) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: jobRating._id,
            user: jobRating.user,
            job: jobRating.job,
            rat_value: jobRating.rat_value,
            rat_comment: jobRating.rat_content,
            created_at: jobRating.created_at,
            updated_at: jobRating.updated_at,
        };
        return node;
    }));
}
exports.getJobRating = getJobRating;
function getJobRatings(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 50 ? 10 : args.page;
    return JobRatingRepository_1.default.filter(filter, args.limit, page, infos.edges).then((jobRatings) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobRatings.length; i++) {
            let jobRating = {
                cursor: jobRatings[i]._id,
                node: {
                    _id: jobRatings[i]._id,
                    user: jobRatings[i].user,
                    job: jobRatings[i].job,
                    rat_value: jobRatings[i].rat_value,
                    rat_comment: jobRatings[i].rat_comment,
                    created_at: jobRatings[i].created_at,
                    updated_at: jobRatings[i].updated_at,
                },
            };
            edges.push(jobRating);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield JobRatingRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobRatings.length >= args.limit,
                hasPreviousPage: page > 1,
            } });
        return dataRet;
    }));
}
exports.getJobRatings = getJobRatings;
//# sourceMappingURL=get.js.map