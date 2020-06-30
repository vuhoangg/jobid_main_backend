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
exports.getCurriculumVitaes = exports.getCurriculumVitae = void 0;
const helpers_1 = require("../../helpers");
const CurriculumVitaeRepository_1 = __importDefault(require("../../../db/repositories/CurriculumVitaeRepository"));
function getCurriculumVitae(source, args, context, info) {
    if (context.isAuthenticated()) {
        const fields = helpers_1.rootField(info);
        return CurriculumVitaeRepository_1.default.get({ _id: args._id, user_created: context.user._id, status: "active" }, fields).then((curriculumVitae) => __awaiter(this, void 0, void 0, function* () {
            return curriculumVitae;
        }));
    }
}
exports.getCurriculumVitae = getCurriculumVitae;
function getCurriculumVitaes(source, args, context, info) {
    if (context.isAuthenticated()) {
        let infos = helpers_1.rootInfo(info);
        let filter = Object.assign({ user_created: context.user._id, status: "active" }, helpers_1.filterObject(args.filter));
        let page = args.page > 50 ? 10 : args.page;
        return CurriculumVitaeRepository_1.default.filter(filter, args.limit, page, infos.edges).then((curriculumVitae) => __awaiter(this, void 0, void 0, function* () {
            let countData = infos.pageInfo && infos.pageInfo.length ? yield CurriculumVitaeRepository_1.default.count(filter) : 0;
            let dataRet = {
                edges: curriculumVitae.map((item) => ({
                    cursor: item._id,
                    node: item,
                })),
                pageInfo: {
                    length: countData,
                    hasNextPage: curriculumVitae.length >= args.limit,
                    hasPreviousPage: page > 1,
                },
            };
            return dataRet;
        }));
    }
}
exports.getCurriculumVitaes = getCurriculumVitaes;
//# sourceMappingURL=get.js.map