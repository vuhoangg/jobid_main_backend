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
exports.getActivitys = void 0;
const helpers_1 = require("../../helpers");
const ActivityRepository_1 = __importDefault(require("../../../db/repositories/ActivityRepository"));
function getActivitys(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 4000 ? 10 : args.page;
    return ActivityRepository_1.default.filter(filter, args.limit, page, infos.edges)
        .then((activitys) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < activitys.length; i++) {
            let activity = {
                cursor: activitys[i]._id,
                node: {
                    _id: activitys[i]._id,
                    name: activitys[i].name,
                    message: activitys[i].message,
                    href_type: activitys[i].href_type,
                    href_url: activitys[i].href_url,
                    created_at: activitys[i].created_at,
                    updated_at: activitys[i].updated_at,
                }
            };
            edges.push(activity);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield ActivityRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: activitys.length >= args.limit,
                hasPreviousPage: page > 1
            } });
        return dataRet;
    }));
}
exports.getActivitys = getActivitys;
//# sourceMappingURL=get.js.map