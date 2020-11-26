import JobRatingService from "../../../db/repositories/JobRatingRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export function getJobRating(source, args, context, info) {
  const fields = rootField(info);
  let getBy = args._id ? { _id: args._id } : { job_post: args.job_post };

  return JobRatingService.getBy(getBy, fields).then(async (jobRating) => {
    let node = {
      _id: jobRating._id,
      user: jobRating.user,
      job: jobRating.job,
      rat_value: jobRating.rat_value,
      rat_comment: jobRating.rat_content,
      created_at: jobRating.created_at,
      updated_at: jobRating.updated_at,
    };
    return node;
  });
}

export function getJobRatings(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let page = args.page > 4000 ? 10 : args.page;
  return JobRatingService.filter(filter, args.limit, page, infos.edges).then(async (jobRatings) => {
    let edges = [];
    for (let i = 0; i < jobRatings.length; i++) {
      let jobRating = {
        cursor: jobRatings[i]._id,
        node: {
          _id: jobRatings[i]._id,
          user: jobRatings[i].user,
          job: jobRatings[i].job,
          rat_value: jobRatings[i].rat_value,
          rat_comment: jobRatings[i].rat_comment,
          created_at: jobRatings[i].created_at,
          updated_at: jobRatings[i].updated_at,
        },
      };
      edges.push(jobRating);
    }
    let countData = infos.pageInfo && infos.pageInfo.length ? await JobRatingService.count(filter) : 0;
    let dataRet = {
      ...{ edges },
      pageInfo: {
        length: countData,
        hasNextPage: jobRatings.length >= args.limit,
        hasPreviousPage: page > 1,
      },
    };
    return dataRet;
  });
}
