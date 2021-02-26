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
const CvEmployerRepository_1 = __importDefault(require("../../../db/repositories/CvEmployerRepository"));
const helpers_1 = require("../../helpers");
exports.getCvEmployer = (source, args, context, info) => {
    const fieldsRoot = helpers_1.rootField(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    return CvEmployerRepository_1.default.get(getBy, fieldsRoot).then((cvEmployer) => {
        const dataCvEmployer = {
            _id: cvEmployer._id,
            cv_warehouse: cvEmployer.cv_warehouse,
            title: cvEmployer.title,
            origin_url: cvEmployer.origin_url,
            name: cvEmployer.name,
            email: cvEmployer.email,
            phone: cvEmployer.phone,
            birthday: cvEmployer.birthday,
            gender: cvEmployer.gender,
            num_experience: cvEmployer.num_experience,
            skill: cvEmployer.skill,
            position: cvEmployer.position,
            city: cvEmployer.city,
            job_level: cvEmployer.job_level,
            job_type: cvEmployer.job_type,
            created_at: cvEmployer.created_at,
            updated_at: cvEmployer.updated_at,
        };
        return dataCvEmployer;
    });
};
exports.getCvEmployers = (source, args, context, info) => {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    return CvEmployerRepository_1.default.filter(filter, args.page, args.limit, infos.edges).then((cvEmployers) => __awaiter(void 0, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < cvEmployers.length; i++) {
            let cvEmployer = {
                cursor: cvEmployers[i]._id,
                node: {
                    _id: cvEmployers[i]._id,
                    cv_warehouse: cvEmployers[i].cv_warehouse,
                    title: cvEmployers[i].title,
                    origin_url: cvEmployers[i].origin_url,
                    name: cvEmployers[i].name,
                    email: cvEmployers[i].email,
                    phone: cvEmployers[i].phone,
                    birthday: cvEmployers[i].birthday,
                    gender: cvEmployers[i].gender,
                    num_experience: cvEmployers[i].num_experience,
                    skill: cvEmployers[i].skill,
                    position: cvEmployers[i].position,
                    city: cvEmployers[i].city,
                    job_level: cvEmployers[i].job_level,
                    job_type: cvEmployers[i].job_type,
                    created_at: cvEmployers[i].created_at,
                    updated_at: cvEmployers[i].updated_at,
                },
            };
            edges.push(cvEmployer);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield CvEmployerRepository_1.default.count(filter) : 0;
        const dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: cvEmployers.length >= args.limit,
                hasPreviousPage: args.page > 1,
            } });
        return dataRet;
    }));
};
//# sourceMappingURL=get.js.map