"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyArguments = exports.AssignPermissionOnput = exports.AssignPermissionInput = exports.CompanyInput = exports.CompanyConnection = exports.CompanyEdge = exports.Company = exports.CompanySizeInput = exports.CompanySize = exports.AlbumInput = exports.Album = exports.AlbumImageInput = exports.AlbumImage = exports.OfficeInput = exports.Office = exports.BenefitContentInput = exports.BenefitContent = exports.PeopleInput = exports.People = exports.StoryInput = exports.Story = void 0;
const types_1 = require("./../../user/types");
const graphql_1 = require("graphql");
const types_2 = require("../../types");
const types_3 = require("../../job_category/types");
const types_4 = require("../../benefit/types");
const types_5 = require("../../city/types");
const types_6 = require("../../district/types");
const types_7 = require("../../ward/types");
exports.Story = new graphql_1.GraphQLObjectType({
    description: "Represents a story.",
    fields: {
        title: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString },
        media_type: { type: graphql_1.GraphQLString },
        media_link: { type: graphql_1.GraphQLString },
    },
    name: "Story",
});
exports.StoryInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a story.",
    fields: {
        title: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString },
        media_type: { type: graphql_1.GraphQLString },
        media_link: { type: graphql_1.GraphQLString },
    },
    name: "StoryInput",
});
exports.People = new graphql_1.GraphQLObjectType({
    description: "Represents a person.",
    fields: {
        name: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString },
        position: { type: graphql_1.GraphQLString },
        avatar: { type: graphql_1.GraphQLString },
    },
    name: "People",
});
exports.PeopleInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a person.",
    fields: {
        name: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString },
        position: { type: graphql_1.GraphQLString },
        avatar: { type: graphql_1.GraphQLString },
    },
    name: "PeopleInput",
});
exports.BenefitContent = new graphql_1.GraphQLObjectType({
    description: "Represents a benefit content.",
    fields: {
        content: { type: graphql_1.GraphQLString },
        id: { type: types_4.Benefit },
    },
    name: "BenefitContent",
});
exports.BenefitContentInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a benefit content.",
    fields: {
        content: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLString },
    },
    name: "BenefitContentInput",
});
exports.Office = new graphql_1.GraphQLObjectType({
    description: "Represents a office content.",
    fields: {
        city: { type: types_5.CityType },
        district: { type: types_6.DistrictType },
        ward: { type: types_7.WardType },
        address: { type: graphql_1.GraphQLString },
        lat: { type: graphql_1.GraphQLFloat },
        lng: { type: graphql_1.GraphQLFloat },
    },
    name: "Office"
});
exports.OfficeInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a office.",
    fields: {
        city: { type: graphql_1.GraphQLString },
        district: { type: graphql_1.GraphQLString },
        ward: { type: graphql_1.GraphQLString },
        address: { type: graphql_1.GraphQLString },
        lat: { type: graphql_1.GraphQLFloat },
        lng: { type: graphql_1.GraphQLFloat },
    },
    name: "OfficeInput"
});
exports.AlbumImage = new graphql_1.GraphQLObjectType({
    description: "Represents an album image",
    fields: {
        src: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
    },
    name: "AlbumImage",
});
exports.AlbumImageInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for an album image",
    fields: {
        src: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
    },
    name: "AlbumImageInput",
});
exports.Album = new graphql_1.GraphQLObjectType({
    description: "Represents an album",
    fields: {
        name: { type: graphql_1.GraphQLString },
        images: { type: new graphql_1.GraphQLList(exports.AlbumImage) }
    },
    name: "Album"
});
exports.AlbumInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for an album",
    fields: {
        name: { type: graphql_1.GraphQLString },
        images: { type: new graphql_1.GraphQLList(exports.AlbumImageInput) }
    },
    name: "AlbumInput"
});
exports.CompanySize = new graphql_1.GraphQLObjectType({
    description: "Represents a company size",
    fields: {
        from: { type: graphql_1.GraphQLInt },
        to: { type: graphql_1.GraphQLInt }
    },
    name: "CompanySize"
});
exports.CompanySizeInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for a company size",
    fields: {
        from: { type: graphql_1.GraphQLInt },
        to: { type: graphql_1.GraphQLInt }
    },
    name: "CompanySizeInput"
});
exports.Company = new graphql_1.GraphQLObjectType({
    description: "Represents a company.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        name: { type: graphql_1.GraphQLString },
        slogan: { type: graphql_1.GraphQLString },
        logo: { type: graphql_1.GraphQLString },
        cover: { type: graphql_1.GraphQLString },
        website: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
        facebook: { type: graphql_1.GraphQLString },
        youtube: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        company_type: { type: graphql_1.GraphQLString },
        job_category: { type: new graphql_1.GraphQLList(types_3.JobCategory) },
        verify_status: { type: graphql_1.GraphQLBoolean },
        premium_status: { type: graphql_1.GraphQLBoolean },
        album: { type: new graphql_1.GraphQLList(exports.Album) },
        slug: { type: graphql_1.GraphQLString },
        created_by: { type: types_1.User },
        story: { type: new graphql_1.GraphQLList(exports.Story) },
        office: { type: new graphql_1.GraphQLList(exports.Office) },
        people: { type: new graphql_1.GraphQLList(exports.People) },
        benefit: { type: new graphql_1.GraphQLList(exports.BenefitContent) },
        follow: { type: graphql_1.GraphQLInt },
        size: { type: exports.CompanySize },
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
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_2.PageInfo) },
    },
    name: "CompanyConnection",
});
exports.CompanyInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        _id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        slogan: { type: graphql_1.GraphQLString },
        logo: { type: graphql_1.GraphQLString },
        cover: { type: graphql_1.GraphQLString },
        website: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
        facebook: { type: graphql_1.GraphQLString },
        youtube: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        company_type: { type: graphql_1.GraphQLString },
        job_category: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        verify_status: { type: graphql_1.GraphQLBoolean },
        premium_status: { type: graphql_1.GraphQLBoolean },
        album: { type: new graphql_1.GraphQLList(exports.AlbumInput) },
        slug: { type: graphql_1.GraphQLString },
        created_by: { type: graphql_1.GraphQLString },
        office: { type: new graphql_1.GraphQLList(exports.OfficeInput) },
        story: { type: new graphql_1.GraphQLList(exports.StoryInput) },
        people: { type: new graphql_1.GraphQLList(exports.PeopleInput) },
        benefit: { type: new graphql_1.GraphQLList(exports.BenefitContentInput) },
        follow: { type: graphql_1.GraphQLInt },
        size: { type: exports.CompanySizeInput },
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