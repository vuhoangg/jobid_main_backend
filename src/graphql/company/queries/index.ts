import {GraphQLNonNull} from "graphql";
import {PaginationArguments, SpecificArgument} from "../../types";
import {getCompany, getCompanys} from "../resolvers/get";
import {Company, CompanyArguments, CompanyConnection} from "../types";

const companyQueries = {
    company: {
        args: CompanyArguments,
        resolve: (source, args, context, info) => getCompany(source, args, context, info),
        type: new GraphQLNonNull(Company),
    },
    companys: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getCompanys(source, args, context, info),
        type: new GraphQLNonNull(CompanyConnection),
    }
};
export default companyQueries;