import JobApplyOtherService from "../../../db/repositories/JobApplyOtherRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export function getJobApplyOther(source, args, context, info) {
  const fields = rootField(info);
  return JobApplyOtherService.get(args._id, fields).then(async (jobApplyOther) => {
    let node = {
      _id: jobApplyOther._id,
      job_post: jobApplyOther.job_post,
      user: jobApplyOther.user,
      status: jobApplyOther.status,
      file: jobApplyOther.file,
      email: jobApplyOther.email,
      type: jobApplyOther.type,
      description: jobApplyOther.description,
      created_at: jobApplyOther.created_at,
      updated_at: jobApplyOther.updated_at,
    };
    return node;
  });
}

export function getJobApplyOthers(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let limit = args.limit > 1000 ? 10 : args.limit;
  let page = args.page;
  return JobApplyOtherService.filter(filter, limit, page, infos.edges).then(async (jobApplyOthers) => {
    let edges = [];
    for (let i = 0; i < jobApplyOthers.length; i++) {
      let jobApplyOther = {
        cursor: jobApplyOthers[i]._id,
        node: {
          _id: jobApplyOthers[i]._id,
          job_post: jobApplyOthers[i].job_post,
          user: jobApplyOthers[i].user,
          type: jobApplyOthers[i].type,
          status: jobApplyOthers[i].status,
          file: jobApplyOthers[i].file,
          email: jobApplyOthers[i].email,
          description: jobApplyOthers[i].description,
          created_at: jobApplyOthers[i].created_at,
          updated_at: jobApplyOthers[i].updated_at,
        },
      };
      edges.push(jobApplyOther);
    }
    let countData = infos.pageInfo && infos.pageInfo.length ? await JobApplyOtherService.count(filter) : 0;
    let dataRet = {
      ...{ edges },
      pageInfo: {
        length: countData,
        hasNextPage: jobApplyOthers.length >= limit,
        hasPreviousPage: page > 1,
      },
    };
    return dataRet;
  });
}
