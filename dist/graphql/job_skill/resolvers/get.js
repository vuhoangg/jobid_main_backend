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
const JobSkillRepository_1 = __importDefault(require("../../../db/repositories/JobSkillRepository"));
const helpers_1 = require("../../helpers");
function getJobSkill(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    let _id = args._id ? args._id : context.jobSkill._id;
    return JobSkillRepository_1.default.get(_id, fields)
        .then((jobSkill) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: jobSkill._id,
            title: jobSkill.title,
            slug: jobSkill.slug,
            seo_title: jobSkill.seo_title,
            seo_description: jobSkill.seo_description,
            created_at: jobSkill.created_at,
            updated_at: jobSkill.updated_at,
        };
        return node;
    }));
}
exports.getJobSkill = getJobSkill;
function getJobSkills(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    return JobSkillRepository_1.default.filter(filter, args.limit, args.page, infos.edges)
        .then((jobSkills) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < jobSkills.length; i++) {
            let jobSkill = {
                cursor: jobSkills[i]._id,
                node: {
                    _id: jobSkills[i]._id,
                    title: jobSkills[i].title,
                    slug: jobSkills[i].slug,
                    seo_title: jobSkills[i].seo_title,
                    seo_description: jobSkills[i].seo_description,
                    created_at: jobSkills[i].created_at,
                    updated_at: jobSkills[i].updated_at,
                }
            };
            edges.push(jobSkill);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield JobSkillRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: jobSkills.length >= args.limit,
                hasPreviousPage: args.page > 1
            } });
        return dataRet;
    }));
}
exports.getJobSkills = getJobSkills;
//# sourceMappingURL=get.js.map