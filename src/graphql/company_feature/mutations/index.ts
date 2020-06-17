import { GraphQLNonNull } from "graphql";
import { CompanyFeature, CompanyFeatureInput } from "../types";
import { createCompanyFeature, updateCompanyFeature } from "../resolvers/update";

const companyFeatureMutations = {
  companyFeatureUpdate: {
    args: { input: { type: GraphQLNonNull(CompanyFeatureInput) } },
    resolve: (source, args, context, info) => updateCompanyFeature(source, args, context, info),
    type: new GraphQLNonNull(CompanyFeature),
  },
  companyFeatureCreate: {
    args: { input: { type: GraphQLNonNull(CompanyFeatureInput) } },
    resolve: (source, args, context, info) => createCompanyFeature(source, args, context, info),
    type: new GraphQLNonNull(CompanyFeature),
  },
};
export default companyFeatureMutations;
