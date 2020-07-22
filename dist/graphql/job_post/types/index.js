"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPostArguments = exports.JobPostInput = exports.JobPostConnection = exports.JobPostEdge = exports.JobPost = exports.JobLatLngInput = exports.JobLatLng = exports.JobCompanyInput = exports.JobCompany = exports.JobBenefitInput = exports.JobBenefit = exports.JobSalaryInput = exports.JobSalary = exports.JobUser = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../job_level/types");
const types_3 = require("../../job_category/types");
const types_4 = require("../../job_skill/types");
const types_5 = require("../../job_prefer_language/types");
const types_6 = require("../../company/types");
const types_7 = require("../../benefit/types");
const types_8 = require("../../user/types");
const types_9 = require("../../job_location/types");
exports.JobUser = new graphql_1.GraphQLObjectType({
    description: "Represents a job user.",
    fields: {
        ref: { type: types_8.User },
        in_company: { type: graphql_1.GraphQLBoolean },
    },
    name: "JobUser",
});
exports.JobSalary = new graphql_1.GraphQLObjectType({
    description: "Represents a job salary.",
    fields: {
        min: { type: graphql_1.GraphQLInt },
        max: { type: graphql_1.GraphQLInt },
        show: { type: graphql_1.GraphQLBoolean },
    },
    name: "JobSalary",
});
exports.JobSalaryInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a job salary.",
    fields: {
        min: { type: graphql_1.GraphQLInt },
        max: { type: graphql_1.GraphQLInt },
        show: { type: graphql_1.GraphQLBoolean },
    },
    name: "JobSalaryInput",
});
exports.JobBenefit = new graphql_1.GraphQLObjectType({
    description: "Represents a job benefit.",
    fields: {
        benefit_id: { type: types_7.Benefit },
        content: { type: graphql_1.GraphQLString },
    },
    name: "JobBenefit",
});
exports.JobBenefitInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a job benefit.",
    fields: {
        benefit_id: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString },
    },
    name: "JobBenefitInput",
});
exports.JobCompany = new graphql_1.GraphQLObjectType({
    description: "Represents a job company.",
    fields: {
        ref: { type: types_6.Company },
        name: { type: graphql_1.GraphQLString },
        size: { type: graphql_1.GraphQLString },
        address: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        benefit: { type: new graphql_1.GraphQLList(exports.JobBenefit) },
        logo: { type: graphql_1.GraphQLString },
        photos: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        video: { type: graphql_1.GraphQLString },
    },
    name: "JobCompany",
});
exports.JobCompanyInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a job company.",
    fields: {
        ref: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        size: { type: graphql_1.GraphQLString },
        address: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        benefit: { type: new graphql_1.GraphQLList(exports.JobBenefitInput) },
        logo: { type: graphql_1.GraphQLString },
        photos: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        video: { type: graphql_1.GraphQLString },
    },
    name: "JobCompanyInput",
});
exports.JobLatLng = new graphql_1.GraphQLObjectType({
    description: "Lat long Job Posts",
    fields: {
        lat: { type: graphql_1.GraphQLString },
        lng: { type: graphql_1.GraphQLString },
    },
    name: "JobLatLng",
});
exports.JobLatLngInput = new graphql_1.GraphQLInputObjectType({
    description: "Lat long Job Posts Input",
    fields: {
        lat: { type: graphql_1.GraphQLString },
        lng: { type: graphql_1.GraphQLString },
    },
    name: "JobLatLngInput",
});
exports.JobPost = new graphql_1.GraphQLObjectType({
    description: "Represents a job post.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        job_level: { type: types_2.JobLevel },
        job_category: { type: new graphql_1.GraphQLList(types_3.JobCategory) },
        description: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        requirement: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        job_location: { type: new graphql_1.GraphQLList(types_9.JobLocation) },
        salary: { type: exports.JobSalary },
        job_skill: { type: new graphql_1.GraphQLList(types_4.JobSkill) },
        location: { type: exports.JobLatLng },
        experience: { type: graphql_1.GraphQLInt },
        job_prefer_language: { type: new graphql_1.GraphQLList(types_5.JobPreferLanguage) },
        email_for_application: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        company: { type: new graphql_1.GraphQLNonNull(exports.JobCompany) },
        view_count: { type: graphql_1.GraphQLInt },
        status: { type: graphql_1.GraphQLString },
        user: { type: exports.JobUser },
        seo_title: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "JobPost",
});
exports.JobPostEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of JobPostEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.JobPost),
        },
    },
    name: "JobPostEdge",
});
exports.JobPostConnection = new graphql_1.GraphQLObjectType({
    description: "List of job posts.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.JobPostEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "JobPostConnection",
});
exports.JobPostInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        job_level: { type: graphql_1.GraphQLString },
        job_category: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        description: { type: graphql_1.GraphQLString },
        requirement: { type: graphql_1.GraphQLString },
        job_location: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        salary: { type: exports.JobSalaryInput },
        job_skill: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        job_prefer_language: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        experience: { type: graphql_1.GraphQLInt },
        email_for_application: { type: graphql_1.GraphQLString },
        company: { type: exports.JobCompanyInput },
        location: { type: exports.JobLatLngInput },
        status: { type: graphql_1.GraphQLString },
    },
    name: "JobPostInput",
    description: "The updated properties for a job post.",
});
exports.JobPostArguments = {
    _id: { type: graphql_1.GraphQLString },
    slug: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map