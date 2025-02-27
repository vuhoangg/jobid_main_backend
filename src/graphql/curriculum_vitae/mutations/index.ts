import { GraphQLNonNull, GraphQLString } from "graphql";
import { CurriculumVitae, CurriculumVitaeInput } from "../types";
import { createCurriculumVitae, updateCurriculumVitae } from "../resolvers/update";

const curriculumVitaeMutations = {
  curriculumVitaeUpdate: {
    args: { input: { type: GraphQLNonNull(CurriculumVitaeInput) } },
    resolve: (source, args, context, info) => updateCurriculumVitae(source, args, context, info),
    type: new GraphQLNonNull(CurriculumVitae),
  },
  curriculumVitaeCreate: {
    args: { input: { type: GraphQLNonNull(CurriculumVitaeInput) } },
    resolve: (source, args, context, info) => createCurriculumVitae(source, args, context, info),
    type: new GraphQLNonNull(CurriculumVitae),
  },
};
export default curriculumVitaeMutations;
