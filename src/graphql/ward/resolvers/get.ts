import WardService from "../../../db/repositories/WardRepository";

import { filterObject, rootField, rootInfo } from "../../helpers";
import { seoDescription } from "../../../helpers/seo";

export const getWard = (source, args, context, info) => {
  const fieldsRoot = rootField(info);

  let getBy = args._id ? { _id: args._id } : { slug: args.slug };


  return WardService.get(getBy, fieldsRoot).then((ward) => {
    const dataWard = {
      _id: ward._id,
      district: ward.district,
      description: ward.description,
      name: ward.name,
      slug: ward.slug,
      title: ward.title,
      image: ward.image,
      image_description: ward.image_description,
      seo_title: ward.seo_title ? ward.seo_title : ward.title,
      seo_description: ward.seo_description ? ward.seo_description : seoDescription(ward.description),
      focus_keyword: ward.focus_keyword,
      created_at: ward.created_at,
      updated_at: ward.updated_at,
    };
    return dataWard;
  });
};

export const getWards = (source, args, context, info) => {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);

  return WardService.filter(filter, args.limit, args.page, infos.edges).then(async (wards) => {
    let edges = [];
    for (let i = 0; i < wards.length; i++) {
      let ward = {
        cursor: wards[i]._id,
        node: {
          _id: wards[i]._id,
          district: wards[i].district,
          description: wards[i].description,
          name: wards[i].name,
          slug: wards[i].slug,
          title: wards[i].title,
          image: wards[i].image,
          image_description: wards[i].image_description,
          seo_title: wards[i].seo_title ? wards[i].seo_title : wards[i].title,
          seo_description: wards[i].seo_description ? wards[i].seo_description : seoDescription(wards[i].description),
          focus_keyword: wards[i].focus_keyword,
          created_at: wards[i].created_at,
          updated_at: wards[i].updated_at,
        },
      };
      edges.push(ward);
    }
    let countData = infos.pageInfo && infos.pageInfo.length ? await WardService.count(filter) : 0;
    const dataRet = {
      ...{ edges },
      pageInfo: {
        length: countData,
        hasNextPage: wards.length >= args.limit,
        hasPreviousPage: args.page > 1,
      },
    };
    return dataRet;
  });
};
