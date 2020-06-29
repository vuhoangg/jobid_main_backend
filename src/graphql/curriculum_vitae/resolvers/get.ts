import { filterObject, rootField, rootInfo } from "../../helpers";
import CurriculumVitaeService from "../../../db/repositories/CurriculumVitaeRepository";

export function getCurriculumVitae(source, args, context, info) {
  if (context.isAuthenticated()) {
    const fields = rootField(info);
    return CurriculumVitaeService.get({ _id: args._id, user_created: context.user._id, status: "active" }, fields).then(
      async (curriculumVitae) => {
        return curriculumVitae;
      }
    );
  }
}

export function getCurriculumVitaes(source, args, context, info) {
  if (context.isAuthenticated()) {
    let infos = rootInfo(info);
    let filter = { user_created: context.user._id, status: "active", ...filterObject(args.filter) };
    let page = args.page > 50 ? 10 : args.page;
    return CurriculumVitaeService.filter(filter, args.limit, page, infos.edges).then(async (curriculumVitae) => {
      let countData = infos.pageInfo && infos.pageInfo.length ? await CurriculumVitaeService.count(filter) : 0;
      let dataRet = {
        edges: curriculumVitae.map((item: any) => ({
          cursor: item._id,
          node: item,
        })),
        pageInfo: {
          length: countData,
          hasNextPage: curriculumVitae.length >= args.limit,
          hasPreviousPage: page > 1,
        },
      };
      return dataRet;
    });
  }
}
