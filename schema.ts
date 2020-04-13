import {
    GraphQLSchema,
} from "graphql";

import Mutation from "./graphql/mutation";
import QueryRoot from "./graphql/query";

const AppSchema = new GraphQLSchema({
    mutation: Mutation,
    query: QueryRoot,
    // If you need to create or update a data source,
    // you use mutations. Note:
    // mutations will not be explored in this post.
});

export default AppSchema;
