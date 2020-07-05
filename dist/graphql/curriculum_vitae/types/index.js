"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurriculumVitaeArguments = exports.CurriculumVitaeConnection = exports.CurriculumVitaeEdge = exports.CurriculumVitae = exports.CurriculumVitaeInput = exports.Person = exports.Skill = exports.Experience = exports.Interest = exports.Target = exports.Education = exports.Info = exports.PersonInput = exports.SkillInput = exports.ExperienceInput = exports.InterestInput = exports.TargetInput = exports.EducationInput = exports.InfoInput = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../types");
exports.InfoInput = new graphql_1.GraphQLInputObjectType({
    description: "info input",
    fields: {
        info_resumeTitle: {
            type: graphql_1.GraphQLString,
        },
        info_name: {
            type: graphql_1.GraphQLString,
        },
        info_birthday: {
            type: graphql_1.GraphQLString,
        },
        info_email: {
            type: graphql_1.GraphQLString,
        },
        info_phone: {
            type: graphql_1.GraphQLString,
        },
        info_address: {
            type: graphql_1.GraphQLString,
        },
    },
    name: "InfoInput",
});
exports.EducationInput = new graphql_1.GraphQLInputObjectType({
    description: "education input",
    fields: {
        id: {
            type: graphql_1.GraphQLString,
        },
        education_school: {
            type: graphql_1.GraphQLString,
        },
        education_course: {
            type: graphql_1.GraphQLString,
        },
        education_specialized: {
            type: graphql_1.GraphQLString,
        },
        education_detail: {
            type: graphql_1.GraphQLString,
        },
    },
    name: "EducationInput",
});
exports.TargetInput = new graphql_1.GraphQLInputObjectType({
    description: "target input",
    fields: {
        target_short: {
            type: graphql_1.GraphQLString,
        },
        target_long: {
            type: graphql_1.GraphQLString,
        },
        target_detail: {
            type: graphql_1.GraphQLString,
        },
    },
    name: "TargetInput",
});
exports.InterestInput = new graphql_1.GraphQLInputObjectType({
    description: "interest input",
    fields: {
        id: { type: graphql_1.GraphQLString },
        interest_name: { type: graphql_1.GraphQLString },
    },
    name: "InterestInput",
});
exports.ExperienceInput = new graphql_1.GraphQLInputObjectType({
    description: "experience input",
    fields: {
        id: {
            type: graphql_1.GraphQLString,
        },
        experience_time: {
            type: graphql_1.GraphQLString,
        },
        experience_company: {
            type: graphql_1.GraphQLString,
        },
        experience_title: {
            type: graphql_1.GraphQLString,
        },
        experience_detail: {
            type: graphql_1.GraphQLString,
        },
    },
    name: "ExperienceInput",
});
exports.SkillInput = new graphql_1.GraphQLInputObjectType({
    description: "skill input",
    fields: {
        id: {
            type: graphql_1.GraphQLString,
        },
        skill_title: {
            type: graphql_1.GraphQLString,
        },
        skill_level: {
            type: graphql_1.GraphQLInt,
        },
    },
    name: "SkillInput",
});
exports.PersonInput = new graphql_1.GraphQLInputObjectType({
    description: "peron input",
    fields: {
        id: {
            type: graphql_1.GraphQLString,
        },
        person_name: {
            type: graphql_1.GraphQLString,
        },
        person_company: {
            type: graphql_1.GraphQLString,
        },
        person_email: {
            type: graphql_1.GraphQLString,
        },
        person_phone: {
            type: graphql_1.GraphQLString,
        },
    },
    name: "PersonInput",
});
exports.Info = new graphql_1.GraphQLObjectType({
    description: "info",
    fields: {
        info_resumeTitle: {
            type: graphql_1.GraphQLString,
        },
        info_name: {
            type: graphql_1.GraphQLString,
        },
        info_birthday: {
            type: graphql_1.GraphQLString,
        },
        info_email: {
            type: graphql_1.GraphQLString,
        },
        info_phone: {
            type: graphql_1.GraphQLString,
        },
        info_address: {
            type: graphql_1.GraphQLString,
        },
    },
    name: "Info",
});
exports.Education = new graphql_1.GraphQLObjectType({
    description: "education",
    fields: {
        id: {
            type: graphql_1.GraphQLString,
        },
        education_school: {
            type: graphql_1.GraphQLString,
        },
        education_course: {
            type: graphql_1.GraphQLString,
        },
        education_specialized: {
            type: graphql_1.GraphQLString,
        },
        education_detail: {
            type: graphql_1.GraphQLString,
        },
    },
    name: "Education",
});
exports.Target = new graphql_1.GraphQLObjectType({
    description: "target",
    fields: {
        target_short: {
            type: graphql_1.GraphQLString,
        },
        target_long: {
            type: graphql_1.GraphQLString,
        },
        target_detail: {
            type: graphql_1.GraphQLString,
        },
    },
    name: "Target",
});
exports.Interest = new graphql_1.GraphQLObjectType({
    description: "interest",
    fields: {
        id: { type: graphql_1.GraphQLString },
        interest_name: { type: graphql_1.GraphQLString },
    },
    name: "Interest",
});
exports.Experience = new graphql_1.GraphQLObjectType({
    description: "experience",
    fields: {
        id: {
            type: graphql_1.GraphQLString,
        },
        experience_time: {
            type: graphql_1.GraphQLString,
        },
        experience_company: {
            type: graphql_1.GraphQLString,
        },
        experience_title: {
            type: graphql_1.GraphQLString,
        },
        experience_detail: {
            type: graphql_1.GraphQLString,
        },
    },
    name: "Experience",
});
exports.Skill = new graphql_1.GraphQLObjectType({
    description: "skill",
    fields: {
        id: {
            type: graphql_1.GraphQLString,
        },
        skill_title: {
            type: graphql_1.GraphQLString,
        },
        skill_level: {
            type: graphql_1.GraphQLInt,
        },
    },
    name: "Skill",
});
exports.Person = new graphql_1.GraphQLObjectType({
    description: "person",
    fields: {
        id: {
            type: graphql_1.GraphQLString,
        },
        person_name: {
            type: graphql_1.GraphQLString,
        },
        person_company: {
            type: graphql_1.GraphQLString,
        },
        person_email: {
            type: graphql_1.GraphQLString,
        },
        person_phone: {
            type: graphql_1.GraphQLString,
        },
    },
    name: "Person",
});
exports.CurriculumVitaeInput = new graphql_1.GraphQLInputObjectType({
    description: "input cv",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        theme_id: { type: graphql_1.GraphQLString },
        user_created: { type: graphql_1.GraphQLString },
        image_url: {
            type: graphql_1.GraphQLString,
        },
        pdf_url: {
            type: graphql_1.GraphQLString,
        },
        avatar: { type: graphql_1.GraphQLString },
        info: { type: exports.InfoInput },
        education: {
            type: new graphql_1.GraphQLList(exports.EducationInput),
        },
        target: {
            type: exports.TargetInput,
        },
        interest: {
            type: new graphql_1.GraphQLList(exports.InterestInput),
        },
        experience: {
            type: new graphql_1.GraphQLList(exports.ExperienceInput),
        },
        skill: { type: new graphql_1.GraphQLList(exports.SkillInput) },
        person: {
            type: new graphql_1.GraphQLList(exports.PersonInput),
        },
        status: {
            type: graphql_1.GraphQLString,
        },
    },
    name: "CurriculumVitaeInput",
});
exports.CurriculumVitae = new graphql_1.GraphQLObjectType({
    description: "output cv",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        theme_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user_created: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        image_url: {
            type: graphql_1.GraphQLString,
        },
        pdf_url: {
            type: graphql_1.GraphQLString,
        },
        avatar: { type: graphql_1.GraphQLString },
        info: { type: exports.Info },
        education: {
            type: new graphql_1.GraphQLList(exports.Education),
        },
        target: {
            type: exports.Target,
        },
        interest: {
            type: new graphql_1.GraphQLList(exports.Interest),
        },
        experience: {
            type: new graphql_1.GraphQLList(exports.Experience),
        },
        skill: { type: new graphql_1.GraphQLList(exports.Skill) },
        person: {
            type: new graphql_1.GraphQLList(exports.Person),
        },
        status: {
            type: graphql_1.GraphQLString,
        },
        created_at: { type: graphql_1.GraphQLString },
        updated_at: { type: graphql_1.GraphQLString },
    },
    name: "CurriculumVitae",
});
exports.CurriculumVitaeEdge = new graphql_1.GraphQLObjectType({
    description: "A list of edges.",
    fields: {
        cursor: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        node: {
            description: "The item at the end of CurriculumVitaeEdge.",
            resolve: (parent) => parent.node,
            type: new graphql_1.GraphQLNonNull(exports.CurriculumVitae),
        },
    },
    name: "CurriculumVitaeEdge",
});
exports.CurriculumVitaeConnection = new graphql_1.GraphQLObjectType({
    description: "List of CV.",
    fields: {
        edges: {
            resolve: (parent) => parent.edges,
            type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(exports.CurriculumVitaeEdge)),
        },
        pageInfo: { type: new graphql_1.GraphQLNonNull(types_1.PageInfo) },
    },
    name: "CurriculumVitaeConnection",
});
exports.CurriculumVitaeArguments = {
    _id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
};
//# sourceMappingURL=index.js.map