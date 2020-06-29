import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import { getCurriculumVitae, getCurriculumVitaes } from "../resolvers/get";
import { CurriculumVitae, CurriculumVitaeConnection, CurriculumVitaeArguments } from "../types/index";

const curriculumVitaeQueries = {
  curriculumVitae: {
    args: CurriculumVitaeArguments,
    resolve: (source, args, context, info) => getCurriculumVitae(source, args, context, info),
    type: new GraphQLNonNull(CurriculumVitae),
  },
  curriculumVitaes: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getCurriculumVitaes(source, args, context, info),
    type: new GraphQLNonNull(CurriculumVitaeConnection),
  },
};
export default curriculumVitaeQueries;
