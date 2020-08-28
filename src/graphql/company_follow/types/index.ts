import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} from "graphql";
import {PageInfo} from "../../types";
import {User} from "../../user/types";
import {JobPost} from "../../job_post/types";
import {Company} from "../../company/types";

export const CompanyFollow = new GraphQLObjectType({
  description: "Represents a company follow.",
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    company: {type: Company},
    user: {type: User},
    created_at: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "CompanyFollow",
});
export const CompanyFollowEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "The item at the end of CompanyFollowEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(CompanyFollow),
    },
  },
  name: "CompanyFollowEdge",
});
export const CompanyFollowConnection = new GraphQLObjectType({
  description: "List of company follows.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(CompanyFollowEdge)),
    },
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "CompanyFollowConnection",
});

export const CompanyFollowInput = new GraphQLInputObjectType({
  fields: {
    company: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "CompanyFollowInput",
  description: "The updated properties for a company follow.",
});

export const CompanyFollowArguments = {
  _id: {type: GraphQLString},
  company: {type: GraphQLString}
};
