import { GraphQLNonNull } from "graphql";
import { PaginationArguments } from "../../types";
import { getEmployer, getEmployers } from "../resolvers/get";
import { Employer, EmployerArguments, EmployerConnection } from "../types";

const employerQueries = {
    employer: {
        args: EmployerArguments,
        resolve: (source, args, context, info) => getEmployer(source, args, context, info),
        type: new GraphQLNonNull(Employer),
    },
    employers: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getEmployers(source, args, context, info),
        type: new GraphQLNonNull(EmployerConnection),
    }
};
export default employerQueries;