import { GraphQLNonNull } from "graphql";
import { PaginationArguments } from "../../types";
import { getAdmin, getAdmins } from "../resolvers/get";
import { Admin, AdminArguments, AdminConnection } from "../types";

const adminQueries = {
    admin: {
        args: AdminArguments,
        resolve: (source, args, context, info) => getAdmin(source, args, context, info),
        type: new GraphQLNonNull(Admin),
    },
    admins: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getAdmins(source, args, context, info),
        type: new GraphQLNonNull(AdminConnection),
    }
};
export default adminQueries;
