import CommunityPostService from "../../../db/repositories/CommunityPostRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export const getCommunityPost = async (source, args, context, info) => {
    const fields = rootField(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    let communityPost = await CommunityPostService.getBy(getBy, fields);

    let node = {
        _id: communityPost._id,
        user: communityPost.user,
        title: communityPost.title,
        community_category: communityPost.community_category,
        slug: communityPost.slug,
        community_tag: communityPost.community_tag,
        description: communityPost.description,
        like_count: communityPost.like_count,
        view_count: communityPost.view_count,
        answer_count: communityPost.answer_count,
        status: communityPost.status,
        seo_title: communityPost.seo_title,
        seo_description: communityPost.seo_description,
        created_at: communityPost.created_at,
        updated_at: communityPost.updated_at,
    };
    return node;
}

export const getCommunityPosts = async (source, args, context, info) => {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    let page = args.page > 50 ? 10 : args.page;

    let communityPosts = await CommunityPostService.filter(filter, args.limit, page, infos.edges);

    let edges = [];
    for (let i = 0; i < communityPosts.length; i++) {
        let communityPost = {
            cursor: communityPosts[i]._id,
            node: {
                _id: communityPosts[i]._id,
                user: communityPosts[i].user,
                title: communityPosts[i].title,
                community_category: communityPosts[i].community_category,
                slug: communityPosts[i].slug,
                community_tag: communityPosts[i].community_tag,
                description: communityPosts[i].description,
                like_count: communityPosts[i].like_count,
                view_count: communityPosts[i].view_count,
                answer_count: communityPosts[i].answer_count,
                status: communityPosts[i].status,
                seo_title: communityPosts[i].seo_title,
                seo_description: communityPosts[i].seo_description,
                created_at: communityPosts[i].created_at,
                updated_at: communityPosts[i].updated_at,
            }
        };
        edges.push(communityPost);
    }
    let countData = (infos.pageInfo && infos.pageInfo.length) ? await CommunityPostService.count(filter) : 0;
    let dataRet = {
        ...{ edges },
        pageInfo: {
            length: countData,
            hasNextPage: communityPosts.length >= args.limit,
            hasPreviousPage: page > 1
        }
    };
    return dataRet;
}
