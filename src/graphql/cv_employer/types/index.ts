import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { PageInfo } from "../../types";
import { City } from "../../city/types";
import { CvWarehouse } from "../../cv_warehouse/types";
import { JobLevel } from "../../job_level/types";
import { JobType } from "../../job_type/types";

export const CvEmployer = new GraphQLObjectType({
  description: "Represents a cv warehouse.",
  fields: {
    _id: { type: GraphQLString },
    cv_warehouse: { type: CvWarehouse },
    title: { type: GraphQLString },
    origin_url: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    birthday: { type: GraphQLString },
    gender: { type: GraphQLString },
    num_experience: { type: GraphQLString },
    skill: { type: new GraphQLList(GraphQLString) },
    position: { type: GraphQLString },
    citty: { type: GraphQLString },
    job_level: { type: JobLevel },
    job_type: { type: JobType },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  },
  name: "CvEmployer",
});

export const CvEmployerEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: {
      description: "CvEmployerEdge node",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(CvEmployer),
    },
  },
  name: "CvEmployerEdge",
});

export const CvEmployerConnection = new GraphQLObjectType({
  description: "List of cv warehouses.",
  fields: {
    edges: {
      description: "CvEmployerConnection edges",
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(CvEmployerEdge)),
    },
    pageInfo: { type: new GraphQLNonNull(PageInfo) },
  },
  name: "CvEmployerConnection",
});

export const CvEmployerInput = new GraphQLInputObjectType({
  description: "The updated properties for a cv warehouse.",
  fields: {
    _id: { type: GraphQLString },
    cv_warehouse: { type: GraphQLString },
    title: { type: GraphQLString },
    origin_url: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    birthday: { type: GraphQLString },
    gender: { type: GraphQLString },
    num_experience: { type: GraphQLString },
    skill: { type: new GraphQLList(GraphQLString) },
    position: { type: GraphQLString },
    citty: { type: GraphQLString },
    job_level: { type: GraphQLString },
    job_type: { type: GraphQLString },
  },
  name: "CvEmployerInput",
});

export const CvEmployerArguments = {
  _id: { type: GraphQLString },
};
