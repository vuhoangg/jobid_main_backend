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

export const JobAlert = new GraphQLObjectType({
  description: "Represents a job alert.",
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    job_post: {type: JobPost},
    user: {type: User},
    created_at: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "JobAlert",
});
export const JobAlertEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "The item at the end of JobAlertEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(JobAlert),
    },
  },
  name: "JobAlertEdge",
});
export const JobAlertConnection = new GraphQLObjectType({
  description: "List of job alerts.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(JobAlertEdge)),
    },
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "JobAlertConnection",
});

export const JobAlertInput = new GraphQLInputObjectType({
  fields: {
    job_post: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "JobAlertInput",
  description: "The updated properties for a job alert.",
});

export const JobAlertArguments = {
  _id: {type: new GraphQLNonNull(GraphQLString)},
};
