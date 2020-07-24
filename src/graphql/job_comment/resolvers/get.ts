import JobCommentService from "../../../db/repositories/JobCommentRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export function getJobComment(source, args, context, info) {
  const fields = rootField(info);
  return JobCommentService.get(args._id, fields).then(async (jobComment) => {
    let node = {
      _id: jobComment._id,
      job: jobComment.job,
      user: jobComment.user,
      comment: jobComment.comment,
      count: jobComment.count,
      created_at: jobComment.created_at,
      updated_at: jobComment.updated_at,
    };
    return node;
  });
}

export function getJobComments(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let page = args.page > 50 ? 10 : args.page;
  return JobCommentService.filter(filter, args.limit, page, infos.edges).then(async (jobComments) => {
    let edges = [];
    for (let i = 0; i < jobComments.length; i++) {
      let jobComment = {
        cursor: jobComments[i]._id,
        node: {
          _id: jobComments[i]._id,
          job: jobComments[i].job,
          user: jobComments[i].user,
          comment: jobComments[i].comment,
          children: jobComments[i].children,
          created_at: jobComments[i].created_at,
          updated_at: jobComments[i].updated_at,
        },
      };
      edges.push(jobComment);
    }
    let countData = infos.pageInfo && infos.pageInfo.length ? await JobCommentService.count(filter) : 0;
    let dataRet = {
      ...{ edges },
      pageInfo: {
        length: countData,
        hasNextPage: jobComments.length >= args.limit,
        hasPreviousPage: page > 1,
      },
    };
    return dataRet;
  });
}
