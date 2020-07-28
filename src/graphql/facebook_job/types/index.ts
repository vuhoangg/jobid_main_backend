import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql";
import {PageInfo} from "../../types";

const FacebookEmployer = new GraphQLObjectType({
  description: "Represents a facebook employer.",
  fields: {
    avatar: {type: GraphQLString},
    name: {type: GraphQLString},
  },
  name: "FacebookEmployer"
});
const FacebookEmployerInput = new GraphQLInputObjectType({
  description: "The updated properties for a facebook employer.",
  fields: {
    avatar: {type: GraphQLString},
    name: {type: GraphQLString},
  },
  name: "FacebookEmployerInput"
});

const FacebookAddress = new GraphQLObjectType({
  description: "Represents a facebook address.",
  fields: {
    text: {type: GraphQLString},
  },
  name: "FacebookAddress"
});
const FacebookAddressInput = new GraphQLInputObjectType({
  description: "The updated properties for a facebook address.",
  fields: {
    text: {type: GraphQLString},
  },
  name: "FacebookAddressInput"
});

const FacebookMap = new GraphQLObjectType({
  description: "Represents a facebook map.",
  fields: {
    lat: {type: GraphQLFloat},
    lng: {type: GraphQLFloat},
  },
  name: "FacebookMap"
});
const FacebookMapInput = new GraphQLInputObjectType({
  description: "The updated properties for a facebook map.",
  fields: {
    lat: {type: GraphQLFloat},
    lng: {type: GraphQLFloat},
  },
  name: "FacebookMapInput"
});


export const FacebookJob = new GraphQLObjectType({
  description: "Represents a facebook job.",
  fields: {
    _id: {type: GraphQLString},
    employer: {type: FacebookEmployer},
    address: {type: FacebookAddress},
    long_description: {type: GraphQLString},
    share_url: {type: GraphQLString},
    title: {type: GraphQLString},
    sub_title: {type: GraphQLString},
    map: {type: FacebookMap},
  },
  name: "FacebookJob"
});

export const FacebookJobEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
    node: {
      description: "FacebookJobEdge node",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(FacebookJob),
    },
  },
  name: "FacebookJobEdge",
});

export const FacebookJobConnection = new GraphQLObjectType({
  description: "List of facebookJobs.",
  fields: {
    edges: {
      description: "FacebookJobConnection edges",
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(FacebookJobEdge)),
    },
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "FacebookJobConnection",
});

export const FacebookJobInput = new GraphQLInputObjectType({
  description: "The updated properties for a facebook job.",
  fields: {
    _id: {type: GraphQLString},
    employer: {type: FacebookEmployerInput},
    address: {type: FacebookAddressInput},
    long_description: {type: GraphQLString},
    share_url: {type: GraphQLString},
    title: {type: GraphQLString},
    sub_title: {type: GraphQLString},
    map: {type: FacebookMapInput},
  },
  name: "FacebookJobInput"
});

export const FacebookJobArguments = {
  _id: {type: GraphQLString},
};
