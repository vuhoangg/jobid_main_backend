import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import { getCompanyFeature, getCompanyFeatures } from "../resolvers/get";
import { CompanyFeature, CompanyFeatureArguments, CompanyFeatureConnection } from "../types";

const companyFeatureQueries = {
  companyFeature: {
    args: CompanyFeatureArguments,
    resolve: (source, args, context, info) => getCompanyFeature(source, args, context, info),
    type: new GraphQLNonNull(CompanyFeature),
  },
  companyFeatures: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getCompanyFeatures(source, args, context, info),
    type: new GraphQLNonNull(CompanyFeatureConnection),
  },
};
export default companyFeatureQueries;
