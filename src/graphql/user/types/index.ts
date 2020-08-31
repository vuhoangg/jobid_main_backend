import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
} from "graphql";
import { PageInfo } from "../../types";
import { JobLevel } from "../../job_level/types";
import { JobLocation } from "../../job_location/types";
import { JobSkill, JobSkillInput } from "../../job_skill/types";
import { JobCategory } from "../../job_category/types";
import { Benefit } from "../../benefit/types";
import { City } from "../../city/types";
import { District } from "../../district/types";
import { Ward } from "../../ward/types";
import { JobType } from "../../job_type/types";

const UserEducationHistory = new GraphQLObjectType({
  description: "Represents an user education history",
  fields: {
    subject: { type: GraphQLString },
    school: { type: GraphQLString },
    qualification: { type: GraphQLString },
    from_month: { type: GraphQLString },
    to_month: { type: GraphQLString },
    achievement: { type: GraphQLString },
  },
  name: "UserEducationHistory",
});

const UserEducationHistoryInput = new GraphQLInputObjectType({
  description: "The updated properties for an user education history",
  fields: {
    subject: { type: GraphQLString },
    school: { type: GraphQLString },
    qualification: { type: GraphQLString },
    from_month: { type: GraphQLString },
    to_month: { type: GraphQLString },
    achievement: { type: GraphQLString },
  },
  name: "UserEducationHistoryInput",
});

const UserEmploymentHistory = new GraphQLObjectType({
  description: "Represents an user employment history",
  fields: {
    position: { type: GraphQLString },
    company: { type: GraphQLString },
    from_month: { type: GraphQLString },
    to_month: { type: GraphQLString },
    description: { type: GraphQLString },
  },
  name: "UserEmploymentHistory",
});

const UserEmploymentHistoryInput = new GraphQLInputObjectType({
  description: "The updated properties for an user employment history",
  fields: {
    position: { type: GraphQLString },
    company: { type: GraphQLString },
    from_month: { type: GraphQLString },
    to_month: { type: GraphQLString },
    description: { type: GraphQLString },
  },
  name: "UserEmploymentHistoryInput",
});

const UserLanguage = new GraphQLObjectType({
  description: "Represents an user language",
  fields: {
    lang: { type: GraphQLString },
    level: { type: GraphQLString },
  },
  name: "UserLanguage",
});

const UserLanguageInput = new GraphQLInputObjectType({
  description: "The updated properties for an user language",
  fields: {
    lang: { type: GraphQLString },
    level: { type: GraphQLString },
  },
  name: "UserLanguageInput",
});

const UserWorkPreference = new GraphQLObjectType({
  description: "Represents an user work preference",
  fields: {
    job_location: { type: new GraphQLList(JobLocation) },
    job_category: { type: new GraphQLList(JobCategory) },
    job_level: { type: JobLevel },
    salary: { type: GraphQLString },
    benefit: { type: new GraphQLList(Benefit) },
  },
  name: "UserWorkPreference",
});

const UserWorkPreferenceInput = new GraphQLInputObjectType({
  description: "The updated properties for an user work preference",
  fields: {
    job_location: { type: new GraphQLList(GraphQLString) },
    job_category: { type: new GraphQLList(GraphQLString) },
    job_level: { type: GraphQLString },
    salary: { type: GraphQLString },
    benefit: { type: new GraphQLList(GraphQLString) },
  },
  name: "UserWorkPreferenceInput",
});

export const UserCustomizeInfo = new GraphQLObjectType({
  description: "Represents an user customize info.",
  fields: {
    cover: { type: GraphQLString },
    avatar: { type: GraphQLString },
    files: { type: new GraphQLList(GraphQLString) },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    current_job_title: { type: GraphQLString },
    current_job_company: { type: GraphQLString },
    current_job_level: { type: JobLevel },
    current_experience_number: { type: GraphQLInt },
    phone: { type: GraphQLString },
    birthday: { type: GraphQLString },
    nation: { type: GraphQLString },
    gender: { type: GraphQLString },
    status: { type: GraphQLString },

    location: { type: JobLocation },
    specific_address: { type: GraphQLString },
    intro: { type: GraphQLString },
    skill: { type: new GraphQLList(JobSkill) },
    language: { type: new GraphQLList(UserLanguage) },
    employment_history: { type: new GraphQLList(UserEmploymentHistory) },
    education_history: { type: new GraphQLList(UserEducationHistory) },
    work_preference: { type: UserWorkPreference },
  },
  name: "UserCustomizeInfo",
});

