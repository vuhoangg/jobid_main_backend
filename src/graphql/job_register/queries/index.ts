import { GraphQLNonNull } from "graphql";
import { PaginationArguments, SpecificArgument } from "../../types";
import { getJobRegister, getJobRegisters } from "../resolvers/get";
import { JobRegister, JobRegisterArguments, JobRegisterConnection } from "../types";

const jobRegisterQueries = {
    jobRegister: {
        args: JobRegisterArguments,
        resolve: (source, args, context, info) => getJobRegister(source, args, context, info),
        type: new GraphQLNonNull(JobRegister),
    },
    jobRegisters: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getJobRegisters(source, args, context, info),
        type: new GraphQLNonNull(JobRegisterConnection),
    }
};
export default jobRegisterQueries;
