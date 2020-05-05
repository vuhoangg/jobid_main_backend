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
const JobAlertRepository_1 = __importDefault(require("../../../db/repositories/JobAlertRepository"));
const helpers_1 = require("../../helpers");
function getJobAlert(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    return JobAlertRepository_1.default.get(args._id, fields)
        .then((jobAlert) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: jobAlert._id,
            job_post: jobAlert.job_post,
            user: jobAlert.user,
            created_at: jobAlert.created_at,
            updated_at: jobAlert.updated_at,
        };
        return node;
    }));
}
exports.getJobAlert = getJobAlert;
function getJobAlerts(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 50 ? 10 : args.page;
    return JobAlertRepository_1.default.filter(filter, args.limit, page, infos.edges)
        .then((jobAlerts) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobAlerts.length; i++) {
            let jobAlert = {
                cursor: jobAlerts[i]._id,
                node: {
                    _id: jobAlerts[i]._id,
                    job_post: jobAlerts[i].job_post,
                    user: jobAlerts[i].user,
                    created_at: jobAlerts[i].created_at,
                    updated_at: jobAlerts[i].updated_at,
                }
            };
            edges.push(jobAlert);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield JobAlertRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobAlerts.length >= args.limit,
                hasPreviousPage: page > 1
            } });
        return dataRet;
    }));
}
exports.getJobAlerts = getJobAlerts;
//# sourceMappingURL=get.js.map