import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { PageInfo } from "../../types";
import { User } from "../../user/types";
import { Company } from "../../company/types";

export const CompanyView = new GraphQLObjectType({
  description: "Represents a company view.",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    company: { type: Company },
    user: { type: User },
    created_at: { type: new GraphQLNonNull(GraphQLString) },
    updated_at: { type: new GraphQLNonNull(GraphQLString) },
  },
  name: "CompanyView",
});
export const CompanyViewEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: {
      description: "The item at the end of CompanyViewEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(CompanyView),
    },
  },
  name: "CompanyViewEdge",
});
export const CompanyViewConnection = new GraphQLObjectType({
  description: "List of company views.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(CompanyViewEdge)),
    },
    pageInfo: { type: new GraphQLNonNull(PageInfo) },
  },
  name: "CompanyViewConnection",
});

export const CompanyViewInput = new GraphQLInputObjectType({
  fields: {
    company: { type: new GraphQLNonNull(GraphQLString) },
  },
  name: "CompanyViewInput",
  description: "The updated properties for a company view.",
});

export const CompanyViewArguments = {
  _id: { type: new GraphQLNonNull(GraphQLString) },
};
