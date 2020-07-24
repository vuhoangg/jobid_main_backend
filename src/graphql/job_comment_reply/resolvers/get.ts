import JobCommentReplySerrvice from "../../../db/repositories/JobCommentReplyRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export function getJobReplyComment(source, args, context, info) {
  const fields = rootField(info);
  return JobCommentReplySerrvice.get(args._id, fields).then(async (jobCommentReply) => {
    let node = {
      _id: jobCommentReply._id,
      job: jobCommentReply.job,
      user: jobCommentReply.user,
      comment: jobCommentReply.comment,
      parent: jobCommentReply.parent,
      created_at: jobCommentReply.created_at,
      updated_at: jobCommentReply.updated_at,
    };
    return node;
  });
}

export function getJobReplyComments(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let page = args.page > 50 ? 10 : args.page;
  return JobCommentReplySerrvice.filter(filter, args.limit, page, infos.edges).then(async (jobCommentsReply) => {
    let edges = [];
    for (let i = 0; i < jobCommentsReply.length; i++) {
      let jobComment = {
        cursor: jobCommentsReply[i]._id,
        node: {
          _id: jobCommentsReply[i]._id,
          job: jobCommentsReply[i].job,
          user: jobCommentsReply[i].user,
          comment: jobCommentsReply[i].comment,
          parent: jobCommentsReply[i].parent,
          created_at: jobCommentsReply[i].created_at,
          updated_at: jobCommentsReply[i].updated_at,
        },
      };
      edges.push(jobComment);
    }
    let countData = infos.pageInfo && infos.pageInfo.length ? await JobCommentReplySerrvice.count(filter) : 0;
    let dataRet = {
      ...{ edges },
      pageInfo: {
        length: countData,
        hasNextPage: jobCommentsReply.length >= args.limit,
        hasPreviousPage: page > 1,
      },
    };
    return dataRet;
  });
}
