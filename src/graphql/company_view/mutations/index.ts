import { GraphQLNonNull } from "graphql";
import { CompanyView, CompanyViewInput } from "../types";
import { updateCompanyView } from "../resolvers/update";

const companyViewMutations = {
  companyViewUpdate: {
    args: { input: { type: GraphQLNonNull(CompanyViewInput) } },
    resolve: (source, args, context, info) => updateCompanyView(source, args, context, info),
    type: new GraphQLNonNull(CompanyView),
  },
};
export default companyViewMutations;
