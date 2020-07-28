import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
} from "graphql";
import { PageInfo } from "../../types";
import { JobLevel } from "../../job_level/types";
import { JobCategory } from "../../job_category/types";
import { JobSkill } from "../../job_skill/types";
import { JobPreferLanguage } from "../../job_prefer_language/types";
import { Company } from "../../company/types";
import { Benefit } from "../../benefit/types";
import { User } from "../../user/types";
import { JobLocation } from "../../job_location/types";

export const JobUser = new GraphQLObjectType({
  description: "Represents a job user.",
  fields: {
    ref: { type: User },
    in_company: { type: GraphQLBoolean },
  },
  name: "JobUser",
});

export const JobSalary = new GraphQLObjectType({
  description: "Represents a job salary.",
  fields: {
    min: { type: GraphQLInt },
    max: { type: GraphQLInt },
    show: { type: GraphQLBoolean },
  },
  name: "JobSalary",
});
export const JobSalaryInput = new GraphQLInputObjectType({
  description: "The updated properties for a job salary.",
  fields: {
    min: { type: GraphQLInt },
    max: { type: GraphQLInt },
    show: { type: GraphQLBoolean },
  },
  name: "JobSalaryInput",
});

export const JobBenefit = new GraphQLObjectType({
  description: "Represents a job benefit.",
  fields: {
    benefit_id: { type: Benefit },
    content: { type: GraphQLString },
  },
  name: "JobBenefit",
});

export const JobBenefitInput = new GraphQLInputObjectType({
  description: "The updated properties for a job benefit.",
  fields: {
    benefit_id: { type: GraphQLString },
    content: { type: GraphQLString },
  },
  name: "JobBenefitInput",
});

export const JobCompany = new GraphQLObjectType({
  description: "Represents a job company.",
  fields: {
    ref: { type: Company },
    name: { type: GraphQLString },
    size: { type: GraphQLString },
    address: { type: GraphQLString },
    description: { type: GraphQLString },
    benefit: { type: new GraphQLList(JobBenefit) },
    logo: { type: GraphQLString },
    photos: { type: new GraphQLList(GraphQLString) },
    video: { type: GraphQLString },
  },
  name: "JobCompany",
});

export const JobCompanyInput = new GraphQLInputObjectType({
  description: "The updated properties for a job company.",
  fields: {
    ref: { type: GraphQLString },
    name: { type: GraphQLString },
    size: { type: GraphQLString },
    address: { type: GraphQLString },
    description: { type: GraphQLString },
    benefit: { type: new GraphQLList(JobBenefitInput) },
    logo: { type: GraphQLString },
    photos: { type: new GraphQLList(GraphQLString) },
    video: { type: GraphQLString },
  },
  name: "JobCompanyInput",
});

export const JobLatLng = new GraphQLObjectType({
  description: "Lat long Job Posts",
  fields: {
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat },
  },
  name: "JobLatLng",
});

export const JobLatLngInput = new GraphQLInputObjectType({
  description: "Lat long Job Posts Input",
  fields: {
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat },
  },
  name: "JobLatLngInput",
});
export const JobPost = new GraphQLObjectType({
  description: "Represents a job post.",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    slug: { type: new GraphQLNonNull(GraphQLString) },
    job_level: { type: JobLevel },
    job_category: { type: new GraphQLList(JobCategory) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    requirement: { type: new GraphQLNonNull(GraphQLString) },
    job_location: { type: new GraphQLList(JobLocation) },
    salary: { type: JobSalary },
    job_skill: { type: new GraphQLList(JobSkill) },
    location: { type: JobLatLng },
    experience: { type: GraphQLInt },
    job_prefer_language: { type: new GraphQLList(JobPreferLanguage) },
    email_for_application: { type: new GraphQLNonNull(GraphQLString) },
    company: { type: new GraphQLNonNull(JobCompany) },
    view_count: { type: GraphQLInt },
    status: { type: GraphQLString },
    user: { type: JobUser },
    seo_title: { type: GraphQLString },
    seo_description: { type: GraphQLString },
    created_at: { type: new GraphQLNonNull(GraphQLString) },
    updated_at: { type: new GraphQLNonNull(GraphQLString) },
  },
  name: "JobPost",
});
export const JobPostEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: {
      description: "The item at the end of JobPostEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(JobPost),
    },
  },
  name: "JobPostEdge",
});
export const JobPostConnection = new GraphQLObjectType({
  description: "List of job posts.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(JobPostEdge)),
    },
    pageInfo: { type: new GraphQLNonNull(PageInfo) },
  },
  name: "JobPostConnection",
});

export const JobPostInput = new GraphQLInputObjectType({
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString }, // create
    job_level: { type: GraphQLString },
    job_category: { type: new GraphQLList(GraphQLString) },
    description: { type: GraphQLString }, // create
    requirement: { type: GraphQLString }, // create
    job_location: { type: new GraphQLList(GraphQLString) },
    salary: { type: JobSalaryInput },
    job_skill: { type: new GraphQLList(GraphQLString) },
    job_prefer_language: { type: new GraphQLList(GraphQLString) },
    experience: { type: GraphQLInt },
    email_for_application: { type: GraphQLString }, // create
    company: { type: JobCompanyInput }, // create
    location: { type: JobLatLngInput },
    status: { type: GraphQLString },
  },
  name: "JobPostInput",
  description: "The updated properties for a job post.",
});

export const JobPostArguments = {
  _id: { type: GraphQLString },
  slug: { type: GraphQLString },
};
