import { GraphQLNonNull } from "graphql";
import { AssignPermissionInput, AssignPermissionOnput, Company, CompanyInput, CompanyTrackingBySlug, CompanyTrackingBySlugInput } from "../types";
import { assignPermission, createCompany, premiumCompany, trackingBySlug, updateCompany, verifyCompany } from "../resolvers/update";

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
  companyVerifyUpdate: {
    args: { input: { type: GraphQLNonNull(CompanyInput) } },
    resolve: (source, args, context, info) => verifyCompany(source, args, context, info),
    type: new GraphQLNonNull(Company),
  },
  companyPremiumUpdate: {
    args: { input: { type: GraphQLNonNull(CompanyInput) } },
    resolve: (source, args, context, info) => premiumCompany(source, args, context, info),
    type: new GraphQLNonNull(Company),
  },
  companyTrackingBySlug: {
    args: { input: { type: GraphQLNonNull(CompanyTrackingBySlugInput) } },
    resolve: (source, args, context, info) => trackingBySlug(source, args, context, info),
    type: new GraphQLNonNull(CompanyTrackingBySlug),
  }
};
export default companyMutations;
