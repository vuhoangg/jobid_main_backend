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
exports.importJobPost = exports.importCompany = exports.importJobSkill = exports.importJobKeyword = void 0;
const CompanyRepository_1 = __importDefault(require("../../../db/repositories/CompanyRepository"));
const JobKeywordRepository_1 = __importDefault(require("../../../db/repositories/JobKeywordRepository"));
const JobPostRepository_1 = __importDefault(require("../../../db/repositories/JobPostRepository"));
const JobSkillRepository_1 = __importDefault(require("../../../db/repositories/JobSkillRepository"));
const string_1 = require("../../../helpers/string");
exports.importJobKeyword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.body.token;
    if (token === process.env.CRAWL_IMPORT_TOKEN) {
        let title = req.body.title;
        let slug = req.body.slug;
        let keyword = req.body.keyword;
        let data = {
            title: title,
            slug: slug,
            keyword: keyword,
        };
        let jobKeyword = yield JobKeywordRepository_1.default.create(data);
        res.json({
            jobKeyword: jobKeyword
        });
    }
    else {
        res.json({});
    }
});
exports.importJobSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.body.token;
    if (token === process.env.CRAWL_IMPORT_TOKEN) {
        let title = req.body.title;
        let slug = string_1.toSlug(title);
        let data = {
            title: title,
            slug: slug,
        };
        let findJobSkill = yield JobSkillRepository_1.default.getBy({ slug: slug }, {});
        if (findJobSkill) {
            res.json({
                jobSkill: findJobSkill
            });
        }
        else {
            let jobSkill = yield JobSkillRepository_1.default.create(data);
            res.json({
                jobSkill: jobSkill
            });
        }
    }
    else {
        res.json({});
    }
});
exports.importCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.body.token;
    if (token === process.env.CRAWL_IMPORT_TOKEN) {
        let name = req.body.name;
        let slug = string_1.toSlug(name);
        let logo = req.body.logo;
        let website = req.body.website;
        let youtube = req.body.youtube;
        let description = req.body.description;
        let video = req.body.video;
        let size = req.body.size;
        let story = req.body.story;
        let office = req.body.office;
        let data = {
            name: name,
            slug: slug,
            verify_status: true,
            created_by: "5fe57dd04644239e63f57e88",
            logo: logo,
            website: website,
            youtube: youtube,
            description: description,
            video: video,
            size: size,
            story: story,
            office: office,
        };
        let findCompany = yield CompanyRepository_1.default.getBy({ slug: slug }, {});
        if (findCompany) {
            res.json({
                company: findCompany
            });
        }
        else {
            let company = yield CompanyRepository_1.default.create(data);
            res.json({
                company: company
            });
        }
    }
    else {
        res.json({});
    }
});
exports.importJobPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.body.token;
    if (token === process.env.CRAWL_IMPORT_TOKEN) {
        let title = req.body.title;
        let slug = string_1.toSlug(title, true);
        let job_type = req.body.job_type;
        let job_level = req.body.job_level;
        let job_category = req.body.job_category;
        let number = req.body.number;
        let description = req.body.description;
        let requirement = req.body.requirement;
        let salary = req.body.salary;
        let job_skill = req.body.job_skill;
        let address = req.body.address;
        let company = req.body.company;
        let image = req.body.image;
        let benefit = req.body.benefit;
        let exp = req.body.exp;
        let gender = req.body.gender;
        let end_date = req.body.end_date;
        let data = {
            title: title,
            slug: slug,
            job_type: job_type,
            job_level: job_level,
            job_category: job_category,
            number: number,
            description: description,
            requirement: requirement,
            salary: salary,
            job_skill: job_skill,
            address: address,
            company: company,
            image: image,
            benefit: benefit,
            exp: exp,
            gender: gender,
            end_date: end_date,
            status: "active",
            employer: "5fe57dd04644239e63f57e88",
            source: "topcv",
        };
        console.log(data);
        let jobPost = yield JobPostRepository_1.default.create(data);
        res.json({
            jobPost: jobPost
        });
    }
    else {
        res.json({});
    }
});
//# sourceMappingURL=index.js.map