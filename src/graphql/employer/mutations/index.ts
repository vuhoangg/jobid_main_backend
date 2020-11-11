import { GraphQLNonNull } from "graphql";
import { Employer, EmployerInput } from "../types";
import { markSpam, removeSpam, updateEmployer } from "../resolvers/update";

const employerMutations = {
    employerUpdate: {
        args: { input: { type: GraphQLNonNull(EmployerInput) } },
        resolve: (source, args, context, info) => updateEmployer(source, args, context, info),
        type: new GraphQLNonNull(Employer),
    },

    employerMarkSpam: {
        args: { input: { type: GraphQLNonNull(EmployerInput) } },
        resolve: (source, args, context, info) => markSpam(source, args, context, info),
        type: new GraphQLNonNull(Employer),
    },
    employerRemoveSpam: {
        args: { input: { type: GraphQLNonNull(EmployerInput) } },
        resolve: (source, args, context, info) => removeSpam(source, args, context, info),
        type: new GraphQLNonNull(Employer),
    }
};
export default employerMutations;
