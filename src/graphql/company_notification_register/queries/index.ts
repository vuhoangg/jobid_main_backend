import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import { getCompanyNotificationRegister, getCompanyNotificationRegisters } from "../resolvers/get";
import { CompanyNotificationRegister, CompanyNotificationRegisterArguments, CompanyNotificationRegisterConnection } from "../types";

const companyNotificationRegisterQueries = {
    companyNotificationRegister: {
        args: CompanyNotificationRegisterArguments,
        resolve: (source, args, context, info) => getCompanyNotificationRegister(source, args, context, info),
        type: CompanyNotificationRegister,
    },
    companyNotificationRegisters: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getCompanyNotificationRegisters(source, args, context, info),
        type: new GraphQLNonNull(CompanyNotificationRegisterConnection),
    }
};
export default companyNotificationRegisterQueries;
