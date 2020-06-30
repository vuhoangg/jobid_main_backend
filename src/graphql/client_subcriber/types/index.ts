import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
  } from "graphql";
  import {PageInfo} from "../../types";
  
  export const ClientSubcriber = new GraphQLObjectType({
    description: "Represents a ClientSubcriber.",
    fields: {
      _id: {type: new GraphQLNonNull(GraphQLString)},
      clientId: {type: GraphQLString},
      location: {type: GraphQLString},
      browser: {type: GraphQLString},
      created_at: {type: new GraphQLNonNull(GraphQLString)},
      updated_at: {type: new GraphQLNonNull(GraphQLString)},
    },
    name: "ClientSubcriber",
  });
  export const ClientSubcriberEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
      cursor: {type: new GraphQLNonNull(GraphQLString)},
      node: {
        description: "The item at the end of ClientSubcriberEdge.",
        resolve: (parent) => parent.node,
        type: new GraphQLNonNull(ClientSubcriber),
      },
    },
    name: "ClientSubcriberEdge",
  });
  export const ClientSubcriberConnection = new GraphQLObjectType({
    description: "List of ClientSubcribers.",
    fields: {
      edges: {
        resolve: (parent) => parent.edges,
        type: new GraphQLNonNull(new GraphQLList(ClientSubcriberEdge)),
      },
      pageInfo: {type: new GraphQLNonNull(PageInfo)},
    },
    name: "ClientSubcriberConnection",
  });
  export const ClientSubcriberInput = new GraphQLInputObjectType({
    fields: {
      _id: {type: GraphQLString},
      clientId: {type: GraphQLString},
      location: {type: GraphQLString},
      browser: {type: GraphQLString}
    },
    name: "ClientSubcriberInput",
    description: "The updated properties for a ClientSubcriberInput.",
  });
  
  export const ClientSubcriberArguments = {
    _id: {type: new GraphQLNonNull(GraphQLString)},
  };