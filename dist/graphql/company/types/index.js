"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../job_category/types");
const types_3 = require("../../job_location/types");
const types_4 = require("../../benefit/types");
exports.MediaStory = new graphql_1.GraphQLObjectType({
    description: "Represents a media story.",
    fields: {
        vi_title: { type: graphql_1.GraphQLString },
        en_title: { type: graphql_1.GraphQLString },
        vi_content: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        en_content: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        media_type: { type: graphql_1.GraphQLString },
        media_link: { type: graphql_1.GraphQLString },
    },
    name: "MediaStory"
});
exports.MediaStoryInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a media story.",
    fields: {
        vi_title: { type: graphql_1.GraphQLString },
        en_title: { type: graphql_1.GraphQLString },
        vi_content: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        en_content: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        media_type: { type: graphql_1.GraphQLString },
        media_link: { type: graphql_1.GraphQLString },
    },
    name: "MediaStoryInput"
});
exports.TextStory = new graphql_1.GraphQLObjectType({
    description: "Represents a text story.",
    fields: {
        vi_title: { type: graphql_1.GraphQLString },
        en_title: { type: graphql_1.GraphQLString },
        vi_content: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        en_content: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
    },
    name: "TextStory"
});
exports.TextStoryInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a text story.",
    fields: {
        vi_title: { type: graphql_1.GraphQLString },
        en_title: { type: graphql_1.GraphQLString },
        vi_content: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        en_content: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
    },
    name: "TextStoryInput"
});
exports.People = new graphql_1.GraphQLObjectType({
    description: "Represents a person.",
    fields: {
        vi_name: { type: graphql_1.GraphQLString },
        en_name: { type: graphql_1.GraphQLString },
        vi_content: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        en_content: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        vi_position: { type: graphql_1.GraphQLString },
        en_position: { type: graphql_1.GraphQLString },
        media_link: { type: graphql_1.GraphQLString },
    },
    name: "People"
});
exports.PeopleInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a person.",
    fields: {
        vi_name: { type: graphql_1.GraphQLString },
        en_name: { type: graphql_1.GraphQLString },
        vi_content: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        en_content: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        vi_position: { type: graphql_1.GraphQLString },
        en_position: { type: graphql_1.GraphQLString },
        media_link: { type: graphql_1.GraphQLString },
    },
    name: "PeopleInput"
});
exports.BenefitContent = new graphql_1.GraphQLObjectType({
    description: "Represents a benefit content.",
    fields: {
        vi_content: { type: graphql_1.GraphQLString },
        en_content: { type: graphql_1.GraphQLString },
        id: { type: types_4.Benefit },
    },
    name: "BenefitContent"
});
exports.BenefitContentInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a benefit content.",
    fields: {
        vi_content: { type: graphql_1.GraphQLString },
        en_content: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLString },
    },
    name: "BenefitContentInput"
});
exports.Company = new graphql_1.GraphQLObjectType({
    description: "Represents a company.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        default_lang: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        en_name: { type: graphql_1.GraphQLString },
        vi_name: { type: graphql_1.GraphQLString },
        job_category: { type: new graphql_1.GraphQLList(types_2.JobCategory) },
        company_type: { type: graphql_1.GraphQLString },
        job_location: { type: new graphql_1.GraphQLList(types_3.JobLocation) },
        address: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        album: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        en_slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        vi_slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        logo: { type: graphql_1.GraphQLString },
        cover: { type: graphql_1.GraphQLString },
        website: { type: graphql_1.GraphQLString },
        media_story: { type: new graphql_1.GraphQLList(exports.MediaStory) },
        text_story: { type: new graphql_1.GraphQLList(exports.TextStory) },
        people: { type: new graphql_1.GraphQLList(exports.People) },
        benefit: { type: new graphql_1.GraphQLList(exports.BenefitContent) },
        seo_title: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "Company",
});
exports.CompanyEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of CompanyEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.Company),
        },
    },
    name: "CompanyEdge",
});
exports.CompanyConnection = new graphql_1.GraphQLObjectType({
    description: "List of companys.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.CompanyEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "CompanyConnection",
});
exports.CompanyInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        default_lang: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        en_name: { type: graphql_1.GraphQLString },
        vi_name: { type: graphql_1.GraphQLString },
        job_category: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        company_type: { type: graphql_1.GraphQLString },
        job_location: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        address: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        album: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        en_slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        vi_slug: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        logo: { type: graphql_1.GraphQLString },
        cover: { type: graphql_1.GraphQLString },
        website: { type: graphql_1.GraphQLString },
        media_story: { type: new graphql_1.GraphQLList(exports.MediaStoryInput) },
        text_story: { type: new graphql_1.GraphQLList(exports.TextStoryInput) },
        people: { type: new graphql_1.GraphQLList(exports.PeopleInput) },
        benefit: { type: new graphql_1.GraphQLList(exports.BenefitContentInput) },
        seo_title: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
    },
    name: "CompanyInput",
    description: "The updated properties for a company.",
});
exports.CompanyArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map