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
const ProfileViewRepository_1 = __importDefault(require("../../../db/repositories/ProfileViewRepository"));
const helpers_1 = require("../../helpers");
function getProfileView(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    return ProfileViewRepository_1.default.get(args._id, fields)
        .then((profileView) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: profileView._id,
            job_post: profileView.job_post,
            user: profileView.user,
            created_at: profileView.created_at,
            updated_at: profileView.updated_at,
        };
        return node;
    }));
}
exports.getProfileView = getProfileView;
function getProfileViews(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 50 ? 10 : args.page;
    return ProfileViewRepository_1.default.filter(filter, args.limit, page, infos.edges)
        .then((profileViews) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < profileViews.length; i++) {
            let profileView = {
                cursor: profileViews[i]._id,
                node: {
                    _id: profileViews[i]._id,
                    job_post: profileViews[i].job_post,
                    user: profileViews[i].user,
                    created_at: profileViews[i].created_at,
                    updated_at: profileViews[i].updated_at,
                }
            };
            edges.push(profileView);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield ProfileViewRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: profileViews.length >= args.limit,
                hasPreviousPage: page > 1
            } });
        return dataRet;
    }));
}
exports.getProfileViews = getProfileViews;
//# sourceMappingURL=get.js.map