export const UserCustomizeInfoInput = new GraphQLInputObjectType({
  description: "The updated properties for an user customize info.",
  fields: {
    cover: { type: GraphQLString },
    avatar: { type: GraphQLString },
    files: { type: new GraphQLList(GraphQLString) },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    current_job_title: { type: GraphQLString },
    current_job_company: { type: GraphQLString },
    current_job_level: { type: GraphQLString },
    current_experience_number: { type: GraphQLInt },
    phone: { type: GraphQLString },
    birthday: { type: GraphQLString },
    nation: { type: GraphQLString },
    gender: { type: GraphQLString },
    status: { type: GraphQLString },

    location: { type: GraphQLString },
    specific_address: { type: GraphQLString },
    intro: { type: GraphQLString },
    skill: { type: new GraphQLList(GraphQLString) },
    language: { type: new GraphQLList(UserLanguageInput) },
    employment_history: { type: new GraphQLList(UserEmploymentHistoryInput) },
    education_history: { type: new GraphQLList(UserEducationHistoryInput) },
    work_preference: { type: UserWorkPreferenceInput },
  },
  name: "UserCustomizeInfoInput",
});

export const UserInfoAddress = new GraphQLObjectType({
  name: "UserInfoAddress",
  fields: {
    city: { type: City },
    district: { type: District },
    ward: { type: Ward },
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat },
    text: { type: GraphQLString },
  },
  description: "Represents an user info address.",
});

export const UserInfoAddressInput = new GraphQLInputObjectType({
  name: "UserInfoAddressInput",
  fields: {
    city: { type: GraphQLString },
    district: { type: GraphQLString },
    ward: { type: GraphQLString },
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat },
    text: { type: GraphQLString },
  },
  description: "The updated properties for an user info address.",
});

export const UserInfoTimeline = new GraphQLObjectType({
  name: "UserInputTimeline",
  fields: {
    from: { type: GraphQLString },
    to: { type: GraphQLString },
  },
  description: "Represents an user info timeline",
});
export const UserInfoTimelineInput = new GraphQLInputObjectType({
  name: "UserInfoTimelineInput",
  fields: {
    from: { type: GraphQLString },
    to: { type: GraphQLString },
  },
  description: "The updated properties for an user info timeline",
});

export const UserInfoExperienceProject = new GraphQLObjectType({
  name: "UserInfoExperienceProject",
  fields: {
    time: { type: UserInfoTimeline },
    name: { type: GraphQLString },
    url: { type: GraphQLString },
    position: { type: GraphQLString },
    member: { type: GraphQLInt },
    description: { type: GraphQLString },
  },
  description: "Represents an user info experience project.",
});

export const UserInfoExperienceProjectInput = new GraphQLInputObjectType({
  name: "UserInfoExperienceProjectInput",
  fields: {
    time: { type: UserInfoTimelineInput },
    name: { type: GraphQLString },
    url: { type: GraphQLString },
    position: { type: GraphQLString },
    member: { type: GraphQLInt },
    description: { type: GraphQLString },
  },
  description: "The updated properties for an user info experience project.",
});

export const UserInfoExperience = new GraphQLObjectType({
  name: "UserInfoExperience",
  fields: {
    time: { type: UserInfoTimeline },
    company: { type: GraphQLString },
    position: { type: GraphQLString },
    level: { type: JobLevel },
    description: { type: GraphQLString },
    projects: { type: new GraphQLList(UserInfoExperienceProject) },
  },
  description: "Represents an user info experience.",
});

export const UserInfoExperienceInput = new GraphQLInputObjectType({
  name: "UserInfoExperienceInput",
  fields: {
    time: { type: UserInfoTimelineInput },
    company: { type: GraphQLString },
    position: { type: GraphQLString },
    level: { type: GraphQLString },
    description: { type: GraphQLString },
    projects: { type: new GraphQLList(UserInfoExperienceProjectInput) },
  },
  description: "The updated properties for an user info experience.",
});

export const UserInfoEducation = new GraphQLObjectType({
  description: "Represents an user info education.",
  fields: {
    time: { type: UserInfoTimeline },
    school: { type: GraphQLString },
    major: { type: GraphQLString },
    description: { type: GraphQLString },
  },
  name: "UserInfoEducation",
});

export const UserInfoFavoriteLocation = new GraphQLObjectType({
  name: "UserInfoFavoriteLocation",
  fields: {
    city: { type: City },
    district: { type: District },
    ward: { type: Ward },
  },
  description: "Represents an user info favorite location.",
});

