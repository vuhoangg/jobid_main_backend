import BenefitService from "../../../db/repositories/BenefitRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getBenefit(source, args, context, info) {
    const fields = rootField(info);
    return BenefitService.get(args._id, fields)
        .then(async (benefit) => {
            let node = {
                _id: benefit._id,
                vi_title: benefit.vi_title,
                en_title: benefit.en_title,
                vi_slug: benefit.vi_slug,
                en_slug: benefit.en_slug,
                created_at: benefit.created_at,
                updated_at: benefit.updated_at,
            };
            return node;
        });
}

export function getBenefits(source, args, context, info) {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    let page = args.page > 50 ? 10 : args.page;
    return BenefitService.filter(filter, args.limit, page, infos.edges)
        .then(async (benefits) => {
            let edges = [];
            for (let i = 0; i < benefits.length; i++) {
                let benefit = {
                    cursor: benefits[i]._id,
                    node: {
                        _id: benefits[i]._id,
                        vi_title: benefits[i].vi_title,
                        en_title: benefits[i].en_title,
                        vi_slug: benefits[i].vi_slug,
                        en_slug: benefits[i].en_slug,
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
                    hasPreviousPage: page > 1
                }
            };
            return dataRet;
        });
}
