import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {PageInfo} from "../../types";
import {User} from "../../user/types";

export const CandidateFile = new GraphQLObjectType({
  name: "CandidateFile",
  fields: {
    name: {type: GraphQLString},
    url: {type: GraphQLString},
  },
  description: "Represents a candidate file.",
});

export const CandidateFileInput = new GraphQLInputObjectType({
  name: "CandidateFileInput",
  fields: {
    name: {type: GraphQLString},
    url: {type: GraphQLString},
  },
  description: "The updated properties for a candidate file.",
});

export const Candidate = new GraphQLObjectType({
  description: "Represents a candidate.",
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    interest: {type: new GraphQLList(GraphQLString)},
    job_open: {type: GraphQLBoolean},
    user: {type: User},
    cv: {type: GraphQLString},
    photos: {type: new GraphQLList(GraphQLString)},
    files: {type: new GraphQLList(CandidateFile)},
    created_at: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "Candidate",
});
export const CandidateEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "The item at the end of CandidateEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(Candidate),
    },
  },
  name: "CandidateEdge",
});
export const CandidateConnection = new GraphQLObjectType({
  description: "List of candidates.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(CandidateEdge)),
    },
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "CandidateConnection",
});

export const CandidateInput = new GraphQLInputObjectType({
  fields: {
    _id: {type: GraphQLString},
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    interest: {type: new GraphQLList(GraphQLString)},
    job_open: {type: GraphQLBoolean},
    user: {type: GraphQLString},
    cv: {type: GraphQLString},
    photos: {type: new GraphQLList(GraphQLString)},
    files: {type: new GraphQLList(CandidateFileInput)},
  },
  name: "CandidateInput",
  description: "The updated properties for a candidate.",
});

export const CandidateArguments = {
  _id: {type: new GraphQLNonNull(GraphQLString)},
};
