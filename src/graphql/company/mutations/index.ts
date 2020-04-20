import {GraphQLNonNull} from "graphql";
import {Company, CompanyInput} from "../types";
import {createCompany, updateCompany} from "../resolvers/update";

const companyMutations = {
    companyUpdate: {
        args: {input: {type: GraphQLNonNull(CompanyInput)}},
        resolve: (source, args, context, info) => updateCompany(source, args, context, info),
        type: new GraphQLNonNull(Company),
    },
    companyCreate: {
        args: {input: {type: GraphQLNonNull(CompanyInput)}},
        resolve: (source, args, context, info) => createCompany(source, args, context, info),
        type: new GraphQLNonNull(Company),
    },
};
export default companyMutations;