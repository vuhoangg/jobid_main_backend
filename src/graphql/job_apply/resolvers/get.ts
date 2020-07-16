import JobApplyService from "../../../db/repositories/JobApplyRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export function getJobApply(source, args, context, info) {
  console.log("getJobApply -> args", args)
  const fields = rootField(info);
  return JobApplyService.get(args._id, fields).then(async (jobApply) => {
    let node = {
      _id: jobApply._id,
      job_post: jobApply.job_post,
      user: jobApply.user,
      status: jobApply.status,
      file: jobApply.file,
      email: jobApply.email,
      description: jobApply.description,
      created_at: jobApply.created_at,
      updated_at: jobApply.updated_at,
    };
    return node;
  });
}

export function getJobApplys(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let page = args.page > 50 ? 10 : args.page;
  return JobApplyService.filter(filter, args.limit, page, infos.edges).then(async (jobApplys) => {
    let edges = [];
    for (let i = 0; i < jobApplys.length; i++) {
      let jobApply = {
        cursor: jobApplys[i]._id,
        node: {
          _id: jobApplys[i]._id,
          job_post: jobApplys[i].job_post,
          user: jobApplys[i].user,
          status: jobApplys[i].status,
          file: jobApplys[i].file,
          email: jobApplys[i].email,
          description: jobApplys[i].description,
          created_at: jobApplys[i].created_at,
          updated_at: jobApplys[i].updated_at,
        },
      };
      edges.push(jobApply);
    }
    let countData = infos.pageInfo && infos.pageInfo.length ? await JobApplyService.count(filter) : 0;
    let dataRet = {
      ...{ edges },
      pageInfo: {
        length: countData,
        hasNextPage: jobApplys.length >= args.limit,
        hasPreviousPage: page > 1,
      },
    };
    return dataRet;
  });
}
