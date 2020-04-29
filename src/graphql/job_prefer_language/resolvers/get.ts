import JobPreferLanguageService from "../../../db/repositories/JobPreferLanguageRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getJobPreferLanguage(source, args, context, info) {
  const fields = rootField(info);
  let _id = args._id ? args._id : context.jobPreferLanguage._id;
  return JobPreferLanguageService.get(_id, fields)
    .then(async (jobPreferLanguage) => {
      let node = {
        _id: jobPreferLanguage._id,
        vi_title: jobPreferLanguage.vi_title,
        en_title: jobPreferLanguage.en_title,
        vi_slug: jobPreferLanguage.vi_slug,
        en_slug: jobPreferLanguage.en_slug,
        seo_title: jobPreferLanguage.seo_title,
        seo_description: jobPreferLanguage.seo_description,
        created_at: jobPreferLanguage.created_at,
        updated_at: jobPreferLanguage.updated_at,
      };
      return node;
    });
}

export function getJobPreferLanguages(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  return JobPreferLanguageService.filter(filter, args.limit, args.page, infos.edges)
    .then(async (jobPreferLanguages) => {
      let edges = [];
      for (let i = 0; i < jobPreferLanguages.length; i++) {
        let jobPreferLanguage = {
          cursor: jobPreferLanguages[i]._id,
          node: {
            _id: jobPreferLanguages[i]._id,
            vi_title: jobPreferLanguages[i].vi_title,
            en_title: jobPreferLanguages[i].en_title,
            vi_slug: jobPreferLanguages[i].vi_slug,
            en_slug: jobPreferLanguages[i].en_slug,
            seo_title: jobPreferLanguages[i].seo_title,
            seo_description: jobPreferLanguages[i].seo_description,
            created_at: jobPreferLanguages[i].created_at,
            updated_at: jobPreferLanguages[i].updated_at,
          }
        };
        edges.push(jobPreferLanguage);
      }
      let countData = (infos.pageInfo && infos.pageInfo.length) ? await JobPreferLanguageService.count(filter) : 0;
      let dataRet = {
        ...{edges},
        pageInfo: {
          length: countData,
          hasNextPage: jobPreferLanguages.length >= args.limit,
          hasPreviousPage: args.page > 1
        }
      };
      return dataRet;
    });
}
