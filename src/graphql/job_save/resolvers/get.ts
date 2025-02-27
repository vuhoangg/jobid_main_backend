import JobSaveService from "../../../db/repositories/JobSaveRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export function getJobSave(source, args, context, info) {
  const fields = rootField(info);
  return JobSaveService.get(args._id, fields)
    .then(async (jobSave) => {
      let node = {
        _id: jobSave._id,
        job_post: jobSave.job_post,
        user: jobSave.user,
        created_at: jobSave.created_at,
        updated_at: jobSave.updated_at,
      };
      return node;
    });
}

export function getJobSaves(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let limit = args.limit > 1000 ? 10 : args.limit;
  let page = args.page;
  return JobSaveService.filter(filter, limit, page, infos.edges)
    .then(async (jobSaves) => {
      let edges = [];
      for (let i = 0; i < jobSaves.length; i++) {
        let jobSave = {
          cursor: jobSaves[i]._id,
          node: {
            _id: jobSaves[i]._id,
            job_post: jobSaves[i].job_post,
            user: jobSaves[i].user,
            created_at: jobSaves[i].created_at,
            updated_at: jobSaves[i].updated_at,
          }
        };
        edges.push(jobSave);
      }
      let countData = (infos.pageInfo && infos.pageInfo.length) ? await JobSaveService.count(filter) : 0;
      let dataRet = {
        ...{ edges },
        pageInfo: {
          length: countData,
          hasNextPage: jobSaves.length >= limit,
          hasPreviousPage: page > 1
        }
      };
      return dataRet;
    });
}
