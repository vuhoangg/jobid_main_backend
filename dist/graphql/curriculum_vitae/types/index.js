"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurriculumVitae = exports.CurriculumVitaeInput = exports.Person = exports.Skill = exports.Experience = exports.Interest = exports.Target = exports.Education = exports.Info = exports.PersonInput = exports.SkillInput = exports.ExperienceInput = exports.InterestInput = exports.TargetInput = exports.EducationInput = exports.InfoInput = void 0;
const graphql_1 = require("graphql");
exports.InfoInput = new graphql_1.GraphQLInputObjectType({
    description: "",
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
    description: "",
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
    description: "",
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
    description: "",
    fields: {
        id: { type: graphql_1.GraphQLString },
        interest_name: { type: graphql_1.GraphQLString },
    },
    name: "InterestInput",
});
exports.ExperienceInput = new graphql_1.GraphQLInputObjectType({
    description: "",
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
    description: "",
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
    description: "",
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
    description: "",
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
    description: "",
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
    description: "",
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
    description: "",
    fields: {
        id: { type: graphql_1.GraphQLString },
        interest_name: { type: graphql_1.GraphQLString },
    },
    name: "Interest",
});
exports.Experience = new graphql_1.GraphQLObjectType({
    description: "",
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
    description: "",
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
    description: "",
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
    description: "",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        theme_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user_created: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        image_url: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
        pdf_url: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
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
    },
    name: "CurriculumVitaeInput",
});
exports.CurriculumVitae = new graphql_1.GraphQLObjectType({
    description: "",
    fields: {
        _id: { type: graphql_1.GraphQLString },
        theme_id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user_created: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        image_url: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
        },
        pdf_url: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
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
    },
    name: "CurriculumVitae",
});
//# sourceMappingURL=index.js.map