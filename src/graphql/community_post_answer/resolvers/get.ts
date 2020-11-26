import CommunityPostAnswerService from "../../../db/repositories/CommunityPostAnswerRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export const getCommunityPostAnswer = async (source, args, context, info) => {
    const fields = rootField(info);
    let communityPostAnswer = await CommunityPostAnswerService.get(args._id, fields);

    let node = {
        _id: communityPostAnswer._id,
        user: communityPostAnswer.user,
        community_post: communityPostAnswer.community_post,
        reply: communityPostAnswer.reply,
        description: communityPostAnswer.description,
        like_count: communityPostAnswer.like_count,
        reply_count: communityPostAnswer.reply_count,
        created_at: communityPostAnswer.created_at,
        updated_at: communityPostAnswer.updated_at,
    };
    return node;
}

export const getCommunityPostAnswers = async (source, args, context, info) => {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    let page = args.page > 4000 ? 10 : args.page;

    let communityPostAnswers = await CommunityPostAnswerService.filter(filter, args.limit, page, infos.edges);

    let edges = [];
    for (let i = 0; i < communityPostAnswers.length; i++) {
        let communityPostAnswer = {
            cursor: communityPostAnswers[i]._id,
            node: {
                _id: communityPostAnswers[i]._id,
                user: communityPostAnswers[i].user,
                community_post: communityPostAnswers[i].community_post,
                reply: communityPostAnswers[i].reply,
                description: communityPostAnswers[i].description,
                like_count: communityPostAnswers[i].like_count,
                reply_count: communityPostAnswers[i].reply_count,
                created_at: communityPostAnswers[i].created_at,
                updated_at: communityPostAnswers[i].updated_at,
            }
        };
        edges.push(communityPostAnswer);
    }
    let countData = (infos.pageInfo && infos.pageInfo.length) ? await CommunityPostAnswerService.count(filter) : 0;
    let dataRet = {
        ...{ edges },
        pageInfo: {
            length: countData,
            hasNextPage: communityPostAnswers.length >= args.limit,
            hasPreviousPage: page > 1
        }
    };
    return dataRet;
}
