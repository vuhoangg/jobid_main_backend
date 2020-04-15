import JobSkillService from "../../../db/repository/JobSkillRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getJobSkill(source, args, context, info) {
    const fields = rootField(info);
    let _id = args._id ? args._id : context.jobSkill._id;
    return JobSkillService.get(_id, fields)
        .then(async (jobSkill) => {
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
        });
}

export function getJobSkills(source, args, context, info) {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    return JobSkillService.filter(filter, args.limit, args.page, infos.edges)
        .then(async (jobSkills) => {
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
            let countData = (infos.pageInfo && infos.pageInfo.length) ? await JobSkillService.count(filter) : 0;
            let dataRet = {
                ...{edges},
                pageInfo: {
                    length: countData,
                    hasNextPage: jobSkills.length >= args.limit,
                    hasPreviousPage: args.page > 1
                }
            };
            return dataRet;
        });
}