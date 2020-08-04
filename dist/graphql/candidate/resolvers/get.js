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
exports.getCandidates = exports.getCandidate = void 0;
const CandidateRepository_1 = __importDefault(require("../../../db/repositories/CandidateRepository"));
const helpers_1 = require("../../helpers");
function getCandidate(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    return CandidateRepository_1.default.get(args._id, fields)
        .then((candidate) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: candidate._id,
            first_name: candidate.first_name,
            last_name: candidate.last_name,
            interest: candidate.interest,
            job_open: candidate.job_open,
            user: candidate.user,
            cv: candidate.cv,
            photos: candidate.photos,
            files: candidate.files,
            created_at: candidate.created_at,
            updated_at: candidate.updated_at,
        };
        return node;
    }));
}
exports.getCandidate = getCandidate;
function getCandidates(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let page = args.page > 50 ? 10 : args.page;
    return CandidateRepository_1.default.filter(filter, args.limit, page, infos.edges)
        .then((candidates) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < candidates.length; i++) {
            let candidate = {
                cursor: candidates[i]._id,
                node: {
                    _id: candidates[i]._id,
                    first_name: candidates[i].first_name,
                    last_name: candidates[i].last_name,
                    interest: candidates[i].interest,
                    job_open: candidates[i].job_open,
                    user: candidates[i].user,
                    cv: candidates[i].cv,
                    photos: candidates[i].photos,
                    files: candidates[i].files,
                    created_at: candidates[i].created_at,
                    updated_at: candidates[i].updated_at,
                }
            };
            edges.push(candidate);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield CandidateRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: candidates.length >= args.limit,
                hasPreviousPage: page > 1
            } });
        return dataRet;
    }));
}
exports.getCandidates = getCandidates;
//# sourceMappingURL=get.js.map