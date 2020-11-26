import CommunityPostLikeService from "../../../db/repositories/CommunityPostLikeRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export const getCommunityPostLike = async (source, args, context, info) => {
    const fields = rootField(info);
    let communityPostLike = await CommunityPostLikeService.get(args._id, fields);

    let node = {
        _id: communityPostLike._id,
        user: communityPostLike.user,
        community_post: communityPostLike.community_post,
        created_at: communityPostLike.created_at,
        updated_at: communityPostLike.updated_at,
    };
    return node;
}

export const getCommunityPostLikes = async (source, args, context, info) => {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    let communityPostLikes = await CommunityPostLikeService.filter(filter, limit, page, infos.edges);

    let edges = [];
    for (let i = 0; i < communityPostLikes.length; i++) {
        let communityPostLike = {
            cursor: communityPostLikes[i]._id,
            node: {
                _id: communityPostLikes[i]._id,
                user: communityPostLikes[i].user,
                community_post: communityPostLikes[i].community_post,
                created_at: communityPostLikes[i].created_at,
                updated_at: communityPostLikes[i].updated_at,
            }
        };
        edges.push(communityPostLike);
    }
    let countData = (infos.pageInfo && infos.pageInfo.length) ? await CommunityPostLikeService.count(filter) : 0;
    let dataRet = {
        ...{ edges },
        pageInfo: {
            length: countData,
            hasNextPage: communityPostLikes.length >= limit,
            hasPreviousPage: page > 1
        }
    };
    return dataRet;
}
