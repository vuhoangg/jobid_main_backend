import { GraphQLObjectType } from "graphql";
import userMutations from "./user/mutations";

const Mutation = new GraphQLObjectType({
    fields: {
        ...userMutations,
    },
    name: "Mutation",
});
export default Mutation;