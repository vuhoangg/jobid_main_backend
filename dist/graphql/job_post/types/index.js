"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPostArguments = exports.JobPostTrackingBySlugInput = exports.JobPostTrackingBySlug = exports.JobPostInput = exports.JobPostConnection = exports.JobPostEdge = exports.JobPost = exports.JobContactInput = exports.JobContact = exports.JobAddressInput = exports.JobAddress = exports.JobCompanyInput = exports.JobCompany = exports.JobBenefitInput = exports.JobBenefit = exports.JobSalaryInput = exports.JobSalary = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../job_level/types");
const types_3 = require("../../job_category/types");
const types_4 = require("../../company/types");
const types_5 = require("../../benefit/types");
const types_6 = require("../../user/types");
const types_7 = require("../../job_type/types");
const types_8 = require("../../city/types");
const types_9 = require("../../district/types");
const types_10 = require("../../ward/types");
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
        benefit_id: { type: types_5.Benefit },
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
        ref: { type: types_4.Company },
        name: { type: graphql_1.GraphQLString },
    },
    name: "JobCompany",
});
exports.JobCompanyInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a job company.",
    fields: {
        ref: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
    },
    name: "JobCompanyInput",
});
exports.JobAddress = new graphql_1.GraphQLObjectType({
    description: "Represents a job address.",
    fields: {
        city: { type: types_8.City },
        district: { type: types_9.District },
        ward: { type: types_10.Ward },
        specific: { type: graphql_1.GraphQLString },
        text: { type: graphql_1.GraphQLString },
        lat: { type: graphql_1.GraphQLFloat },
        lng: { type: graphql_1.GraphQLFloat },
    },
    name: "JobAddress",
});
exports.JobAddressInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a job address.",
    fields: {
        city: { type: graphql_1.GraphQLString },
        district: { type: graphql_1.GraphQLString },
        ward: { type: graphql_1.GraphQLString },
        specific: { type: graphql_1.GraphQLString },
        text: { type: graphql_1.GraphQLString },
        lat: { type: graphql_1.GraphQLFloat },
        lng: { type: graphql_1.GraphQLFloat },
    },
    name: "JobAddressInput",
});
exports.JobContact = new graphql_1.GraphQLObjectType({
    description: "Represents a job contact.",
    fields: {
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
    },
    name: "JobContact",
});
exports.JobContactInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a job contact.",
    fields: {
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
    },
    name: "JobContactInput",
});
exports.JobPost = new graphql_1.GraphQLObjectType({
    description: "Represents a job post.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        title: { type: graphql_1.GraphQLString },
        slug: { type: graphql_1.GraphQLString },
        job_type: { type: types_7.JobType },
        job_level: { type: types_2.JobLevel },
        job_category: { type: new graphql_1.GraphQLList(types_3.JobCategory) },
        number: { type: graphql_1.GraphQLInt },
        description: { type: graphql_1.GraphQLString },
        requirement: { type: graphql_1.GraphQLString },
        salary: { type: exports.JobSalary },
        address: { type: new graphql_1.GraphQLList(exports.JobAddress) },
        company: { type: exports.JobCompany },
        contact: { type: exports.JobContact },
        image: { type: graphql_1.GraphQLString },
        photos: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        video: { type: graphql_1.GraphQLString },
        benefit: { type: new graphql_1.GraphQLList(exports.JobBenefit) },
        end_date: { type: graphql_1.GraphQLString },
        user: { type: types_6.User },
        view_count: { type: graphql_1.GraphQLInt },
        save_count: { type: graphql_1.GraphQLInt },
        report_count: { type: graphql_1.GraphQLInt },
        apply_count: { type: graphql_1.GraphQLInt },
        status: { type: graphql_1.GraphQLString },
        seo_title: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
        is_featured: { type: graphql_1.GraphQLBoolean },
        is_wishlist: { type: graphql_1.GraphQLBoolean },
        created_at: { type: graphql_1.GraphQLString },
        updated_at: { type: graphql_1.GraphQLString },
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
        job_type: { type: graphql_1.GraphQLString },
        job_level: { type: graphql_1.GraphQLString },
        job_category: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        number: { type: graphql_1.GraphQLInt },
        description: { type: graphql_1.GraphQLString },
        requirement: { type: graphql_1.GraphQLString },
        salary: { type: exports.JobSalaryInput },
        address: { type: new graphql_1.GraphQLList(exports.JobAddressInput) },
        company: { type: exports.JobCompanyInput },
        contact: { type: exports.JobContactInput },
        image: { type: graphql_1.GraphQLString },
        photos: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        video: { type: graphql_1.GraphQLString },
        benefit: { type: new graphql_1.GraphQLList(exports.JobBenefitInput) },
        end_date: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
    },
    name: "JobPostInput",
    description: "The updated properties for a job post.",
});
exports.JobPostTrackingBySlug = new graphql_1.GraphQLObjectType({
    fields: {
        status: { type: graphql_1.GraphQLBoolean },
    },
    name: "JobPostTrackingBySlug",
    description: "Represents a job post tracking"
});
exports.JobPostTrackingBySlugInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        slug: { type: graphql_1.GraphQLString },
    },
    name: "JobPostTrackingBySlugInput",
    description: "The updated properties for a job post tracking."
});
exports.JobPostArguments = {
    _id: { type: graphql_1.GraphQLString },
    slug: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map