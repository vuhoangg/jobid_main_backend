import {
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLFloat,
} from "graphql";

export const AddressLatLng = new GraphQLObjectType({
    name: "AddressLatLng",
    fields: {
        address: { type: GraphQLString },
        full_address: { type: GraphQLString },
        lat: { type: GraphQLFloat },
        lng: { type: GraphQLFloat },
    }
});

export const AddressLatLngArguments = {
    search: { type: new GraphQLNonNull(GraphQLString) },
};