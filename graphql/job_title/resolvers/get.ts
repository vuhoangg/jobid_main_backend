import JobTitleService from "../../../db/repository/JobTitleRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getJobTitle(source, args, context, info) {
    const fields = rootField(info);
    let _id = args._id ? args._id : context.jobTitle._id;
    return JobTitleService.get(_id, fields)
        .then(async (jobTitle) => {
            let node = {
                _id: jobTitle._id,
                title: jobTitle.title,
                slug: jobTitle.slug,
                seo_title: jobTitle.seo_title,
                seo_description: jobTitle.seo_description,
                created_at: jobTitle.created_at,
                updated_at: jobTitle.updated_at,
            };
            return node;
        });
}

export function getJobTitles(source, args, context, info) {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    return JobTitleService.filter(filter, args.limit, args.page, infos.edges)
        .then(async (jobTitles) => {
            let edges = [];
            for (let i = 0; i < jobTitles.length; i++) {
                let jobTitle = {
                    cursor: jobTitles[i]._id,
                    node: {
                        _id: jobTitles[i]._id,
                        title: jobTitles[i].title,
                        slug: jobTitles[i].slug,
                        seo_title: jobTitles[i].seo_title,
                        seo_description: jobTitles[i].seo_description,
                        created_at: jobTitles[i].created_at,
                        updated_at: jobTitles[i].updated_at,
                    }
                };
                edges.push(jobTitle);
            }
            let countData = (infos.pageInfo && infos.pageInfo.length) ? await JobTitleService.count(filter) : 0;
            let dataRet = {
                ...{edges},
                pageInfo: {
                    length: countData,
                    hasNextPage: jobTitles.length >= args.limit,
                    hasPreviousPage: args.page > 1
                }
            };
            return dataRet;
        });
}