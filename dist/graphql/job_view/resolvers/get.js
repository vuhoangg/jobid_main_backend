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
exports.getJobViews = exports.getJobView = void 0;
const JobViewRepository_1 = __importDefault(require("../../../db/repositories/JobViewRepository"));
const helpers_1 = require("../../helpers");
function getJobView(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    return JobViewRepository_1.default.get(args._id, fields)
        .then((jobView) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: jobView._id,
            job_post: jobView.job_post,
            user: jobView.user,
            created_at: jobView.created_at,
            updated_at: jobView.updated_at,
        };
        return node;
    }));
}
exports.getJobView = getJobView;
function getJobViews(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 4000 ? 10 : args.page;
    return JobViewRepository_1.default.filter(filter, args.limit, page, infos.edges)
        .then((jobViews) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobViews.length; i++) {
            let jobView = {
                cursor: jobViews[i]._id,
                node: {
                    _id: jobViews[i]._id,
                    job_post: jobViews[i].job_post,
                    user: jobViews[i].user,
                    created_at: jobViews[i].created_at,
                    updated_at: jobViews[i].updated_at,
                }
            };
            edges.push(jobView);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield JobViewRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobViews.length >= args.limit,
                hasPreviousPage: page > 1
            } });
        return dataRet;
    }));
}
exports.getJobViews = getJobViews;
//# sourceMappingURL=get.js.map