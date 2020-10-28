import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import { getCompanyView, getCompanyViews } from "../resolvers/get";
import { CompanyView, CompanyViewArguments, CompanyViewConnection } from "../types";

const companyViewQueries = {
  companyView: {
    args: CompanyViewArguments,
    resolve: (source, args, context, info) => getCompanyView(source, args, context, info),
    type: new GraphQLNonNull(CompanyView),
  },
  companyViews: {
    args: PaginationArguments,
    resolve: (source, args, context, info) => getCompanyViews(source, args, context, info),
    type: new GraphQLNonNull(CompanyViewConnection),
  }
};
export default companyViewQueries;
