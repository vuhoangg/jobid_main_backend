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
const JobRegisterRepository_1 = __importDefault(require("../../../db/repositories/JobRegisterRepository"));
const helpers_1 = require("../../helpers");
function getJobRegister(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    return JobRegisterRepository_1.default.getBy(getBy, fields)
        .then((jobRegister) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: jobRegister._id,
            contact_name: jobRegister.contact_name,
            job_title: jobRegister.job_title,
            job_location: jobRegister.job_location,
            contact_phone: jobRegister.contact_phone,
            contact_email: jobRegister.contact_email,
            created_at: jobRegister.created_at,
            updated_at: jobRegister.updated_at,
        };
        return node;
    }));
}
exports.getJobRegister = getJobRegister;
function getJobRegisters(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    return JobRegisterRepository_1.default.filter(filter, limit, page, infos.edges)
        .then((jobRegisters) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobRegisters.length; i++) {
            let jobRegister = {
                cursor: jobRegisters[i]._id,
                node: {
                    _id: jobRegisters[i]._id,
                    contact_name: jobRegisters[i].contact_name,
                    job_title: jobRegisters[i].job_title,
                    job_location: jobRegisters[i].job_location,
                    contact_phone: jobRegisters[i].contact_phone,
                    contact_email: jobRegisters[i].contact_email,
                    created_at: jobRegisters[i].created_at,
                    updated_at: jobRegisters[i].updated_at,
                }
            };
            edges.push(jobRegister);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield JobRegisterRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobRegisters.length >= limit,
                hasPreviousPage: args.page > 1
            } });
        return dataRet;
    }));
}
exports.getJobRegisters = getJobRegisters;
//# sourceMappingURL=get.js.map