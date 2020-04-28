import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {PageInfo} from "../../types";

export const Activity = new GraphQLObjectType({
  description: "Represents a activity.",
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    vi_message: {type: GraphQLString},
    en_message: {type: GraphQLString},
    href_type: {type: GraphQLString},
    href_url: {type: GraphQLString},
    created_at: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "Activity",
});
export const ActivityEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "The item at the end of ActivityEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(Activity),
    },
  },
  name: "ActivityEdge",
});
export const ActivityConnection = new GraphQLObjectType({
  description: "List of activitys.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(ActivityEdge)),
    },
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "ActivityConnection",
});
