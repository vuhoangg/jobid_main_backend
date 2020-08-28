"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserArguments = exports.UserInput = exports.UserConnection = exports.UserEdge = exports.User = exports.UserInfoInput = exports.UserInfo = exports.UserInfoFavoriteInput = exports.UserInfoFavorite = exports.UserInfoEducationInput = exports.UserInfoFavoriteLocationInput = exports.UserInfoFavoriteLocation = exports.UserInfoEducation = exports.UserInfoExperienceInput = exports.UserInfoExperience = exports.UserInfoExperienceProjectInput = exports.UserInfoExperienceProject = exports.UserInfoTimelineInput = exports.UserInfoTimeline = exports.UserInfoAddressInput = exports.UserInfoAddress = exports.UserCustomizeInfoInput = exports.UserCustomizeInfo = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
const types_2 = require("../../job_level/types");
const types_3 = require("../../job_location/types");
const types_4 = require("../../job_skill/types");
const types_5 = require("../../job_category/types");
const types_6 = require("../../benefit/types");
const types_7 = require("../../city/types");
const types_8 = require("../../district/types");
const types_9 = require("../../ward/types");
const types_10 = require("../../job_type/types");
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
const UserEducationHistoryInput = new graphql_1.GraphQLInputObjectType({
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
const UserEmploymentHistoryInput = new graphql_1.GraphQLInputObjectType({
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
        job_location: { type: new graphql_1.GraphQLList(types_3.JobLocation) },
        job_category: { type: new graphql_1.GraphQLList(types_5.JobCategory) },
        job_level: { type: types_2.JobLevel },
        salary: { type: graphql_1.GraphQLString },
        benefit: { type: new graphql_1.GraphQLList(types_6.Benefit) },
    },
    name: "UserWorkPreference"
});
const UserWorkPreferenceInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for an user work preference",
    fields: {
        job_location: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        job_category: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        job_level: { type: graphql_1.GraphQLString },
        salary: { type: graphql_1.GraphQLString },
        benefit: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
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
        current_job_company: { type: graphql_1.GraphQLString },
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
        education_history: { type: new graphql_1.GraphQLList(UserEducationHistory) },
        work_preference: { type: UserWorkPreference },
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
        current_job_company: { type: graphql_1.GraphQLString },
        current_job_level: { type: graphql_1.GraphQLString },
        current_experience_number: { type: graphql_1.GraphQLInt },
        phone: { type: graphql_1.GraphQLString },
        birthday: { type: graphql_1.GraphQLString },
        nation: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
        location: { type: graphql_1.GraphQLString },
        specific_address: { type: graphql_1.GraphQLString },
        intro: { type: graphql_1.GraphQLString },
        skill: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        language: { type: new graphql_1.GraphQLList(UserLanguageInput) },
        employment_history: { type: new graphql_1.GraphQLList(UserEmploymentHistoryInput) },
        education_history: { type: new graphql_1.GraphQLList(UserEducationHistoryInput) },
        work_preference: { type: UserWorkPreferenceInput },
    },
    name: "UserCustomizeInfoInput",
});
exports.UserInfoAddress = new graphql_1.GraphQLObjectType({
    name: "UserInfoAddress",
    fields: {
        city: { type: types_7.City },
        district: { type: types_8.District },
        ward: { type: types_9.Ward },
        lat: { type: graphql_1.GraphQLFloat },
        lng: { type: graphql_1.GraphQLFloat },
        text: { type: graphql_1.GraphQLString }
    },
    description: "Represents an user info address."
});
exports.UserInfoAddressInput = new graphql_1.GraphQLInputObjectType({
    name: "UserInfoAddressInput",
    fields: {
        city: { type: graphql_1.GraphQLString },
        district: { type: graphql_1.GraphQLString },
        ward: { type: graphql_1.GraphQLString },
        lat: { type: graphql_1.GraphQLFloat },
        lng: { type: graphql_1.GraphQLFloat },
        text: { type: graphql_1.GraphQLString }
    },
    description: "The updated properties for an user info address."
});
exports.UserInfoTimeline = new graphql_1.GraphQLObjectType({
    name: "UserInputTimeline",
    fields: {
        from: { type: graphql_1.GraphQLString },
        to: { type: graphql_1.GraphQLString },
    },
    description: "Represents an user info timeline"
});
exports.UserInfoTimelineInput = new graphql_1.GraphQLInputObjectType({
    name: "UserInfoTimelineInput",
    fields: {
        from: { type: graphql_1.GraphQLString },
        to: { type: graphql_1.GraphQLString },
    },
    description: "The updated properties for an user info timeline"
});
exports.UserInfoExperienceProject = new graphql_1.GraphQLObjectType({
    name: "UserInfoExperienceProject",
    fields: {
        name: { type: graphql_1.GraphQLString },
        url: { type: graphql_1.GraphQLString },
        position: { type: graphql_1.GraphQLString },
        member: { type: graphql_1.GraphQLInt },
        description: { type: graphql_1.GraphQLString },
    },
    description: "Represents an user info experience project."
});
exports.UserInfoExperienceProjectInput = new graphql_1.GraphQLInputObjectType({
    name: "UserInfoExperienceProjectInput",
    fields: {
        name: { type: graphql_1.GraphQLString },
        url: { type: graphql_1.GraphQLString },
        position: { type: graphql_1.GraphQLString },
        member: { type: graphql_1.GraphQLInt },
        description: { type: graphql_1.GraphQLString },
    },
    description: "The updated properties for an user info experience project."
});
exports.UserInfoExperience = new graphql_1.GraphQLObjectType({
    name: "UserInfoExperience",
    fields: {
        time: { type: exports.UserInfoTimeline },
        company: { type: graphql_1.GraphQLString },
        position: { type: graphql_1.GraphQLString },
        level: { type: types_2.JobLevel },
        description: { type: graphql_1.GraphQLString },
        projects: { type: new graphql_1.GraphQLList(exports.UserInfoExperienceProject) },
    },
    description: "Represents an user info experience."
});
exports.UserInfoExperienceInput = new graphql_1.GraphQLInputObjectType({
    name: "UserInfoExperienceInput",
    fields: {
        time: { type: exports.UserInfoTimelineInput },
        company: { type: graphql_1.GraphQLString },
        position: { type: graphql_1.GraphQLString },
        level: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        projects: { type: new graphql_1.GraphQLList(exports.UserInfoExperienceProjectInput) },
    },
    description: "The updated properties for an user info experience."
});
exports.UserInfoEducation = new graphql_1.GraphQLObjectType({
    description: "Represents an user info education.",
    fields: {
        time: { type: exports.UserInfoTimeline },
        school: { type: graphql_1.GraphQLString },
        major: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
    },
    name: "UserInfoEducation"
});
exports.UserInfoFavoriteLocation = new graphql_1.GraphQLObjectType({
    name: "UserInfoFavoriteLocation",
    fields: {
        city: { type: types_7.City },
        district: { type: types_8.District },
        ward: { type: types_9.Ward },
    },
    description: "Represents an user info favorite location."
});
exports.UserInfoFavoriteLocationInput = new graphql_1.GraphQLInputObjectType({
    name: "UserInfoFavoriteLocationInput",
    fields: {
        city: { type: graphql_1.GraphQLString },
        district: { type: graphql_1.GraphQLString },
        ward: { type: graphql_1.GraphQLString },
    },
    description: "The updated properties for an user info favorite location."
});
exports.UserInfoEducationInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for an user info education.",
    fields: {
        time: { type: exports.UserInfoTimelineInput },
        school: { type: graphql_1.GraphQLString },
        major: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
    },
    name: "UserInfoEducationInput"
});
exports.UserInfoFavorite = new graphql_1.GraphQLObjectType({
    name: "UserInfoFavorite",
    fields: {
        job_type: { type: types_10.JobType },
        target: { type: graphql_1.GraphQLString },
        job_category: { type: new graphql_1.GraphQLList(types_5.JobCategory) },
        job_location: { type: new graphql_1.GraphQLList(exports.UserInfoFavoriteLocation) },
        salary: { type: graphql_1.GraphQLInt },
    },
    description: "Represents an user info favorite."
});
exports.UserInfoFavoriteInput = new graphql_1.GraphQLInputObjectType({
    name: "UserInfoFavoriteInput",
    fields: {
        job_type: { type: graphql_1.GraphQLString },
        target: { type: graphql_1.GraphQLString },
        job_category: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
        job_location: { type: new graphql_1.GraphQLList(exports.UserInfoFavoriteLocationInput) },
        salary: { type: graphql_1.GraphQLInt },
    },
    description: "The updated properties for an user info favorite."
});
exports.UserInfo = new graphql_1.GraphQLObjectType({
    description: "Represents an user info.",
    fields: {
        job_open: { type: graphql_1.GraphQLBoolean },
        avatar: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        birthday: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        date: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
        website: { type: graphql_1.GraphQLString },
        address: { type: exports.UserInfoAddress },
        info: { type: graphql_1.GraphQLString },
        experience: { type: new graphql_1.GraphQLList(exports.UserInfoExperience) },
        education: { type: new graphql_1.GraphQLList(exports.UserInfoEducation) },
        favorite_job: { type: new graphql_1.GraphQLList(exports.UserInfoFavorite) },
    },
    name: "UserInfo"
});
exports.UserInfoInput = new graphql_1.GraphQLInputObjectType({
    description: "The updated properties for an user info.",
    fields: {
        job_open: { type: graphql_1.GraphQLBoolean },
        avatar: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        birthday: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        date: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
        website: { type: graphql_1.GraphQLString },
        address: { type: exports.UserInfoAddressInput },
        info: { type: graphql_1.GraphQLString },
        experience: { type: new graphql_1.GraphQLList(exports.UserInfoExperienceInput) },
        education: { type: new graphql_1.GraphQLList(exports.UserInfoEducationInput) },
        favorite_job: { type: new graphql_1.GraphQLList(exports.UserInfoFavoriteInput) },
    },
    name: "UserInfoInput"
});
exports.User = new graphql_1.GraphQLObjectType({
    description: "Represents an user.",
    fields: {
        _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        email: { type: graphql_1.GraphQLString },
        psid: { type: graphql_1.GraphQLString },
        first_name: { type: graphql_1.GraphQLString },
        last_name: { type: graphql_1.GraphQLString },
        birth_day: { type: graphql_1.GraphQLString },
        avatar: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        login_type: { type: graphql_1.GraphQLString },
        spam: { type: graphql_1.GraphQLInt },
        customize_info: { type: exports.UserCustomizeInfo },
        info: { type: exports.UserInfo },
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
        _id: { type: graphql_1.GraphQLString },
        first_name: { type: graphql_1.GraphQLString },
        last_name: { type: graphql_1.GraphQLString },
        psid: { type: graphql_1.GraphQLString },
        birth_day: { type: graphql_1.GraphQLString },
        avatar: { type: graphql_1.GraphQLString },
        gender: { type: graphql_1.GraphQLString },
        login_type: { type: graphql_1.GraphQLString },
        spam: { type: graphql_1.GraphQLInt },
        customize_info: { type: exports.UserCustomizeInfoInput },
        info: { type: exports.UserInfoInput },
    },
    name: "UserInput",
    description: "The updated properties for an user.",
});
exports.UserArguments = {
    _id: { type: graphql_1.GraphQLString },
    email: { type: graphql_1.GraphQLString },
};
//# sourceMappingURL=index.js.map