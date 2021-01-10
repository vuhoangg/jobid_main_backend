import { json } from "body-parser";
import CompanyService from "../../../db/repositories/CompanyRepository";
import JobKeywordService from "../../../db/repositories/JobKeywordRepository";
import JobPostService from "../../../db/repositories/JobPostRepository";
import JobSkillService from "../../../db/repositories/JobSkillRepository";
import { toSlug } from "../../../helpers/string";

export const importJobKeyword = async (req, res) => {
    let token = req.body.token;
    if (token === process.env.CRAWL_IMPORT_TOKEN) {
        let title = req.body.title;
        let slug = req.body.slug;
        let keyword = req.body.keyword;

        let data = {
            title: title,
            slug: slug,
            keyword: keyword,
        }

        let jobKeyword = await JobKeywordService.create(data);

        res.json({
            jobKeyword: jobKeyword
        });
    } else {
        res.json({});
    }
}

export const importJobSkill = async (req, res) => {
    let token = req.body.token;
    if (token === process.env.CRAWL_IMPORT_TOKEN) {
        let title = req.body.title;
        let slug = toSlug(title);

        let data = {
            title: title,
            slug: slug,
        }

        let findJobSkill = await JobSkillService.getBy({ slug: slug }, {});
        if (findJobSkill) {
            res.json({
                jobSkill: findJobSkill
            });
        } else {
            let jobSkill = await JobSkillService.create(data);
            res.json({
                jobSkill: jobSkill
            });
        }
    } else {
        res.json({});
    }
}

export const importCompany = async (req, res) => {
    let token = req.body.token;
    if (token === process.env.CRAWL_IMPORT_TOKEN) {
        let name = req.body.name;
        let slug = toSlug(name);
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
            created_by: "5fe57dd04644239e63f57e88", // khanhnq@ketnoiviec.net
            logo: logo,
            website: website,
            youtube: youtube,
            description: description,
            video: video,
            size: size,
            story: story,
            office: office,
        }

        let findCompany = await CompanyService.getBy({ slug: slug }, {});
        if (findCompany) {
            res.json({
                company: findCompany
            });
        } else {
            let company = await CompanyService.create(data);
            res.json({
                company: company
            });
        }
    } else {
        res.json({});
    }
}

export const importJobPost = async (req, res) => {
    let token = req.body.token;
    if (token === process.env.CRAWL_IMPORT_TOKEN) {
        let title = req.body.title;
        let slug = toSlug(title, true);
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
            employer: "5fe57dd04644239e63f57e88", // khanhnq@ketnoiviec.net
            source: "topcv",
        }

        console.log(data);

        let jobPost = await JobPostService.create(data);

        res.json({
            jobPost: jobPost
        });
    } else {
        res.json({});
    }
}

