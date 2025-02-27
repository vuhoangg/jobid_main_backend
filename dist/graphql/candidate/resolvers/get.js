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
exports.getCandidate = getCandidate;
exports.getCandidates = getCandidates;
const CandidateRepository_1 = __importDefault(require("../../../db/repositories/CandidateRepository"));
const helpers_1 = require("../../helpers");
function getCandidate(source, args, context, info) {
    const fields = (0, helpers_1.rootField)(info);
    return CandidateRepository_1.default.get(args._id, fields)
        .then((candidate) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: candidate._id,
            first_name: candidate.first_name,
            last_name: candidate.last_name,
            interest: candidate.interest,
            job_open: candidate.job_open,
            user: candidate.user,
            avatar: candidate.avatar,
            cv: candidate.cv,
            photos: candidate.photos,
            files: candidate.files,
            birthday: candidate.birthday,
            gender: candidate.gender,
            phone: candidate.phone,
            email: candidate.email,
            address: candidate.address,
            website: candidate.website,
            target: candidate.target,
            study: candidate.study,
            exp: candidate.exp,
            project: candidate.project,
            note: candidate.note,
            public: candidate.public,
            upload_by: candidate.upload_by,
            created_at: candidate.created_at,
            updated_at: candidate.updated_at,
        };
        return node;
    }));
}
function getCandidates(source, args, context, info) {
    let infos = (0, helpers_1.rootInfo)(info);
    let filter = (0, helpers_1.filterObject)(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    return CandidateRepository_1.default.filter(filter, limit, page, infos.edges)
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
                    avatar: candidates[i].avatar,
                    cv: candidates[i].cv,
                    photos: candidates[i].photos,
                    files: candidates[i].files,
                    birthday: candidates[i].birthday,
                    gender: candidates[i].gender,
                    phone: candidates[i].phone,
                    email: candidates[i].email,
                    address: candidates[i].address,
                    website: candidates[i].website,
                    target: candidates[i].target,
                    study: candidates[i].study,
                    exp: candidates[i].exp,
                    project: candidates[i].project,
                    note: candidates[i].note,
                    public: candidates[i].public,
                    upload_by: candidates[i].upload_by,
                    created_at: candidates[i].created_at,
                    updated_at: candidates[i].updated_at,
                }
            };
            edges.push(candidate);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield CandidateRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: candidates.length >= limit,
                hasPreviousPage: page > 1
            } });
        return dataRet;
    }));
}
//# sourceMappingURL=get.js.map