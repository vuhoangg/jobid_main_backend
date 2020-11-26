import CommunityCategoryService from "../../../db/repositories/CommunityCategoryRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export const getCommunityCategory = async (source, args, context, info) => {
    const fields = rootField(info);
    let communityCategory = await CommunityCategoryService.get(args._id, fields);

    let node = {
        _id: communityCategory._id,
        title: communityCategory.title,
        description: communityCategory.description,
        slug: communityCategory.slug,
        image: communityCategory.image,
        seo_title: communityCategory.seo_title,
        seo_description: communityCategory.seo_description,
        created_at: communityCategory.created_at,
        updated_at: communityCategory.updated_at,
    };
    return node;
}

export const getCommunityCategorys = async (source, args, context, info) => {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    let communityCategorys = await CommunityCategoryService.filter(filter, limit, page, infos.edges);

    let edges = [];
    for (let i = 0; i < communityCategorys.length; i++) {
        let communityCategory = {
            cursor: communityCategorys[i]._id,
            node: {
                _id: communityCategorys[i]._id,
                title: communityCategorys[i].title,
                slug: communityCategorys[i].slug,
                icon: communityCategorys[i].icon,
                seo_title: communityCategorys[i].seo_title,
                seo_description: communityCategorys[i].seo_description,
                created_at: communityCategorys[i].created_at,
                updated_at: communityCategorys[i].updated_at,
            }
        };
        edges.push(communityCategory);
    }
    let countData = (infos.pageInfo && infos.pageInfo.length) ? await CommunityCategoryService.count(filter) : 0;
    let dataRet = {
        ...{ edges },
        pageInfo: {
            length: countData,
            hasNextPage: communityCategorys.length >= limit,
            hasPreviousPage: page > 1
        }
    };
    return dataRet;
}
