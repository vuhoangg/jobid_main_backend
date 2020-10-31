import CommunityAnswerService from "../../../db/repositories/CommunityAnswerRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export const getCommunityAnswer = async (source, args, context, info) => {
    const fields = rootField(info);
    let communityAnswer = await CommunityAnswerService.get(args._id, fields);

    let node = {
        _id: communityAnswer._id,
        user: communityAnswer.user,
        question: communityAnswer.question,
        reply: communityAnswer.reply,
        description: communityAnswer.description,
        like_count: communityAnswer.like_count,
        reply_count: communityAnswer.reply_count,
        created_at: communityAnswer.created_at,
        updated_at: communityAnswer.updated_at,
    };
    return node;
}

export const getCommunityAnswers = async (source, args, context, info) => {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    let page = args.page > 50 ? 10 : args.page;

    let communityAnswers = await CommunityAnswerService.filter(filter, args.limit, page, infos.edges);

    let edges = [];
    for (let i = 0; i < communityAnswers.length; i++) {
        let communityAnswer = {
            cursor: communityAnswers[i]._id,
            node: {
                _id: communityAnswers[i]._id,
                user: communityAnswers[i].user,
                question: communityAnswers[i].question,
                reply: communityAnswers[i].reply,
                description: communityAnswers[i].description,
                like_count: communityAnswers[i].like_count,
                reply_count: communityAnswers[i].reply_count,
                created_at: communityAnswers[i].created_at,
                updated_at: communityAnswers[i].updated_at,
            }
        };
        edges.push(communityAnswer);
    }
    let countData = (infos.pageInfo && infos.pageInfo.length) ? await CommunityAnswerService.count(filter) : 0;
    let dataRet = {
        ...{ edges },
        pageInfo: {
            length: countData,
            hasNextPage: communityAnswers.length >= args.limit,
            hasPreviousPage: page > 1
        }
    };
    return dataRet;
}
