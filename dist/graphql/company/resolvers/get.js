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
exports.getCompanys = exports.getCompany = void 0;
const CompanyRepository_1 = __importDefault(require("../../../db/repositories/CompanyRepository"));
const helpers_1 = require("../../helpers");
function getCompany(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    return CompanyRepository_1.default.getBy(getBy, fields).then((company) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: company._id,
            name: company.name,
            business_code: company.business_code,
            job_category: company.job_category,
            company_type: company.company_type,
            verify_status: company.verify_status,
            premium_status: company.premium_status,
            album: company.album,
            slug: company.slug,
            logo: company.logo,
            cover: company.cover,
            website: company.website,
            email: company.email,
            phone: company.phone,
            facebook: company.facebook,
            youtube: company.youtube,
            video: company.video,
            description: company.description,
            slogan: company.slogan,
            created_by: company.created_by,
            office: company.office,
            story: company.story,
            people: company.people,
            benefit: company.benefit,
            follow: company.follow,
            size: company.size,
            seo_title: company.seo_title,
            seo_description: company.seo_description,
            created_at: company.created_at,
            updated_at: company.updated_at,
        };
        return node;
    }));
}
exports.getCompany = getCompany;
function getCompanys(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    return CompanyRepository_1.default.filter(filter, args.limit, args.page, infos.edges).then((companys) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < companys.length; i++) {
            let company = {
                cursor: companys[i]._id,
                node: {
                    _id: companys[i]._id,
                    name: companys[i].name,
                    business_code: companys[i].business_code,
                    job_category: companys[i].job_category,
                    company_type: companys[i].company_type,
                    verify_status: companys[i].verify_status,
                    premium_status: companys[i].premium_status,
                    album: companys[i].album,
                    slug: companys[i].slug,
                    logo: companys[i].logo,
                    cover: companys[i].cover,
                    website: companys[i].website,
                    email: companys[i].email,
                    phone: companys[i].phone,
                    facebook: companys[i].facebook,
                    youtube: companys[i].youtube,
                    video: companys[i].video,
                    description: companys[i].description,
                    slogan: companys[i].slogan,
                    created_by: companys[i].created_by,
                    office: companys[i].office,
                    story: companys[i].story,
                    people: companys[i].people,
                    benefit: companys[i].benefit,
                    follow: companys[i].follow,
                    size: companys[i].size,
                    seo_title: companys[i].seo_title,
                    seo_description: companys[i].seo_description,
                    created_at: companys[i].created_at,
                    updated_at: companys[i].updated_at,
                },
            };
            edges.push(company);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield CompanyRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: companys.length >= args.limit,
                hasPreviousPage: args.page > 1,
            } });
        return dataRet;
    }));
}
exports.getCompanys = getCompanys;
//# sourceMappingURL=get.js.map