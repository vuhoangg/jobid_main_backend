import { GraphQLNonNull } from "graphql";
import { CompanyNotificationRegister, CompanyNotificationRegisterInput } from "../types";
import { createCompanyNotificationRegister, deleteCompanyNotificationRegister } from "../resolvers/update";

const companyNotificationRegisterMutations = {
    companyNotificationRegisterCreate: {
        args: { input: { type: GraphQLNonNull(CompanyNotificationRegisterInput) } },
        resolve: (source, args, context, info) => createCompanyNotificationRegister(source, args, context, info),
        type: CompanyNotificationRegister,
    },
    companyNotificationRegisterDelete: {
        args: { input: { type: GraphQLNonNull(CompanyNotificationRegisterInput) } },
        resolve: (source, args, context, info) => deleteCompanyNotificationRegister(source, args, context, info),
        type: CompanyNotificationRegister,
    },
};
export default companyNotificationRegisterMutations;
