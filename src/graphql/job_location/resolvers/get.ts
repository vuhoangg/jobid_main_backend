import JobLocationService from "../../../db/repositories/JobLocationRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getJobLocation(source, args, context, info) {
    const fields = rootField(info);
    let _id = args._id ? args._id : context.jobLocation._id;
    return JobLocationService.get(_id, fields)
        .then(async (jobLocation) => {
            let node = {
                _id: jobLocation._id,
                title: jobLocation.title,
                slug: jobLocation.slug,
                seo_title: jobLocation.seo_title,
                seo_description: jobLocation.seo_description,
                created_at: jobLocation.created_at,
                updated_at: jobLocation.updated_at,
            };
            return node;
        });
}

export function getJobLocations(source, args, context, info) {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    return JobLocationService.filter(filter, args.limit, args.page, infos.edges)
        .then(async (jobLocations) => {
            let edges = [];
            for (let i = 0; i < jobLocations.length; i++) {
                let jobLocation = {
                    cursor: jobLocations[i]._id,
                    node: {
                        _id: jobLocations[i]._id,
                        title: jobLocations[i].title,
                        slug: jobLocations[i].slug,
                        seo_title: jobLocations[i].seo_title,
                        seo_description: jobLocations[i].seo_description,
                        created_at: jobLocations[i].created_at,
                        updated_at: jobLocations[i].updated_at,
                    }
                };
                edges.push(jobLocation);
            }
            let countData = (infos.pageInfo && infos.pageInfo.length) ? await JobLocationService.count(filter) : 0;
            let dataRet = {
                ...{edges},
                pageInfo: {
                    length: countData,
                    hasNextPage: jobLocations.length >= args.limit,
                    hasPreviousPage: args.page > 1
                }
            };
            return dataRet;
        });
}
