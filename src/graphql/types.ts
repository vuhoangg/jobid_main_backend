import {GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";

export const PageInfo = new GraphQLObjectType({
    description: "Information to aid in pagination.",
    fields: {
        length: {type: GraphQLInt},
        hasNextPage: {type: GraphQLBoolean},
        hasPreviousPage: {type: GraphQLBoolean},
    },
    name: "PageInfo",
});

export const PaginationArguments = {
    filter: {type: new GraphQLNonNull(GraphQLString)},
    limit: {type: new GraphQLNonNull(GraphQLInt)},
    page: {type: new GraphQLNonNull(GraphQLInt)},
};

export const SpecificArgument = {
    _id: {type: new GraphQLNonNull(GraphQLString)},
};