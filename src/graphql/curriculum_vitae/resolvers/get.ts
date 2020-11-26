import { filterObject, rootField, rootInfo } from "../../helpers";
import CurriculumVitaeService from "../../../db/repositories/CurriculumVitaeRepository";
import { authenticateUser } from "../../../middlewares/authenticate";

export const getCurriculumVitae = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    const fields = rootField(info);
    return CurriculumVitaeService.get(
      { _id: args._id, user_created: context.res.locals.fullUser._id, status: "active" },
      fields
    ).then(async (curriculumVitae) => {
      return curriculumVitae;
    });
  }
};

export const getCurriculumVitaes = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let infos = rootInfo(info);
    let filter = { user_created: context.res.locals.fullUser._id, status: "active", ...filterObject(args.filter) };
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    return CurriculumVitaeService.filter(filter, limit, page, infos.edges).then(async (curriculumVitae) => {
      let countData = infos.pageInfo && infos.pageInfo.length ? await CurriculumVitaeService.count(filter) : 0;
      let dataRet = {
        edges: curriculumVitae.map((item: any) => ({
          cursor: item._id,
          node: item,
        })),
        pageInfo: {
          length: countData,
          hasNextPage: curriculumVitae.length >= limit,
          hasPreviousPage: page > 1,
        },
      };
      return dataRet;
    });
  }
};
