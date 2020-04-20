import CompanyService from "../../../db/repositories/CompanyRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getCompany(source, args, context, info) {
    const fields = rootField(info);
    let _id = args._id ? args._id : context.company._id;
    return CompanyService.get(_id, fields)
        .then(async (company) => {
            let node = {
                _id: company._id,
                title: company.title,
                slug: company.slug,
                seo_title: company.seo_title,
                seo_description: company.seo_description,
                created_at: company.created_at,
                updated_at: company.updated_at,
            };
            return node;
        });
}

export function getCompanys(source, args, context, info) {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    return CompanyService.filter(filter, args.limit, args.page, infos.edges)
        .then(async (companys) => {
            let edges = [];
            for (let i = 0; i < companys.length; i++) {
                let company = {
                    cursor: companys[i]._id,
                    node: {
                        _id: companys[i]._id,
                        title: companys[i].title,
                        slug: companys[i].slug,
                        seo_title: companys[i].seo_title,
                        seo_description: companys[i].seo_description,
                        created_at: companys[i].created_at,
                        updated_at: companys[i].updated_at,
                    }
                };
                edges.push(company);
            }
            let countData = (infos.pageInfo && infos.pageInfo.length) ? await CompanyService.count(filter) : 0;
            let dataRet = {
                ...{edges},
                pageInfo: {
                    length: countData,
                    hasNextPage: companys.length >= args.limit,
                    hasPreviousPage: args.page > 1
                }
            };
            return dataRet;
        });
}
