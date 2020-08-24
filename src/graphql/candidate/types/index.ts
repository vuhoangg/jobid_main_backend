import {
  GraphQLBoolean,
  GraphQLInputObjectType, GraphQLInt,
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

export const CandidateStudy = new GraphQLObjectType({
  name: "CandidateStudy",
  fields: {
    timeline: {type: GraphQLString},
    position: {type: GraphQLString},
    description: {type: GraphQLString},
  },
  description: "Represents a candidate study."
});
export const CandidateStudyInput = new GraphQLInputObjectType({
  name: "CandidateStudyInput",
  fields: {
    timeline: {type: GraphQLString},
    position: {type: GraphQLString},
    description: {type: GraphQLString},
  },
  description: "The updated properties for a candidate study."
});

export const CandidateExp = new GraphQLObjectType({
  name: "CandidateExp",
  fields: {
    timeline: {type: GraphQLString},
    position: {type: GraphQLString},
    description: {type: GraphQLString},
  },
  description: "Represents a candidate exp."
});
export const CandidateExpInput = new GraphQLInputObjectType({
  name: "CandidateExpInput",
  fields: {
    timeline: {type: GraphQLString},
    position: {type: GraphQLString},
    description: {type: GraphQLString},
  },
  description: "The updated properties for a candidate exp."
});

export const CandidateProject = new GraphQLObjectType({
  name: "CandidateProject",
  fields: {
    name: {type: GraphQLString},
    url: {type: GraphQLString},
    member: {type: GraphQLInt},
    position: {type: GraphQLString},
    description: {type: GraphQLString},
  },
  description: "Represents a candidate project."
});
export const CandidateProjectInput = new GraphQLInputObjectType({
  name: "CandidateProjectInput",
  fields: {
    name: {type: GraphQLString},
    url: {type: GraphQLString},
    member: {type: GraphQLInt},
    position: {type: GraphQLString},
    description: {type: GraphQLString},
  },
  description: "The updated properties for a candidate project."
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
    avatar: {type: GraphQLString},
    cv: {type: GraphQLString},
    photos: {type: new GraphQLList(GraphQLString)},
    files: {type: new GraphQLList(CandidateFile)},

    birthday: {type: GraphQLString},
    gender: {type: GraphQLString},
    phone: {type: GraphQLString},
    email: {type: GraphQLString},
    address: {type: GraphQLString},
    website: {type: GraphQLString},
    target: {type: GraphQLString},
    study: {type: new GraphQLList(CandidateStudy)},
    exp: {type: new GraphQLList(CandidateExp)},
    project: {type: new GraphQLList(CandidateProject)},
    public: {type: GraphQLBoolean},
    upload_by: {type: User},
    note: {type: new GraphQLList(GraphQLString)},

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
    avatar: {type: GraphQLString},
    cv: {type: GraphQLString},
    photos: {type: new GraphQLList(GraphQLString)},
    files: {type: new GraphQLList(CandidateFileInput)},

    birthday: {type: GraphQLString},
    gender: {type: GraphQLString},
    phone: {type: GraphQLString},
    email: {type: GraphQLString},
    address: {type: GraphQLString},
    website: {type: GraphQLString},
    target: {type: GraphQLString},
    study: {type: new GraphQLList(CandidateStudyInput)},
    exp: {type: new GraphQLList(CandidateExpInput)},
    project: {type: new GraphQLList(CandidateProjectInput)},
    public: {type: GraphQLBoolean},
    note: {type: new GraphQLList(GraphQLString)},
  },
  name: "CandidateInput",
  description: "The updated properties for a candidate.",
});

export const CandidateArguments = {
  _id: {type: new GraphQLNonNull(GraphQLString)},
};
