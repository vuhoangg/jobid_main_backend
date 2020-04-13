import { GraphQLObjectType } from "graphql";
import userQueries from "./user/queries";

const QueryRoot = new GraphQLObjectType({
    fields: {
        ...userQueries,
    },
    name: "QueryRoot",
});
export default QueryRoot;