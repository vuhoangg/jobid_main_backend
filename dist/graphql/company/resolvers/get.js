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
const CompanyFollowRepository_1 = __importDefault(require("../../../db/repositories/CompanyFollowRepository"));
const CompanyNotificationRegisterRepository_1 = __importDefault(require("../../../db/repositories/CompanyNotificationRegisterRepository"));
const CompanyRepository_1 = __importDefault(require("../../../db/repositories/CompanyRepository"));
const JobPostRepository_1 = __importDefault(require("../../../db/repositories/JobPostRepository"));
const seo_1 = require("../../../helpers/seo");
const authenticate_1 = require("../../../middlewares/authenticate");
const helpers_1 = require("../../helpers");
const getCompany = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let fields = (0, helpers_1.rootField)(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    fields = Object.assign(fields, {
        one_star_count: true,
        two_star_count: true,
        three_star_count: true,
        four_star_count: true,
        five_star_count: true,
    });
    let company = yield CompanyRepository_1.default.getBy(getBy, fields);
    let is_follow = false;
    let is_register = false;
    let isAuthenticated = yield (0, authenticate_1.authenticateUser)(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        is_follow = !!(yield CompanyFollowRepository_1.default.count({ company: company._id, user: loggedUser._id }));
        is_register = !!(yield CompanyNotificationRegisterRepository_1.default.count({ company: company._id, user: loggedUser._id }));
    }
    let job_count = yield JobPostRepository_1.default.count({ company_ref: company._id, status: "active" });
    let one_star_count = company.one_star_count;
    let two_star_count = company.two_star_count;
    let three_star_count = company.three_star_count;
    let four_star_count = company.four_star_count;
    let five_star_count = company.five_star_count;
    let rate_value = (one_star_count + two_star_count * 2 + three_star_count * 3 + four_star_count * 4 + five_star_count * 5) / (one_star_count + two_star_count + three_star_count + four_star_count + five_star_count);
    if (!rate_value) {
        rate_value = 5;
    }
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
        view_count: company.view_count,
        job_count: job_count,
        rate_value: rate_value,
        is_follow: is_follow,
        is_register: is_register,
        size: company.size,
        seo_title: company.seo_title || company.name,
        seo_description: company.seo_description || (0, seo_1.seoDescription)(company.description),
        created_at: company.created_at,
        updated_at: company.updated_at,
    };
    return node;
});
exports.getCompany = getCompany;
const getCompanys = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let infos = (0, helpers_1.rootInfo)(info);
    let filter = (0, helpers_1.filterObject)(args.filter);
    infos.edges = Object.assign(infos.edges, {
        one_star_count: true,
        two_star_count: true,
        three_star_count: true,
        four_star_count: true,
        five_star_count: true,
    });
    let companys = yield CompanyRepository_1.default.filter(filter, args.limit, args.page, infos.edges);
    let isAuthenticated = yield (0, authenticate_1.authenticateUser)(context, context.res);
    let edges = [];
    for (let i = 0; i < companys.length; i++) {
        let is_follow = false;
        let is_register = false;
        if (isAuthenticated) {
            let loggedUser = context.res.locals.fullUser;
            if (infos.edges['is_follow']) {
                is_follow = !!(yield CompanyFollowRepository_1.default.count({ company: companys[i]._id, user: loggedUser._id }));
            }
            if (infos.edges['is_register']) {
                is_register = !!(yield CompanyNotificationRegisterRepository_1.default.count({ company: companys[i]._id, user: loggedUser._id }));
            }
        }
        let job_count = 0;
        // let job_count = await JobPostService.count({ company_ref: companys[i]._id, status: "active" });
        let one_star_count = companys[i].one_star_count;
        let two_star_count = companys[i].two_star_count;
        let three_star_count = companys[i].three_star_count;
        let four_star_count = companys[i].four_star_count;
        let five_star_count = companys[i].five_star_count;
        let rate_value = (one_star_count + two_star_count * 2 + three_star_count * 3 + four_star_count * 4 + five_star_count * 5) / (one_star_count + two_star_count + three_star_count + four_star_count + five_star_count);
        if (!rate_value) {
            rate_value = 5;
        }
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
                view_count: companys[i].view_count,
                job_count: job_count,
                rate_value: rate_value,
                is_follow: is_follow,
                is_register: is_register,
                size: companys[i].size,
                seo_title: companys[i].seo_title || companys[i].name,
                seo_description: companys[i].seo_description || (0, seo_1.seoDescription)(companys[i].description),
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
});
exports.getCompanys = getCompanys;
//# sourceMappingURL=get.js.map