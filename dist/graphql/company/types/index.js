"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyArguments = exports.AssignPermissionOnput = exports.AssignPermissionInput = exports.CompanyInput = exports.CompanyConnection = exports.CompanyEdge = exports.Company = exports.BenefitContentInput = exports.BenefitContent = exports.PeopleInput = exports.People = exports.TextStoryInput = exports.TextStory = exports.ListUserInput = exports.ListUser = exports.MediaStoryInput = exports.MediaStory = void 0;
const types_1 = require("./../../group_permission/types");
const types_2 = require("./../../user/types");
const graphql_1 = require("graphql");
const types_3 = require("../../types");
const types_4 = require("../../job_category/types");
const types_5 = require("../../job_location/types");
const types_6 = require("../../benefit/types");
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
    name: "MediaStory",
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
    name: "MediaStoryInput",
});
exports.ListUser = new graphql_1.GraphQLObjectType({
    description: "Represents a list user",
    fields: {
        user: { type: types_2.User },
        target_permission: { type: types_1.GroupPermission }
    },
    name: "ListUser",
});
exports.ListUserInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a list user",
    fields: {
        user: { type: graphql_1.GraphQLString },
        target_permission: { type: graphql_1.GraphQLString }
    },
    name: "ListUserInput",
});
exports.TextStory = new graphql_1.GraphQLObjectType({
    description: "Represents a text story.",
    fields: {
        vi_title: { type: graphql_1.GraphQLString },
        en_title: { type: graphql_1.GraphQLString },
        vi_content: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        en_content: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
    },
    name: "TextStory",
});
exports.TextStoryInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a text story.",
    fields: {
        vi_title: { type: graphql_1.GraphQLString },
        en_title: { type: graphql_1.GraphQLString },
        vi_content: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        en_content: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
    },
    name: "TextStoryInput",
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
    name: "People",
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
    name: "PeopleInput",
});
exports.BenefitContent = new graphql_1.GraphQLObjectType({
    description: "Represents a benefit content.",
    fields: {
        vi_content: { type: graphql_1.GraphQLString },
        en_content: { type: graphql_1.GraphQLString },
        id: { type: types_6.Benefit },
    },
    name: "BenefitContent",
});
exports.BenefitContentInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a benefit content.",
    fields: {
        vi_content: { type: graphql_1.GraphQLString },
        en_content: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLString },
    },
    name: "BenefitContentInput",
});
exports.Company = new graphql_1.GraphQLObjectType({
    description: "Represents a company.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        default_lang: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        en_name: { type: graphql_1.GraphQLString },
        vi_name: { type: graphql_1.GraphQLString },
        job_category: { type: new graphql_1.GraphQLList(types_4.JobCategory) },
        company_type: { type: graphql_1.GraphQLString },
        job_location: { type: new graphql_1.GraphQLList(types_5.JobLocation) },
        verify_status: { type: graphql_1.GraphQLBoolean },
        premium_status: { type: graphql_1.GraphQLBoolean },
        address: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        album: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        en_slug: { type: graphql_1.GraphQLString },
        vi_slug: { type: graphql_1.GraphQLString },
        logo: { type: graphql_1.GraphQLString },
        cover: { type: graphql_1.GraphQLString },
        website: { type: graphql_1.GraphQLString },
        region: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
        facebook: { type: graphql_1.GraphQLString },
        youtube: { type: graphql_1.GraphQLString },
        address_contact: { type: graphql_1.GraphQLString },
        created_by: { type: graphql_1.GraphQLString },
        list_user: { type: new graphql_1.GraphQLList(exports.ListUser) },
        media_story: { type: new graphql_1.GraphQLList(exports.MediaStory) },
        text_story: { type: new graphql_1.GraphQLList(exports.TextStory) },
        people: { type: new graphql_1.GraphQLList(exports.People) },
        benefit: { type: new graphql_1.GraphQLList(exports.BenefitContent) },
        follow: { type: graphql_1.GraphQLInt },
        min_size: { type: graphql_1.GraphQLInt },
        max_size: { type: graphql_1.GraphQLInt },
        description: { type: graphql_1.GraphQLString },
        slogan: { type: graphql_1.GraphQLString },
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
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_3.PageInfo) },
    },
    name: "CompanyConnection",
});
exports.CompanyInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        default_lang: { type: graphql_1.GraphQLString },
        en_name: { type: graphql_1.GraphQLString },
        vi_name: { type: graphql_1.GraphQLString },
        job_category: { type: new graphql_1.GraphQLList(types_4.JobCategoryInput) },
        company_type: { type: graphql_1.GraphQLString },
        job_location: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        verify_status: { type: graphql_1.GraphQLBoolean },
        premium_status: { type: graphql_1.GraphQLBoolean },
        address: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        album: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        en_slug: { type: graphql_1.GraphQLString },
        vi_slug: { type: graphql_1.GraphQLString },
        logo: { type: graphql_1.GraphQLString },
        cover: { type: graphql_1.GraphQLString },
        website: { type: graphql_1.GraphQLString },
        region: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
        facebook: { type: graphql_1.GraphQLString },
        youtube: { type: graphql_1.GraphQLString },
        address_contact: { type: graphql_1.GraphQLString },
        created_by: { type: graphql_1.GraphQLString },
        list_user: { type: new graphql_1.GraphQLList(exports.ListUserInput) },
        media_story: { type: new graphql_1.GraphQLList(exports.MediaStoryInput) },
        text_story: { type: new graphql_1.GraphQLList(exports.TextStoryInput) },
        people: { type: new graphql_1.GraphQLList(exports.PeopleInput) },
        benefit: { type: new graphql_1.GraphQLList(exports.BenefitContentInput) },
        description: { type: graphql_1.GraphQLString },
        slogan: { type: graphql_1.GraphQLString },
        seo_title: { type: graphql_1.GraphQLString },
        seo_description: { type: graphql_1.GraphQLString },
    },
    name: "CompanyInput",
    description: "The updated properties for a company.",
});
exports.AssignPermissionInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        listUser: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        company: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        permission: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "AssignPermissionInput",
    description: "The updated properties for a group permission.",
});
exports.AssignPermissionOnput = new graphql_1.GraphQLObjectType({
    fields: {
        status: { type: graphql_1.GraphQLBoolean },
    },
    name: "AssignPermissionOnput",
    description: "The updated properties for a group permission.",
});
exports.CompanyArguments = {
    _id: { type: graphql_1.GraphQLString },
    slug: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map