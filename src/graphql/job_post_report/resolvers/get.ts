import JobPostReportService from "../../../db/repositories/JobPostReportRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";
import {authenticateUser} from "../../../middlewares/authenticate";

export const getJobPostReport = async (source, args, context, info) => {
  const fields = rootField(info);

  let isAuthenticated = await authenticateUser(context, context.res);

  if (isAuthenticated) {
    let loggedUser = context.res.locals.fullUser;

    let getBy = {user: loggedUser._id}
    args._id ? getBy = Object.assign(getBy, {_id: args._id}) : null;
    args.job_post ? getBy = Object.assign(getBy, {job_post: args.job_post}) : null;

    let jobPostReport = await JobPostReportService.getBy(getBy, fields);

    let node = {
      _id: jobPostReport._id,
      user: jobPostReport.user,
      job_post: jobPostReport.job_post,
      reason: jobPostReport.reason,
      description: jobPostReport.description,
      created_at: jobPostReport.created_at,
      updated_at: jobPostReport.updated_at,
    };
    return node;
  }
};

export const getJobPostReports = async (source, args, context, info) => {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let limit = args.limit > 1000 ? 10 : args.limit;
  let page = args.page;
  let isAuthenticated = await authenticateUser(context, context.res);

  if (isAuthenticated) {
    let loggedUser = context.res.locals.fullUser;
    filter = Object.assign(filter, {user: loggedUser._id});
    let jobPostReports = await JobPostReportService.filter(filter, page, limit, infos.edges);

    let edges = [];
    for (let i = 0; i < jobPostReports.length; i++) {
      let jobPostReport = {
        cursor: jobPostReports[i]._id,
        node: {
          _id: jobPostReports[i]._id,
          user: jobPostReports[i].user,
          job_post: jobPostReports[i].job_post,
          reason: jobPostReports[i].reason,
          description: jobPostReports[i].description,
          created_at: jobPostReports[i].created_at,
          updated_at: jobPostReports[i].updated_at,
        },
      };
      edges.push(jobPostReport);
    }
    let countData = infos.pageInfo && infos.pageInfo.length ? await JobPostReportService.count(filter) : 0;
    let dataRet = {
      ...{edges},
      pageInfo: {
        length: countData,
        hasNextPage: jobPostReports.length >= limit,
        hasPreviousPage: args.page > 1,
      },
    };
    return dataRet;
  }
  ;
}

