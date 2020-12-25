import CommunityTagService from "../../../db/repositories/CommunityTagRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export const getCommunityTag = async (source, args, context, info) => {
    const fields = rootField(info);
    let getBy = args._id ? {_id: args._id} : {slug: args.slug};
    let communityTag = await CommunityTagService.getBy(getBy, fields);

    let node = {
        _id: communityTag._id,
        title: communityTag.title,
        description: communityTag.description,
        slug: communityTag.slug,
        image: communityTag.image,
        seo_title: communityTag.seo_title,
        seo_description: communityTag.seo_description,
        created_at: communityTag.created_at,
        updated_at: communityTag.updated_at,
    };
    return node;
}

export const getCommunityTags = async (source, args, context, info) => {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    let communityTags = await CommunityTagService.filter(filter, limit, page, infos.edges);

    let edges = [];
    for (let i = 0; i < communityTags.length; i++) {
        let communityTag = {
            cursor: communityTags[i]._id,
            node: {
                _id: communityTags[i]._id,
                title: communityTags[i].title,
                slug: communityTags[i].slug,
                icon: communityTags[i].icon,
                seo_title: communityTags[i].seo_title,
                seo_description: communityTags[i].seo_description,
                created_at: communityTags[i].created_at,
                updated_at: communityTags[i].updated_at,
            }
        };
        edges.push(communityTag);
    }
    let countData = (infos.pageInfo && infos.pageInfo.length) ? await CommunityTagService.count(filter) : 0;
    let dataRet = {
        ...{ edges },
        pageInfo: {
            length: countData,
            hasNextPage: communityTags.length >= limit,
            hasPreviousPage: page > 1
        }
    };
    return dataRet;
}
