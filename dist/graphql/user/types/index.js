"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../job_level/types");
const types_3 = require("../../job_location/types");
const types_4 = require("../../job_skill/types");
const UserEducationHistory = new graphql_1.GraphQLObjectType({
    description: "Represents an user education history",
    fields: {
        subject: { type: graphql_1.GraphQLString },
        school: { type: graphql_1.GraphQLString },
        qualification: { type: graphql_1.GraphQLString },
        from_month: { type: graphql_1.GraphQLString },
        to_month: { type: graphql_1.GraphQLString },
        achievement: { type: graphql_1.GraphQLString },
    },
    name: "UserEducationHistory"
});
const UserEducationHistoryInput = new graphql_1.GraphQLObjectType({
    description: "The updated properties for an user education history",
    fields: {
        subject: { type: graphql_1.GraphQLString },
        school: { type: graphql_1.GraphQLString },
        qualification: { type: graphql_1.GraphQLString },
        from_month: { type: graphql_1.GraphQLString },
        to_month: { type: graphql_1.GraphQLString },
        achievement: { type: graphql_1.GraphQLString },
    },
    name: "UserEducationHistoryInput"
});
const UserEmploymentHistory = new graphql_1.GraphQLObjectType({
    description: "Represents an user employment history",
    fields: {
        position: { type: graphql_1.GraphQLString },
        company: { type: graphql_1.GraphQLString },
        from_month: { type: graphql_1.GraphQLString },
        to_month: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
    },
    name: "UserEmploymentHistory"
});
const UserEmploymentHistoryInput = new graphql_1.GraphQLObjectType({
    description: "The updated properties for an user employment history",
    fields: {
        position: { type: graphql_1.GraphQLString },
        company: { type: graphql_1.GraphQLString },
        from_month: { type: graphql_1.GraphQLString },
        to_month: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
    },
    name: "UserEmploymentHistoryInput"
});
const UserLanguage = new graphql_1.GraphQLObjectType({
    description: "Represents an user language",
    fields: {
        lang: { type: graphql_1.GraphQLString },
        level: { type: graphql_1.GraphQLString },
    },
    name: "UserLanguage"
});
const UserLanguageInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for an user language",
    fields: {
        lang: { type: graphql_1.GraphQLString },
        level: { type: graphql_1.GraphQLString },
    },
    name: "UserLanguageInput"
});
const UserWorkPreference = new graphql_1.GraphQLObjectType({
    description: "Represents an user work preference",
    fields: {
        lang: { type: graphql_1.GraphQLString },
        level: { type: graphql_1.GraphQLString },
    },
    name: "UserWorkPreference"
});
const UserWorkPreferenceInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for an user work preference",
    fields: {
        lang: { type: graphql_1.GraphQLString },
        level: { type: graphql_1.GraphQLString },
    },
    name: "UserWorkPreferenceInput"
});
exports.UserCustomizeInfo = new graphql_1.GraphQLObjectType({
    description: "Represents an user customize info.",
    fields: {
        cover: { type: graphql_1.GraphQLString },
        avatar: { type: graphql_1.GraphQLString },
        files: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        first_name: { type: graphql_1.GraphQLString },
        last_name: { type: graphql_1.GraphQLString },
        current_job_title: { type: graphql_1.GraphQLString },
        current_job_level: { type: types_2.JobLevel },
        current_experience_number: { type: graphql_1.GraphQLInt },
        phone: { type: graphql_1.GraphQLString },
        birthday: { type: graphql_1.GraphQLString },
        nation: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
        location: { type: types_3.JobLocation },
        specific_address: { type: graphql_1.GraphQLString },
        intro: { type: graphql_1.GraphQLString },
        skill: { type: new graphql_1.GraphQLList(types_4.JobSkill) },
        language: { type: new graphql_1.GraphQLList(UserLanguage) },
        employment_history: { type: new graphql_1.GraphQLList(UserEmploymentHistory) },
    },
    name: "UserCustomizeInfo",
});
exports.UserCustomizeInfoInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for an user customize info.",
    fields: {
        cover: { type: graphql_1.GraphQLString },
        avatar: { type: graphql_1.GraphQLString },
        files: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        first_name: { type: graphql_1.GraphQLString },
        last_name: { type: graphql_1.GraphQLString },
        current_job_title: { type: graphql_1.GraphQLString },
        current_job_level: { type: graphql_1.GraphQLString },
        current_experience_number: { type: graphql_1.GraphQLInt },
        phone: { type: graphql_1.GraphQLString },
        birthday: { type: graphql_1.GraphQLString },
        nation: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
    },
    name: "UserCustomizeInfoInput",
});
exports.User = new graphql_1.GraphQLObjectType({
    description: "Represents an user.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        email: { type: graphql_1.GraphQLString },
        first_name: { type: graphql_1.GraphQLString },
        last_name: { type: graphql_1.GraphQLString },
        birth_day: { type: graphql_1.GraphQLString },
        avatar: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        login_type: { type: graphql_1.GraphQLString },
        spam: { type: graphql_1.GraphQLInt },
        customize_info: { type: exports.UserCustomizeInfo },
        created_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        updated_at: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    },
    name: "User",
});
exports.UserEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of UserEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.User),
        },
    },
    name: "UserEdge",
});
exports.UserConnection = new graphql_1.GraphQLObjectType({
    description: "List of users.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.UserEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "UserConnection",
});
exports.UserInput = new graphql_1.GraphQLInputObjectType({
    fields: {
        first_name: { type: graphql_1.GraphQLString },
        last_name: { type: graphql_1.GraphQLString },
        birth_day: { type: graphql_1.GraphQLString },
        avatar: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        login_type: { type: graphql_1.GraphQLString },
        spam: { type: graphql_1.GraphQLInt },
        customize_info: { type: exports.UserCustomizeInfoInput },
    },
    name: "UserInput",
    description: "The updated properties for an user.",
});
exports.UserArguments = {
    _id: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map