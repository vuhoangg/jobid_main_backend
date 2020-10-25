import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { PageInfo } from "../../types";
import { JobLevel } from "../../job_level/types";
import { JobCategory } from "../../job_category/types";
import { Company } from "../../company/types";
import { Benefit } from "../../benefit/types";
import { User } from "../../user/types";
import { JobType } from "../../job_type/types";
import { City } from "../../city/types";
import { District } from "../../district/types";
import { Ward } from "../../ward/types";

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
  },
  name: "JobCompany",
});

export const JobCompanyInput = new GraphQLInputObjectType({
  description: "The updated properties for a job company.",
  fields: {
    ref: { type: GraphQLString },
    name: { type: GraphQLString },
  },
  name: "JobCompanyInput",
});

export const JobAddress = new GraphQLObjectType({
  description: "Represents a job address.",
  fields: {
    city: { type: City },
    district: { type: District },
    ward: { type: Ward },
    text: { type: GraphQLString },
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat },
  },
  name: "JobAddress",
});

export const JobAddressInput = new GraphQLInputObjectType({
  description: "The updated properties for a job address.",
  fields: {
    city: { type: GraphQLString },
    district: { type: GraphQLString },
    ward: { type: GraphQLString },
    text: { type: GraphQLString },
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat },
  },
  name: "JobAddressInput",
});

export const JobContact = new GraphQLObjectType({
  description: "Represents a job contact.",
  fields: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  },
  name: "JobContact",
});

export const JobContactInput = new GraphQLInputObjectType({
  description: "The updated properties for a job contact.",
  fields: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  },
  name: "JobContactInput",
});

export const JobPost = new GraphQLObjectType({
  description: "Represents a job post.",
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLString },
    slug: { type: GraphQLString },
    job_type: { type: JobType },
    job_level: { type: JobLevel },
    job_category: { type: JobCategory },
    number: { type: GraphQLInt },
    description: { type: GraphQLString },
    requirement: { type: GraphQLString },
    salary: { type: JobSalary },
    address: { type: JobAddress },
    company: { type: JobCompany },
    contact: { type: JobContact },
    image: { type: GraphQLString },
    photos: { type: new GraphQLList(GraphQLString) },
    video: { type: GraphQLString },
    benefit: { type: new GraphQLList(JobBenefit) },
    end_date: { type: GraphQLString },
    user: { type: User },
    view_count: { type: GraphQLInt },
    save_count: { type: GraphQLInt },
    apply_count: { type: GraphQLInt },
    status: { type: GraphQLString },
    seo_title: { type: GraphQLString },
    seo_description: { type: GraphQLString },
    is_featured: { type: GraphQLBoolean },
    is_wishlist: { type: GraphQLBoolean },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
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
    job_type: { type: GraphQLString },
    job_level: { type: GraphQLString },
    job_category: { type: GraphQLString },
    number: { type: GraphQLInt },
    description: { type: GraphQLString },
    requirement: { type: GraphQLString },
    salary: { type: JobSalaryInput },
    address: { type: JobAddressInput },
    company: { type: JobCompanyInput },
    contact: { type: JobContactInput },
    image: { type: GraphQLString },
    photos: { type: new GraphQLList(GraphQLString) },
    video: { type: GraphQLString },
    benefit: { type: new GraphQLList(JobBenefitInput) },
    end_date: { type: GraphQLString },
    status: { type: GraphQLString },
  },
  name: "JobPostInput",
  description: "The updated properties for a job post.",
});


export const JobPostTrackingBySlug = new GraphQLObjectType({
  fields: {
    status: { type: GraphQLBoolean },
  },
  name: "JobPostTrackingBySlug",
  description: "Represents a job post tracking"
})

export const JobPostTrackingBySlugInput = new GraphQLInputObjectType({
  fields: {
    slug: { type: GraphQLString },
  },
  name: "JobPostTrackingBySlugInput",
  description: "The updated properties for a job post tracking."
});

export const JobPostArguments = {
  _id: { type: GraphQLString },
  slug: { type: GraphQLString },
};
