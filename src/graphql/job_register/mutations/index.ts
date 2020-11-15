import { GraphQLNonNull } from "graphql";
import { JobRegister, JobRegisterInput } from "../types";
import { createJobRegister, updateJobRegister } from "../resolvers/update";

const jobRegisterMutations = {
    jobRegisterUpdate: {
        args: { input: { type: GraphQLNonNull(JobRegisterInput) } },
        resolve: (source, args, context, info) => updateJobRegister(source, args, context, info),
        type: new GraphQLNonNull(JobRegister),
    },
    jobRegisterCreate: {
        args: { input: { type: GraphQLNonNull(JobRegisterInput) } },
        resolve: (source, args, context, info) => createJobRegister(source, args, context, info),
        type: new GraphQLNonNull(JobRegister),
    },
};
export default jobRegisterMutations;
