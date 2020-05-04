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
const CompanyFollowRepository_1 = __importDefault(require("../../../db/repositories/CompanyFollowRepository"));
const helpers_1 = require("../../helpers");
function getCompanyFollow(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    let _id = args._id ? args._id : context.companyFollow._id;
    return CompanyFollowRepository_1.default.get(_id, fields)
        .then((companyFollow) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: companyFollow._id,
            job_post: companyFollow.job_post,
            user: companyFollow.user,
            created_at: companyFollow.created_at,
            updated_at: companyFollow.updated_at,
        };
        return node;
    }));
}
exports.getCompanyFollow = getCompanyFollow;
function getCompanyFollows(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 50 ? 10 : args.page;
    return CompanyFollowRepository_1.default.filter(filter, args.limit, page, infos.edges)
        .then((companyFollows) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < companyFollows.length; i++) {
            let companyFollow = {
                cursor: companyFollows[i]._id,
                node: {
                    _id: companyFollows[i]._id,
                    job_post: companyFollows[i].job_post,
                    user: companyFollows[i].user,
                    created_at: companyFollows[i].created_at,
                    updated_at: companyFollows[i].updated_at,
                }
            };
            edges.push(companyFollow);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield CompanyFollowRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: companyFollows.length >= args.limit,
                hasPreviousPage: page > 1
            } });
        return dataRet;
    }));
}
exports.getCompanyFollows = getCompanyFollows;
//# sourceMappingURL=get.js.map