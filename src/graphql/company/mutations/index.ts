import { GraphQLNonNull, GraphQLString } from "graphql";
import { Company, CompanyInput, AssignPermissionInput, AssignPermissionOnput } from "../types";
import { createCompany, updateCompany, assignPermission } from "../resolvers/update";

const companyMutations = {
  companyUpdate: {
    args: { input: { type: GraphQLNonNull(CompanyInput) } },
    resolve: (source, args, context, info) => updateCompany(source, args, context, info),
    type: new GraphQLNonNull(Company),
  },
  companyCreate: {
    args: { input: { type: GraphQLNonNull(CompanyInput) } },
    resolve: (source, args, context, info) => createCompany(source, args, context, info),
    type: new GraphQLNonNull(Company),
  },
  assignPermission: {
    args: { input: { type: GraphQLNonNull(AssignPermissionInput) } },
    resolve: (source, args, context, info) => assignPermission(source, args, context, info),
    type: AssignPermissionOnput,
  },
};
export default companyMutations;
