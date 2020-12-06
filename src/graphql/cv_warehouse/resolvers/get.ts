import CvWarehouseService from "../../../db/repositories/CvWarehouseRepository";

import { filterObject, rootField, rootInfo } from "../../helpers";
import { seoDescription } from "../../../helpers/seo";

export const getCvWarehouse = (source, args, context, info) => {
  const fieldsRoot = rootField(info);

  let getBy = args._id ? { _id: args._id } : { slug: args.slug };

  return CvWarehouseService.get(getBy, fieldsRoot).then((cvWarehouse) => {
    const dataCvWarehouse = {
      _id: cvWarehouse._id,
      employer: cvWarehouse.employer,
      thumnail: cvWarehouse.thumnail,
      title: cvWarehouse.title,
      description: cvWarehouse.description,
      access: cvWarehouse.access,
      status: cvWarehouse.status,
      created_at: cvWarehouse.created_at,
      updated_at: cvWarehouse.updated_at,
    };
    return dataCvWarehouse;
  });
};

export const getCvWarehouses = (source, args, context, info) => {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);

  return CvWarehouseService.filter(filter, args.page, args.limit, infos.edges).then(async (cvWarehouses) => {
    let edges = [];
    for (let i = 0; i < cvWarehouses.length; i++) {
      let cvWarehouse = {
        cursor: cvWarehouses[i]._id,
        node: {
          _id: cvWarehouses[i]._id,
          employer: cvWarehouses[i].employer,
          thumnail: cvWarehouses[i].thumnail,
          title: cvWarehouses[i].title,
          description: cvWarehouses[i].description,
          access: cvWarehouses[i].access,
          status: cvWarehouses[i].status,
          created_at: cvWarehouses[i].created_at,
          updated_at: cvWarehouses[i].updated_at,
        },
      };
      edges.push(cvWarehouse);
    }
    let countData = infos.pageInfo && infos.pageInfo.length ? await CvWarehouseService.count(filter) : 0;
    const dataRet = {
      ...{ edges },
      pageInfo: {
        length: countData,
        hasNextPage: cvWarehouses.length >= args.limit,
        hasPreviousPage: args.page > 1,
      },
    };
    return dataRet;
  });
};
