"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../cv_warehouse/types");
const types_3 = require("../../job_level/types");
const types_4 = require("../../job_type/types");
exports.CvEmployer = new graphql_1.GraphQLObjectType({
    description: "Represents a cv warehouse.",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        cv_warehouse: { type: types_2.CvWarehouse },
        title: { type: graphql_1.GraphQLString },
        origin_url: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
        birthday: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        num_experience: { type: graphql_1.GraphQLString },
        skill: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        position: { type: graphql_1.GraphQLString },
        citty: { type: graphql_1.GraphQLString },
        job_level: { type: types_3.JobLevel },
        job_type: { type: types_4.JobType },
        created_at: { type: graphql_1.GraphQLString },
        updated_at: { type: graphql_1.GraphQLString },
    },
    name: "CvEmployer",
});
exports.CvEmployerEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "CvEmployerEdge node",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.CvEmployer),
        },
    },
    name: "CvEmployerEdge",
});
exports.CvEmployerConnection = new graphql_1.GraphQLObjectType({
    description: "List of cv warehouses.",
    fields: {
        edges: {
            description: "CvEmployerConnection edges",
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.CvEmployerEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "CvEmployerConnection",
});
exports.CvEmployerInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a cv warehouse.",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        cv_warehouse: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        origin_url: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
        birthday: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        num_experience: { type: graphql_1.GraphQLString },
        skill: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        position: { type: graphql_1.GraphQLString },
        citty: { type: graphql_1.GraphQLString },
        job_level: { type: graphql_1.GraphQLString },
        job_type: { type: graphql_1.GraphQLString },
    },
    name: "CvEmployerInput",
});
exports.CvEmployerArguments = {
    _id: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map