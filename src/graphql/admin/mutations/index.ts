import {GraphQLNonNull} from "graphql";
import {Admin, AdminInput} from "../types";
import {updateAdmin} from "../resolvers/update";

const adminMutations = {
    adminUpdate: {
        args: { input: { type: GraphQLNonNull(AdminInput) } },
        resolve: (source, args, context, info) => updateAdmin(source, args, context, info),
        type: new GraphQLNonNull(Admin),
    },
};
export default adminMutations;
