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
const authenticate_1 = require("../../../middlewares/authenticate");
const getCurriculumVitae = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, authenticate_1.authenticateUser)(context, context.res)) {
        const fields = (0, helpers_1.rootField)(info);
        return CurriculumVitaeRepository_1.default.get({ _id: args._id, user_created: context.res.locals.fullUser._id, status: "active" }, fields).then((curriculumVitae) => __awaiter(void 0, void 0, void 0, function* () {
            return curriculumVitae;
        }));
    }
});
exports.getCurriculumVitae = getCurriculumVitae;
const getCurriculumVitaes = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, authenticate_1.authenticateUser)(context, context.res)) {
        let infos = (0, helpers_1.rootInfo)(info);
        let filter = Object.assign({ user_created: context.res.locals.fullUser._id, status: "active" }, (0, helpers_1.filterObject)(args.filter));
        let limit = args.limit > 1000 ? 10 : args.limit;
        let page = args.page;
        return CurriculumVitaeRepository_1.default.filter(filter, limit, page, infos.edges).then((curriculumVitae) => __awaiter(void 0, void 0, void 0, function* () {
            let countData = infos.pageInfo && infos.pageInfo.length ? yield CurriculumVitaeRepository_1.default.count(filter) : 0;
            let dataRet = {
                edges: curriculumVitae.map((item) => ({
                    cursor: item._id,
                    node: item,
                })),
                pageInfo: {
                    length: countData,
                    hasNextPage: curriculumVitae.length >= limit,
                    hasPreviousPage: page > 1,
                },
            };
            return dataRet;
        }));
    }
});
exports.getCurriculumVitaes = getCurriculumVitaes;
//# sourceMappingURL=get.js.map