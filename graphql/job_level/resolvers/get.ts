import BenefitService from "../../../db/repository/BenefitRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getBenefit(source, args, context, info) {
    const fields = rootField(info);
    let _id = args._id ? args._id : context.benefit._id;
    return BenefitService.get(_id, fields)
        .then(async (benefit) => {
            let node = {
                _id: benefit._id,
                title: benefit.title,
                slug: benefit.slug,
                seo_title: benefit.seo_title,
                seo_description: benefit.seo_description,
                created_at: benefit.created_at,
                updated_at: benefit.updated_at,
            };
            return node;
        });
}

export function getBenefits(source, args, context, info) {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    return BenefitService.filter(filter, args.limit, args.page, infos.edges)
        .then(async (benefits) => {
            let edges = [];
            for (let i = 0; i < benefits.length; i++) {
                let benefit = {
                    cursor: benefits[i]._id,
                    node: {
                        _id: benefits[i]._id,
                        title: benefits[i].title,
                        slug: benefits[i].slug,
                        seo_title: benefits[i].seo_title,
                        seo_description: benefits[i].seo_description,
                        created_at: benefits[i].created_at,
                        updated_at: benefits[i].updated_at,
                    }
                };
                edges.push(benefit);
            }
            let countData = (infos.pageInfo && infos.pageInfo.length) ? await BenefitService.count(filter) : 0;
            let dataRet = {
                ...{edges},
                pageInfo: {
                    length: countData,
                    hasNextPage: benefits.length >= args.limit,
                    hasPreviousPage: args.page > 1
                }
            };
            return dataRet;
        });
}