import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";
import { PageInfo } from "../../types";

export const InfoInput = new GraphQLInputObjectType({
  description: "",
  fields: {
    info_resumeTitle: {
      type: GraphQLString,
    },
    info_name: {
      type: GraphQLString,
    },
    info_birthday: {
      type: GraphQLString,
    },
    info_email: {
      type: GraphQLString,
    },
    info_phone: {
      type: GraphQLString,
    },
    info_address: {
      type: GraphQLString,
    },
  },
  name: "InfoInput",
});

export const EducationInput = new GraphQLInputObjectType({
  description: "",
  fields: {
    id: {
      type: GraphQLString,
    },
    education_school: {
      type: GraphQLString,
    },
    education_course: {
      type: GraphQLString,
    },
    education_specialized: {
      type: GraphQLString,
    },
    education_detail: {
      type: GraphQLString,
    },
  },
  name: "EducationInput",
});

export const TargetInput = new GraphQLInputObjectType({
  description: "",
  fields: {
    target_short: {
      type: GraphQLString,
    },
    target_long: {
      type: GraphQLString,
    },
    target_detail: {
      type: GraphQLString,
    },
  },
  name: "TargetInput",
});

export const InterestInput = new GraphQLInputObjectType({
  description: "",
  fields: {
    id: { type: GraphQLString },
    interest_name: { type: GraphQLString },
  },
  name: "InterestInput",
});

export const ExperienceInput = new GraphQLInputObjectType({
  description: "",
  fields: {
    id: {
      type: GraphQLString,
    },
    experience_time: {
      type: GraphQLString,
    },
    experience_company: {
      type: GraphQLString,
    },
    experience_title: {
      type: GraphQLString,
    },
    experience_detail: {
      type: GraphQLString,
    },
  },
  name: "ExperienceInput",
});

export const SkillInput = new GraphQLInputObjectType({
  description: "",
  fields: {
    id: {
      type: GraphQLString,
    },
    skill_title: {
      type: GraphQLString,
    },
    skill_level: {
      type: GraphQLInt,
    },
  },
  name: "SkillInput",
});

export const PersonInput = new GraphQLInputObjectType({
  description: "",
  fields: {
    id: {
      type: GraphQLString,
    },
    person_name: {
      type: GraphQLString,
    },
    person_company: {
      type: GraphQLString,
    },
    person_email: {
      type: GraphQLString,
    },
    person_phone: {
      type: GraphQLString,
    },
  },
  name: "PersonInput",
});

export const Info = new GraphQLObjectType({
  description: "",
  fields: {
    info_resumeTitle: {
      type: GraphQLString,
    },
    info_name: {
      type: GraphQLString,
    },
    info_birthday: {
      type: GraphQLString,
    },
    info_email: {
      type: GraphQLString,
    },
    info_phone: {
      type: GraphQLString,
    },
    info_address: {
      type: GraphQLString,
    },
  },
  name: "Info",
});

export const Education = new GraphQLObjectType({
  description: "",
  fields: {
    id: {
      type: GraphQLString,
    },
    education_school: {
      type: GraphQLString,
    },
    education_course: {
      type: GraphQLString,
    },
    education_specialized: {
      type: GraphQLString,
    },
    education_detail: {
      type: GraphQLString,
    },
  },
  name: "Education",
});

export const Target = new GraphQLObjectType({
  description: "",
  fields: {
    target_short: {
      type: GraphQLString,
    },
    target_long: {
      type: GraphQLString,
    },
    target_detail: {
      type: GraphQLString,
    },
  },
  name: "Target",
});

export const Interest = new GraphQLObjectType({
  description: "",
  fields: {
    id: { type: GraphQLString },
    interest_name: { type: GraphQLString },
  },
  name: "Interest",
});

export const Experience = new GraphQLObjectType({
  description: "",
  fields: {
    id: {
      type: GraphQLString,
    },
    experience_time: {
      type: GraphQLString,
    },
    experience_company: {
      type: GraphQLString,
    },
    experience_title: {
      type: GraphQLString,
    },
    experience_detail: {
      type: GraphQLString,
    },
  },
  name: "Experience",
});

export const Skill = new GraphQLObjectType({
  description: "",
  fields: {
    id: {
      type: GraphQLString,
    },
    skill_title: {
      type: GraphQLString,
    },
    skill_level: {
      type: GraphQLInt,
    },
  },
  name: "Skill",
});

export const Person = new GraphQLObjectType({
  description: "",
  fields: {
    id: {
      type: GraphQLString,
    },
    person_name: {
      type: GraphQLString,
    },
    person_company: {
      type: GraphQLString,
    },
    person_email: {
      type: GraphQLString,
    },
    person_phone: {
      type: GraphQLString,
    },
  },
  name: "Person",
});

export const CurriculumVitaeInput = new GraphQLInputObjectType({
  description: "",
  fields: {
    _id: { type: GraphQLString },
    theme_id: { type: new GraphQLNonNull(GraphQLString) },
    user_created: { type: new GraphQLNonNull(GraphQLString) },
    image_url: {
      type: new GraphQLNonNull(GraphQLString),
    },
    pdf_url: {
      type: new GraphQLNonNull(GraphQLString),
    },
    avatar: { type: GraphQLString },
    info: { type: InfoInput },
    education: {
      type: new GraphQLList(EducationInput),
    },
    target: {
      type: TargetInput,
    },
    interest: {
      type: new GraphQLList(InterestInput),
    },
    experience: {
      type: new GraphQLList(ExperienceInput),
    },
    skill: { type: new GraphQLList(SkillInput) },
    person: {
      type: new GraphQLList(PersonInput),
    },
  },
  name: "CurriculumVitaeInput",
});

export const CurriculumVitae = new GraphQLObjectType({
  description: "",
  fields: {
    _id: { type: GraphQLString },
    theme_id: { type: new GraphQLNonNull(GraphQLString) },
    user_created: { type: new GraphQLNonNull(GraphQLString) },
    image_url: {
      type: new GraphQLNonNull(GraphQLString),
    },
    pdf_url: {
      type: new GraphQLNonNull(GraphQLString),
    },
    avatar: { type: GraphQLString },
    info: { type: Info },
    education: {
      type: new GraphQLList(Education),
    },
    target: {
      type: Target,
    },
    interest: {
      type: new GraphQLList(Interest),
    },
    experience: {
      type: new GraphQLList(Experience),
    },
    skill: { type: new GraphQLList(Skill) },
    person: {
      type: new GraphQLList(Person),
    },
  },
  name: "CurriculumVitae",
});
