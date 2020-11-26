import FacebookJobService from "../../../db/repositories/FacebookJobRepository";

import { filterObject, rootField, rootInfo } from "../../helpers";

export const getFacebookJob = (source, args, context, info) => {
  const fieldsRoot = rootField(info);

  let getBy = args._id ? { _id: args._id } : { slug: args.slug };


  return FacebookJobService.get(getBy, fieldsRoot).then((facebookJob) => {
    const dataFacebookJob = {
      _id: facebookJob._id,
      employer: facebookJob.employer,
      address: facebookJob.address,
      long_description: facebookJob.long_description,
      share_url: facebookJob.share_url,
      title: facebookJob.title,
      sub_title: facebookJob.sub_title,
      map: facebookJob.map,
      created_at: facebookJob.created_at,
      updated_at: facebookJob.updated_at,
    };
    return dataFacebookJob;
  });
};

export const getFacebookJobs = (source, args, context, info) => {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);

  return FacebookJobService.filter(filter, args.limit, args.page, infos.edges).then(async (facebookJobs) => {
    let edges = [];
    for (let i = 0; i < facebookJobs.length; i++) {
      let facebookJob = {
        cursor: facebookJobs[i]._id,
        node: {
          _id: facebookJobs[i]._id,
          employer: facebookJobs[i].employer,
          address: facebookJobs[i].address,
          long_description: facebookJobs[i].long_description,
          share_url: facebookJobs[i].share_url,
          title: facebookJobs[i].title,
          sub_title: facebookJobs[i].sub_title,
          map: facebookJobs[i].map,
          created_at: facebookJobs[i].created_at,
          updated_at: facebookJobs[i].updated_at,
        },
      };
      edges.push(facebookJob);
    }
    let countData = infos.pageInfo && infos.pageInfo.length ? await FacebookJobService.count(filter) : 0;
    const dataRet = {
      ...{ edges },
      pageInfo: {
        length: countData,
        hasNextPage: facebookJobs.length >= args.limit,
        hasPreviousPage: args.page > 1,
      },
    };
    return dataRet;
  });
};
