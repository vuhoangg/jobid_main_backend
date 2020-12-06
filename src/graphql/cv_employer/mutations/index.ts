import { GraphQLNonNull } from "graphql";
import { createCvEmployer, updateCvEmployer } from "../resolvers/update";
import { CvEmployer, CvEmployerInput } from "../types";

const cvEmployerMutations = {
  cvEmployerUpdate: {
    args: { input: { type: GraphQLNonNull(CvEmployerInput) } },
    resolve: (source, args, context, info) => updateCvEmployer(source, args, context, info),
    type: new GraphQLNonNull(CvEmployer),
  },
  cvEmployerCreate: {
    args: { input: { type: GraphQLNonNull(CvEmployerInput) } },
    resolve: (source, args, context, info) => createCvEmployer(source, args, context, info),
    type: new GraphQLNonNull(CvEmployer),
  },
};
export default cvEmployerMutations;
