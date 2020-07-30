import {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
  } from "graphql";
  import { PageInfo } from "../../types";
  import { User } from "../../user/types";
  
  export const CompanyRating = new GraphQLObjectType({
    description: "Represents a company rating reply.",
    fields: {
      _id: { type: new GraphQLNonNull(GraphQLString) },
      user: { type: User },
      company: { type: GraphQLString },
      rat_value: { type: GraphQLInt },
      rat_comment: { type: GraphQLString },
      created_at: { type: GraphQLString },
      updated_at: { type: GraphQLString },
    },
    name: "CompanyRating",
  });
  export const CompanyRatingEdge = new GraphQLObjectType({
    description: "A list of edges.",
    fields: {
      cursor: { type: new GraphQLNonNull(GraphQLString) },
      node: {
        description: "The item at the end of CompanyRatingEdge.",
        resolve: (parent) => parent.node,
        type: new GraphQLNonNull(CompanyRating),
      },
    },
    name: "CompanyRatingEdge",
  });
  export const CompanyRatingConnection = new GraphQLObjectType({
    description: "List of company ratings.",
    fields: {
      edges: {
        resolve: (parent) => parent.edges,
        type: new GraphQLNonNull(new GraphQLList(CompanyRatingEdge)),
      },
      pageInfo: { type: new GraphQLNonNull(PageInfo) },
    },
    name: "CompanyRatingConnection",
  });
  
  export const CompanyRatingInput = new GraphQLInputObjectType({
    fields: {
      _id: { type: GraphQLString },
      user: { type: GraphQLString },
      company: { type: GraphQLString },
      rat_value: { type: GraphQLInt },
      rat_comment: { type: GraphQLString },
    },
    name: "CompanyRatingInput",
    description: "The updated properties for a company rating input.",
  });
  
  export const CompanyRatingArguments = {
    _id: { type: GraphQLString },
    company: { type: GraphQLString },
  };
  