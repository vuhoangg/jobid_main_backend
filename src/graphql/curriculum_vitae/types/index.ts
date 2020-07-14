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
  description: "info input",
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
  description: "education input",
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
  description: "target input",
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
  description: "interest input",
  fields: {
    id: { type: GraphQLString },
    interest_name: { type: GraphQLString },
  },
  name: "InterestInput",
});

export const ExperienceInput = new GraphQLInputObjectType({
  description: "experience input",
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
  description: "skill input",
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
  description: "peron input",
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
  description: "info",
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
  description: "education",
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
  description: "target",
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
  description: "interest",
  fields: {
    id: { type: GraphQLString },
    interest_name: { type: GraphQLString },
  },
  name: "Interest",
});

export const Experience = new GraphQLObjectType({
  description: "experience",
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
  description: "skill",
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
  description: "person",
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
  description: "input cv",
  fields: {
    _id: { type: GraphQLString },
    theme_id: { type: GraphQLString },
    user_created: { type: GraphQLString },
    image_url: {
      type: GraphQLString,
    },
    pdf_url: {
      type: GraphQLString,
    },
    default: {type: GraphQLBoolean},
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
    status: {
      type: GraphQLString,
    },
  },
  name: "CurriculumVitaeInput",
});

export const CurriculumVitae = new GraphQLObjectType({
  description: "output cv",
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
    default: {type: GraphQLBoolean},
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
    status: {
      type: GraphQLString,
    },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  },
  name: "CurriculumVitae",
});

export const CurriculumVitaeEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: {
      description: "The item at the end of CurriculumVitaeEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(CurriculumVitae),
    },
  },
  name: "CurriculumVitaeEdge",
});

export const CurriculumVitaeConnection = new GraphQLObjectType({
  description: "List of CV.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(CurriculumVitaeEdge)),
    },
    pageInfo: { type: new GraphQLNonNull(PageInfo) },
  },
  name: "CurriculumVitaeConnection",
});

export const CurriculumVitaeArguments = {
  _id: { type: new GraphQLNonNull(GraphQLString) },
};
