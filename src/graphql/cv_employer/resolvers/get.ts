import CvEmployerService from "../../../db/repositories/CvEmployerRepository";

import { filterObject, rootField, rootInfo } from "../../helpers";
import { seoDescription } from "../../../helpers/seo";

export const getCvEmployer = (source, args, context, info) => {
  const fieldsRoot = rootField(info);

  let getBy = args._id ? { _id: args._id } : { slug: args.slug };

  return CvEmployerService.get(getBy, fieldsRoot).then((cvEmployer) => {
    const dataCvEmployer = {
      _id: cvEmployer._id,
      cv_warehouse: cvEmployer.cv_warehouse,
      title: cvEmployer.title,
      origin_url: cvEmployer.origin_url,
      name: cvEmployer.name,
      email: cvEmployer.email,
      phone: cvEmployer.phone,
      birthday: cvEmployer.birthday,
      gender: cvEmployer.gender,
      num_experience: cvEmployer.num_experience,
      skill: cvEmployer.skill,
      position: cvEmployer.position,
      city: cvEmployer.city,
      job_level: cvEmployer.job_level,
      job_type: cvEmployer.job_type,
      created_at: cvEmployer.created_at,
      updated_at: cvEmployer.updated_at,
    };
    return dataCvEmployer;
  });
};

export const getCvEmployers = (source, args, context, info) => {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);

  return CvEmployerService.filter(filter, args.page, args.limit, infos.edges).then(async (cvEmployers) => {
    let edges = [];
    for (let i = 0; i < cvEmployers.length; i++) {
      let cvEmployer = {
        cursor: cvEmployers[i]._id,
        node: {
          _id: cvEmployers[i]._id,
          cv_warehouse: cvEmployers[i].cv_warehouse,
          title: cvEmployers[i].title,
          origin_url: cvEmployers[i].origin_url,
          name: cvEmployers[i].name,
          email: cvEmployers[i].email,
          phone: cvEmployers[i].phone,
          birthday: cvEmployers[i].birthday,
          gender: cvEmployers[i].gender,
          num_experience: cvEmployers[i].num_experience,
          skill: cvEmployers[i].skill,
          position: cvEmployers[i].position,
          city: cvEmployers[i].city,
          job_level: cvEmployers[i].job_level,
          job_type: cvEmployers[i].job_type,
          created_at: cvEmployers[i].created_at,
          updated_at: cvEmployers[i].updated_at,
        },
      };
      edges.push(cvEmployer);
    }
    let countData = infos.pageInfo && infos.pageInfo.length ? await CvEmployerService.count(filter) : 0;
    const dataRet = {
      ...{ edges },
      pageInfo: {
        length: countData,
        hasNextPage: cvEmployers.length >= args.limit,
        hasPreviousPage: args.page > 1,
      },
    };
    return dataRet;
  });
};
