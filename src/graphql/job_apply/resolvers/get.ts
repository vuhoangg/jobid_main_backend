import JobApplyService from "../../../db/repositories/JobApplyRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";
import { authenticateEmployer, authenticateUser } from "../../../middlewares/authenticate";
import { promiseNull } from "../../../helpers/promise";

export const getJobApply = async (source, args, context, info) => {
  const fields = rootField(info);

  let isAuthenticated = await authenticateUser(context, context.res);

  if (isAuthenticated) {
    let loggedUser = context.res.locals.fullUser;
    let getBy = {
      _id: args._id,
      user: loggedUser._id,
    }
    let jobApply = await JobApplyService.getBy(getBy, fields);
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
  }
}

export const getJobApplys = async (source, args, context, info) => {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let page = args.page > 4000 ? 10 : args.page;

  let isAuthenticated = await authenticateUser(context, context.res);

  if (isAuthenticated) {
    let loggedUser = context.res.locals.fullUser;
    filter = Object.assign(filter, { user: loggedUser._id });

    let jobApplys = await JobApplyService.filter(filter, args.limit, page, infos.edges);
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
  }
}

export const getEmployerJobApply = async (source, args, context, info) => {
  const fields = rootField(info);

  let isAuthenticated = await authenticateEmployer(context, context.res);

  if (isAuthenticated) {
    let loggedEmployer = context.res.locals.fullEmployer;
    let getBy = {
      _id: args._id,
      employer: loggedEmployer._id,
    }
    let jobApply = await JobApplyService.getBy(getBy, fields);
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
  }
}

export const getEmployerJobApplys = async (source, args, context, info) => {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let page = args.page > 4000 ? 10 : args.page;

  let isAuthenticated = await authenticateEmployer(context, context.res);

  if (isAuthenticated) {
    let loggedEmployer = context.res.locals.fullEmployer;
    filter = Object.assign(filter, { employer: loggedEmployer._id });

    let jobApplys = await JobApplyService.filter(filter, args.limit, page, infos.edges);
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
  }
}