export const UserInfoFavoriteLocationInput = new GraphQLInputObjectType({
  name: "UserInfoFavoriteLocationInput",
  fields: {
    city: { type: GraphQLString },
    district: { type: GraphQLString },
    ward: { type: GraphQLString },
  },
  description: "The updated properties for an user info favorite location.",
});

export const UserInfoEducationInput = new GraphQLInputObjectType({
  description: "The updated properties for an user info education.",
  fields: {
    time: { type: UserInfoTimelineInput },
    school: { type: GraphQLString },
    major: { type: GraphQLString },
    description: { type: GraphQLString },
  },
  name: "UserInfoEducationInput",
});

export const UserInfoFavorite = new GraphQLObjectType({
  name: "UserInfoFavorite",
  fields: {
    job_type: { type: JobType },
    target: { type: GraphQLString },
    job_category: { type: new GraphQLList(JobCategory) },
    job_location: { type: new GraphQLList(UserInfoFavoriteLocation) },
    salary: { type: GraphQLInt },
  },
  description: "Represents an user info favorite.",
});

export const UserInfoFavoriteInput = new GraphQLInputObjectType({
  name: "UserInfoFavoriteInput",
  fields: {
    job_type: { type: GraphQLString },
    target: { type: GraphQLString },
    job_category: { type: new GraphQLList(GraphQLString) },
    job_location: { type: new GraphQLList(UserInfoFavoriteLocationInput) },
    salary: { type: GraphQLInt },
  },
  description: "The updated properties for an user info favorite.",
});

export const UserInfo = new GraphQLObjectType({
  description: "Represents an user info.",
  fields: {
    job_open: { type: GraphQLBoolean },
    avatar: { type: GraphQLString },
    name: { type: GraphQLString },
    birthday: { type: GraphQLString },
    gender: { type: GraphQLString },
    date: { type: GraphQLString },
    phone: { type: GraphQLString },
    website: { type: GraphQLString },
    address: { type: UserInfoAddress },
    intro: { type: GraphQLString },
    experience: { type: new GraphQLList(UserInfoExperience) },
    education: { type: new GraphQLList(UserInfoEducation) },
    favorite_job: { type: new GraphQLList(UserInfoFavorite) },
  },
  name: "UserInfo",
});

export const UserInfoInput = new GraphQLInputObjectType({
  description: "The updated properties for an user info.",
  fields: {
    job_open: { type: GraphQLBoolean },
    avatar: { type: GraphQLString },
    name: { type: GraphQLString },
    birthday: { type: GraphQLString },
    gender: { type: GraphQLString },
    date: { type: GraphQLString },
    phone: { type: GraphQLString },
    website: { type: GraphQLString },
    address: { type: UserInfoAddressInput },
    intro: { type: GraphQLString },
    experience: { type: new GraphQLList(UserInfoExperienceInput) },
    education: { type: new GraphQLList(UserInfoEducationInput) },
    favorite_job: { type: new GraphQLList(UserInfoFavoriteInput) },
  },
  name: "UserInfoInput",
});

export const User = new GraphQLObjectType({
  description: "Represents an user.",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
    psid: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    birth_day: { type: GraphQLString },
    avatar: { type: GraphQLString },
    gender: { type: GraphQLString },
    login_type: { type: GraphQLString },
    spam: { type: GraphQLInt },
    customize_info: { type: UserCustomizeInfo },
    info: { type: UserInfo },

    created_at: { type: new GraphQLNonNull(GraphQLString) },
    updated_at: { type: new GraphQLNonNull(GraphQLString) },
  },
  name: "User",
});
export const UserEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: {
      description: "The item at the end of UserEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(User),
    },
  },
  name: "UserEdge",
});
export const UserConnection = new GraphQLObjectType({
  description: "List of users.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(UserEdge)),
    },
    pageInfo: { type: new GraphQLNonNull(PageInfo) },
  },
  name: "UserConnection",
});

export const UserInput = new GraphQLInputObjectType({
  fields: {
    _id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    psid: { type: GraphQLString },
    birth_day: { type: GraphQLString },
    avatar: { type: GraphQLString },
    gender: { type: GraphQLString },
    login_type: { type: GraphQLString },
    spam: { type: GraphQLInt },
    customize_info: { type: UserCustomizeInfoInput },
    info: { type: UserInfoInput },
  },
  name: "UserInput",
  description: "The updated properties for an user.",
});

export const UserArguments = {
  _id: { type: GraphQLString },
  email: { type: GraphQLString },
};
