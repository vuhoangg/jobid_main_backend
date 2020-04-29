import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {PageInfo} from "../../types";
import {User} from "../../user/types";
import {JobPost} from "../../job_post/types";

export const JobView = new GraphQLObjectType({
  description: "Represents a job view.",
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    job_post: {type: JobPost},
    user: {type: User},
    created_at: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "JobView",
});
export const JobViewEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "The item at the end of JobViewEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(JobView),
    },
  },
  name: "JobViewEdge",
});
export const JobViewConnection = new GraphQLObjectType({
  description: "List of job views.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(JobViewEdge)),
    },
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "JobViewConnection",
});

export const JobViewInput = new GraphQLInputObjectType({
  fields: {
    job_post: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "JobViewInput",
  description: "The updated properties for a job view.",
});

export const JobViewArguments = {
  _id: {type: new GraphQLNonNull(GraphQLString)},
};
