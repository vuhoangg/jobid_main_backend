import CityService from "../../../db/repositories/CityRepository";

import { filterObject, rootField, rootInfo } from "../../helpers";
import { seoDescription } from "../../../helpers/seo";

export const getCity = (source, args, context, info) => {
  const fieldsRoot = rootField(info);

  let getBy = args._id ? { _id: args._id } : { slug: args.slug };


  return CityService.get(getBy, fieldsRoot).then((city) => {
    const dataCity = {
      _id: city._id,
      description: city.description,
      name: city.name,
      slug: city.slug,
      title: city.title,
      image: city.image,
      image_description: city.image_description,
      seo_title: city.seo_title ? city.seo_title : city.title,
      seo_description: city.seo_description ? city.seo_description : seoDescription(city.description),
      focus_keyword: city.focus_keyword,
      created_at: city.created_at,
      updated_at: city.updated_at,
    };
    return dataCity;
  });
};

export const getCitys = (source, args, context, info) => {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);

  return CityService.filter(filter, args.limit, args.page, infos.edges).then(async (citys) => {
    let edges = [];
    for (let i = 0; i < citys.length; i++) {
      let city = {
        cursor: citys[i]._id,
        node: {
          _id: citys[i]._id,
          description: citys[i].description,
          name: citys[i].name,
          slug: citys[i].slug,
          title: citys[i].title,
          image: citys[i].image,
          image_description: citys[i].image_description,
          seo_title: citys[i].seo_title ? citys[i].seo_title : citys[i].title,
          seo_description: citys[i].seo_description ? citys[i].seo_description : seoDescription(citys[i].description),
          focus_keyword: citys[i].focus_keyword,
          created_at: citys[i].created_at,
          updated_at: citys[i].updated_at,
        },
      };
      edges.push(city);
    }
    let countData = infos.pageInfo && infos.pageInfo.length ? await CityService.count(filter) : 0;
    const dataRet = {
      ...{ edges },
      pageInfo: {
        length: countData,
        hasNextPage: citys.length >= args.limit,
        hasPreviousPage: args.page > 1,
      },
    };
    return dataRet;
  });
};
