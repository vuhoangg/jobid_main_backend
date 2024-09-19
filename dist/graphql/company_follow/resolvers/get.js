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
exports.getCompanyFollows = exports.getCompanyFollow = void 0;
const CompanyFollowRepository_1 = __importDefault(require("../../../db/repositories/CompanyFollowRepository"));
const helpers_1 = require("../../helpers");
const authenticate_1 = require("../../../middlewares/authenticate");
const getCompanyFollow = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = (0, helpers_1.rootField)(info);
    let isAuthenticated = yield (0, authenticate_1.authenticateUser)(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let getBy = {
            _id: args._id,
            user: loggedUser._id,
        };
        let companyFollow = yield CompanyFollowRepository_1.default.getBy(getBy, fields);
        let node = {
            _id: companyFollow._id,
            company: companyFollow.company,
            user: companyFollow.user,
            created_at: companyFollow.created_at,
            updated_at: companyFollow.updated_at,
        };
        return node;
    }
});
exports.getCompanyFollow = getCompanyFollow;
const getCompanyFollows = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let infos = (0, helpers_1.rootInfo)(info);
    let filter = (0, helpers_1.filterObject)(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    let isAuthenticated = yield (0, authenticate_1.authenticateUser)(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        filter = Object.assign(filter, { user: loggedUser._id });
        let companyFollows = yield CompanyFollowRepository_1.default.filter(filter, limit, page, infos.edges);
        let edges = [];
        for (let i = 0; i < companyFollows.length; i++) {
            let companyFollow = {
                cursor: companyFollows[i]._id,
                node: {
                    _id: companyFollows[i]._id,
                    company: companyFollows[i].company,
                    user: companyFollows[i].user,
                    created_at: companyFollows[i].created_at,
                    updated_at: companyFollows[i].updated_at,
                },
            };
            edges.push(companyFollow);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield CompanyFollowRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: companyFollows.length >= limit,
                hasPreviousPage: page > 1,
            } });
        return dataRet;
    }
});
exports.getCompanyFollows = getCompanyFollows;
//# sourceMappingURL=get.js.map