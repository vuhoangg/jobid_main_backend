import SuggestionService from "../../../db/repositories/SuggestionRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getSuggestion(source, args, context, info) {
    const fields = rootField(info);
    let _id = args._id ? args._id : context.suggestion._id;
    return SuggestionService.get(_id, fields)
        .then(async (suggestion) => {
            let node = {
                _id: suggestion._id,
                title: suggestion.title,
                slug: suggestion.slug,
                seo_title: suggestion.seo_title,
                seo_description: suggestion.seo_description,
                created_at: suggestion.created_at,
                updated_at: suggestion.updated_at,
            };
            return node;
        });
}

export function getSuggestions(source, args, context, info) {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    return SuggestionService.filter(filter, args.limit, args.page, infos.edges)
        .then(async (suggestions) => {
            let edges = [];
            for (let i = 0; i < suggestions.length; i++) {
                let suggestion = {
                    cursor: suggestions[i]._id,
                    node: {
                        _id: suggestions[i]._id,
                        title: suggestions[i].title,
                        slug: suggestions[i].slug,
                        seo_title: suggestions[i].seo_title,
                        seo_description: suggestions[i].seo_description,
                        created_at: suggestions[i].created_at,
                        updated_at: suggestions[i].updated_at,
                    }
                };
                edges.push(suggestion);
            }
            let countData = (infos.pageInfo && infos.pageInfo.length) ? await SuggestionService.count(filter) : 0;
            let dataRet = {
                ...{edges},
                pageInfo: {
                    length: countData,
                    hasNextPage: suggestions.length >= args.limit,
                    hasPreviousPage: args.page > 1
                }
            };
            return dataRet;
        });
}
