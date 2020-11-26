import DistrictService from "../../../db/repositories/DistrictRepository";

import { filterObject, rootField, rootInfo } from "../../helpers";
import { seoDescription } from "../../../helpers/seo";

export const getDistrict = (source, args, context, info) => {
  const fieldsRoot = rootField(info);

  let getBy = args._id ? { _id: args._id } : { slug: args.slug };


  return DistrictService.get(getBy, fieldsRoot).then((district) => {
    const dataDistrict = {
      _id: district._id,
      city: district.city,
      description: district.description,
      name: district.name,
      slug: district.slug,
      title: district.title,
      image: district.image,
      image_description: district.image_description,
      seo_title: district.seo_title ? district.seo_title : district.title,
      seo_description: district.seo_description ? district.seo_description : seoDescription(district.description),
      focus_keyword: district.focus_keyword,
      created_at: district.created_at,
      updated_at: district.updated_at,
    };
    return dataDistrict;
  });
};

export const getDistricts = (source, args, context, info) => {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);

  return DistrictService.filter(filter, args.limit, args.page, infos.edges).then(async (districts) => {
    let edges = [];
    for (let i = 0; i < districts.length; i++) {
      let district = {
        cursor: districts[i]._id,
        node: {
          _id: districts[i]._id,
          city: districts[i].city,
          description: districts[i].description,
          name: districts[i].name,
          slug: districts[i].slug,
          title: districts[i].title,
          image: districts[i].image,
          image_description: districts[i].image_description,
          seo_title: districts[i].seo_title ? districts[i].seo_title : districts[i].title,
          seo_description: districts[i].seo_description ? districts[i].seo_description : seoDescription(districts[i].description),
          focus_keyword: districts[i].focus_keyword,
          created_at: districts[i].created_at,
          updated_at: districts[i].updated_at,
        },
      };
      edges.push(district);
    }
    let countData = infos.pageInfo && infos.pageInfo.length ? await DistrictService.count(filter) : 0;
    const dataRet = {
      ...{ edges },
      pageInfo: {
        length: countData,
        hasNextPage: districts.length >= args.limit,
        hasPreviousPage: args.page > 1,
      },
    };
    return dataRet;
  });
};
