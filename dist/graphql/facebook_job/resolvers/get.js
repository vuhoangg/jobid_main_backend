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
const FacebookJobRepository_1 = __importDefault(require("../../../db/repositories/FacebookJobRepository"));
const helpers_1 = require("../../helpers");
exports.getFacebookJob = (source, args, context, info) => {
    const fieldsRoot = helpers_1.rootField(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    return FacebookJobRepository_1.default.get(getBy, fieldsRoot).then((facebookJob) => {
        const dataFacebookJob = {
            _id: facebookJob._id,
            employer: facebookJob.employer,
            address: facebookJob.address,
            long_description: facebookJob.long_description,
            share_url: facebookJob.share_url,
            title: facebookJob.title,
            sub_title: facebookJob.sub_title,
            map: facebookJob.map,
            created_at: facebookJob.created_at,
            updated_at: facebookJob.updated_at,
        };
        return dataFacebookJob;
    });
};
exports.getFacebookJobs = (source, args, context, info) => {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    return FacebookJobRepository_1.default.filter(filter, args.limit, args.page, infos.edges).then((facebookJobs) => __awaiter(void 0, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < facebookJobs.length; i++) {
            let facebookJob = {
                cursor: facebookJobs[i]._id,
                node: {
                    _id: facebookJobs[i]._id,
                    employer: facebookJobs[i].employer,
                    address: facebookJobs[i].address,
                    long_description: facebookJobs[i].long_description,
                    share_url: facebookJobs[i].share_url,
                    title: facebookJobs[i].title,
                    sub_title: facebookJobs[i].sub_title,
                    map: facebookJobs[i].map,
                    created_at: facebookJobs[i].created_at,
                    updated_at: facebookJobs[i].updated_at,
                },
            };
            edges.push(facebookJob);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield FacebookJobRepository_1.default.count(filter) : 0;
        const dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: facebookJobs.length >= args.limit,
                hasPreviousPage: args.page > 1,
            } });
        return dataRet;
    }));
};
//# sourceMappingURL=get.js.map