import CommunityPostLikeService from "../../../db/repositories/CommunityPostLikeRepository";
import CommunityPostService from "../../../db/repositories/CommunityPostRepository";
import { seoDescription } from "../../../helpers/seo";
import { authenticateUser } from "../../../middlewares/authenticate";
import { filterObject, rootField, rootInfo } from "../../helpers";

export const getCommunityPost = async (source, args, context, info) => {
    const fields = rootField(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    let communityPost = await CommunityPostService.getBy(getBy, fields);

    let is_like = false;

    let isAuthenticated = await authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        is_like = !! await CommunityPostLikeService.count({ community_post: communityPost._id, user: loggedUser._id });
    }

    let node = {
        _id: communityPost._id,
        user: communityPost.user,
        title: communityPost.title,
        thumbnail: communityPost.thumbnail,
        community_category: communityPost.community_category,
        slug: communityPost.slug,
        community_tag: communityPost.community_tag,
        description: communityPost.description,
        like_count: communityPost.like_count,
        is_like: is_like,
        view_count: communityPost.view_count,
        answer_count: communityPost.answer_count,
        status: communityPost.status,
        seo_title: communityPost.seo_title || communityPost.title,
        seo_description: communityPost.seo_description || seoDescription(communityPost.description),
        created_at: communityPost.created_at,
        updated_at: communityPost.updated_at,
    };
    return node;
}

export const getCommunityPosts = async (source, args, context, info) => {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    let communityPosts = await CommunityPostService.filter(filter, limit, page, infos.edges);

    let isAuthenticated = await authenticateUser(context, context.res);

    let edges = [];
    for (let i = 0; i < communityPosts.length; i++) {
        let is_like = false;
        if (isAuthenticated) {
            let loggedUser = context.res.locals.fullUser;
            is_like = !! await CommunityPostLikeService.count({ community_post: communityPosts[i]._id, user: loggedUser._id });
        }
        let communityPost = {
            cursor: communityPosts[i]._id,
            node: {
                _id: communityPosts[i]._id,
                user: communityPosts[i].user,
                title: communityPosts[i].title,
                thumbnail: communityPosts[i].thumbnail,
                community_category: communityPosts[i].community_category,
                slug: communityPosts[i].slug,
                community_tag: communityPosts[i].community_tag,
                description: communityPosts[i].description,
                like_count: communityPosts[i].like_count,
                is_like: is_like,
                view_count: communityPosts[i].view_count,
                answer_count: communityPosts[i].answer_count,
                status: communityPosts[i].status,
                seo_title: communityPosts[i].seo_title || communityPosts[i].title,
                seo_description: communityPosts[i].seo_description || seoDescription(communityPosts[i].description),
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
            hasNextPage: communityPosts.length >= limit,
            hasPreviousPage: page > 1
        }
    };
    return dataRet;
}
