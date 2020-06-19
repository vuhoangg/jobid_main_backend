import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {PageInfo} from "../../types";
import {JobLevel} from "../../job_level/types";
import {JobLocation} from "../../job_location/types";
import {JobSkill, JobSkillInput} from "../../job_skill/types";
import {JobCategory} from "../../job_category/types";
import {Benefit} from "../../benefit/types";

const UserEducationHistory = new GraphQLObjectType({
  description: "Represents an user education history",
  fields: {
    subject: {type: GraphQLString},
    school: {type: GraphQLString},
    qualification: {type: GraphQLString},
    from_month: {type: GraphQLString},
    to_month: {type: GraphQLString},
    achievement: {type: GraphQLString},
  },
  name: "UserEducationHistory"
});

const UserEducationHistoryInput = new GraphQLInputObjectType({
  description: "The updated properties for an user education history",
  fields: {
    subject: {type: GraphQLString},
    school: {type: GraphQLString},
    qualification: {type: GraphQLString},
    from_month: {type: GraphQLString},
    to_month: {type: GraphQLString},
    achievement: {type: GraphQLString},
  },
  name: "UserEducationHistoryInput"
});

const UserEmploymentHistory = new GraphQLObjectType({
  description: "Represents an user employment history",
  fields: {
    position: {type: GraphQLString},
    company: {type: GraphQLString},
    from_month: {type: GraphQLString},
    to_month: {type: GraphQLString},
    description: {type: GraphQLString},
  },
  name: "UserEmploymentHistory"
});

const UserEmploymentHistoryInput = new GraphQLInputObjectType({
  description: "The updated properties for an user employment history",
  fields: {
    position: {type: GraphQLString},
    company: {type: GraphQLString},
    from_month: {type: GraphQLString},
    to_month: {type: GraphQLString},
    description: {type: GraphQLString},
  },
  name: "UserEmploymentHistoryInput"
});

const UserLanguage = new GraphQLObjectType({
  description: "Represents an user language",
  fields: {
    lang: {type: GraphQLString},
    level: {type: GraphQLString},
  },
  name: "UserLanguage"
});

const UserLanguageInput = new GraphQLInputObjectType({
  description: "The updated properties for an user language",
  fields: {
    lang: {type: GraphQLString},
    level: {type: GraphQLString},
  },
  name: "UserLanguageInput"
});

const UserWorkPreference = new GraphQLObjectType({
  description: "Represents an user work preference",
  fields: {
    job_location: {type: new GraphQLList(JobLocation)},
    job_category: {type: new GraphQLList(JobCategory)},
    job_level: {type: JobLevel},
    salary: {type: GraphQLString},
    benefit: {type: new GraphQLList(Benefit)},
  },
  name: "UserWorkPreference"
});

const UserWorkPreferenceInput = new GraphQLInputObjectType({
  description: "The updated properties for an user work preference",
  fields: {
    job_location: {type: new GraphQLList(GraphQLString)},
    job_category: {type: new GraphQLList(GraphQLString)},
    job_level: {type: GraphQLString},
    salary: {type: GraphQLString},
    benefit: {type: new GraphQLList(GraphQLString)},
  },
  name: "UserWorkPreferenceInput"
});

export const UserCustomizeInfo = new GraphQLObjectType({
  description: "Represents an user customize info.",
  fields: {
    cover: {type: GraphQLString},
    avatar: {type: GraphQLString},
    files: {type: new GraphQLList(GraphQLString)},
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    current_job_title: {type: GraphQLString},
    current_job_company: {type: GraphQLString},
    current_job_level: {type: JobLevel},
    current_experience_number: {type: GraphQLInt},
    phone: {type: GraphQLString},
    birthday: {type: GraphQLString},
    nation: {type: GraphQLString},
    gender: {type: GraphQLString},
    status: {type: GraphQLString},

    location: {type: JobLocation},
    specific_address: {type: GraphQLString},
    intro: {type: GraphQLString},
    skill: {type: new GraphQLList(JobSkill)},
    language: {type: new GraphQLList(UserLanguage)},
    employment_history: {type: new GraphQLList(UserEmploymentHistory)},
    education_history: {type: new GraphQLList(UserEducationHistory)},
    work_preference: {type: UserWorkPreference},
  },
  name: "UserCustomizeInfo",
});

export const UserCustomizeInfoInput = new GraphQLInputObjectType({
  description: "The updated properties for an user customize info.",
  fields: {
    cover: {type: GraphQLString},
    avatar: {type: GraphQLString},
    files: {type: new GraphQLList(GraphQLString)},
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    current_job_title: {type: GraphQLString},
    current_job_company: {type: GraphQLString},
    current_job_level: {type: GraphQLString},
    current_experience_number: {type: GraphQLInt},
    phone: {type: GraphQLString},
    birthday: {type: GraphQLString},
    nation: {type: GraphQLString},
    gender: {type: GraphQLString},
    status: {type: GraphQLString},

    location: {type: GraphQLString},
    specific_address: {type: GraphQLString},
    intro: {type: GraphQLString},
    skill: {type: new GraphQLList(GraphQLString)},
    language: {type: new GraphQLList(UserLanguageInput)},
    employment_history: {type: new GraphQLList(UserEmploymentHistoryInput)},
    education_history: {type: new GraphQLList(UserEducationHistoryInput)},
    work_preference: {type: UserWorkPreferenceInput},
  },
  name: "UserCustomizeInfoInput",
});

export const User = new GraphQLObjectType({
  description: "Represents an user.",
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: GraphQLString},
    psid: {type: GraphQLString},
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    birth_day: {type: GraphQLString},
    avatar: {type: GraphQLString},
    gender: {type: GraphQLString},
    login_type: {type: GraphQLString},
    spam: {type: GraphQLInt},
    customize_info: {type: UserCustomizeInfo},

    created_at: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "User",
});
export const UserEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
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
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "UserConnection",
});

export const UserInput = new GraphQLInputObjectType({
  fields: {
    _id: {type: GraphQLString},
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    psid: {type: GraphQLString},
    birth_day: {type: GraphQLString},
    avatar: {type: GraphQLString},
    gender: {type: GraphQLString},
    login_type: {type: GraphQLString},
    spam: {type: GraphQLInt},
    customize_info: {type: UserCustomizeInfoInput},
  },
  name: "UserInput",
  description: "The updated properties for an user.",
});

export const UserArguments = {
  _id: {type: GraphQLString},
};
