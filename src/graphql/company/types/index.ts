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
import { JobCategory, JobCategoryInput } from "../../job_category/types";
import { JobLocation } from "../../job_location/types";
import { Benefit } from "../../benefit/types";

export const MediaStory = new GraphQLObjectType({
  description: "Represents a media story.",
  fields: {
    vi_title: { type: GraphQLString },
    en_title: { type: GraphQLString },
    vi_content: { type: new GraphQLList(GraphQLString) },
    en_content: { type: new GraphQLList(GraphQLString) },
    media_type: { type: GraphQLString },
    media_link: { type: GraphQLString },
  },
  name: "MediaStory",
});
export const MediaStoryInput = new GraphQLInputObjectType({
  description: "The updated properties for a media story.",
  fields: {
    vi_title: { type: GraphQLString },
    en_title: { type: GraphQLString },
    vi_content: { type: new GraphQLList(GraphQLString) },
    en_content: { type: new GraphQLList(GraphQLString) },
    media_type: { type: GraphQLString },
    media_link: { type: GraphQLString },
  },
  name: "MediaStoryInput",
});

export const TextStory = new GraphQLObjectType({
  description: "Represents a text story.",
  fields: {
    vi_title: { type: GraphQLString },
    en_title: { type: GraphQLString },
    vi_content: { type: new GraphQLList(GraphQLString) },
    en_content: { type: new GraphQLList(GraphQLString) },
  },
  name: "TextStory",
});
export const TextStoryInput = new GraphQLInputObjectType({
  description: "The updated properties for a text story.",
  fields: {
    vi_title: { type: GraphQLString },
    en_title: { type: GraphQLString },
    vi_content: { type: new GraphQLList(GraphQLString) },
    en_content: { type: new GraphQLList(GraphQLString) },
  },
  name: "TextStoryInput",
});
export const People = new GraphQLObjectType({
  description: "Represents a person.",
  fields: {
    vi_name: { type: GraphQLString },
    en_name: { type: GraphQLString },
    vi_content: { type: new GraphQLList(GraphQLString) },
    en_content: { type: new GraphQLList(GraphQLString) },
    vi_position: { type: GraphQLString },
    en_position: { type: GraphQLString },
    media_link: { type: GraphQLString },
  },
  name: "People",
});
export const PeopleInput = new GraphQLInputObjectType({
  description: "The updated properties for a person.",
  fields: {
    vi_name: { type: GraphQLString },
    en_name: { type: GraphQLString },
    vi_content: { type: new GraphQLList(GraphQLString) },
    en_content: { type: new GraphQLList(GraphQLString) },
    vi_position: { type: GraphQLString },
    en_position: { type: GraphQLString },
    media_link: { type: GraphQLString },
  },
  name: "PeopleInput",
});
export const BenefitContent = new GraphQLObjectType({
  description: "Represents a benefit content.",
  fields: {
    vi_content: { type: GraphQLString },
    en_content: { type: GraphQLString },
    id: { type: Benefit },
  },
  name: "BenefitContent",
});
export const BenefitContentInput = new GraphQLInputObjectType({
  description: "The updated properties for a benefit content.",
  fields: {
    vi_content: { type: GraphQLString },
    en_content: { type: GraphQLString },
    id: { type: GraphQLString },
  },
  name: "BenefitContentInput",
});
export const Company = new GraphQLObjectType({
  description: "Represents a company.",
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    default_lang: {type: new GraphQLNonNull(GraphQLString)},
    en_name: {type: GraphQLString},
    vi_name: {type: GraphQLString},
    job_category: {type: new GraphQLList(JobCategory)},
    company_type: {type: GraphQLString},
    job_location: {type: new GraphQLList(JobLocation)},
    verify_status: {type: GraphQLBoolean},
    premium_status: {type: GraphQLBoolean},
    address: {type: new GraphQLList(GraphQLString)},
    album: {type: new GraphQLList(GraphQLString)},
    en_slug: {type: GraphQLString},
    vi_slug: {type: GraphQLString},
    logo: {type: GraphQLString},
    cover: {type: GraphQLString},
    website: {type: GraphQLString},
    region: {type: GraphQLString},
    phone: {type: GraphQLString},
    facebook: {type: GraphQLString},
    youtube: {type: GraphQLString},
    address_contact: {type: GraphQLString},
    created_by: {type: GraphQLString},
    media_story: {type: new GraphQLList(MediaStory)},
    text_story: {type: new GraphQLList(TextStory)},
    people: {type: new GraphQLList(People)},
    benefit: {type: new GraphQLList(BenefitContent)},
    follow: {type: GraphQLInt},
    seo_title: {type: GraphQLString},
    seo_description: {type: GraphQLString},
    created_at: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)},
    min_size: { type: GraphQLInt },
    max_size: { type: GraphQLInt },
  },
  name: "Company",
});
export const CompanyEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: {
      description: "The item at the end of CompanyEdge.",
      resolve: (parent) => parent.node,
      type: new GraphQLNonNull(Company),
    },
  },
  name: "CompanyEdge",
});

export const CompanyConnection = new GraphQLObjectType({
  description: "List of companys.",
  fields: {
    edges: {
      resolve: (parent) => parent.edges,
      type: new GraphQLNonNull(new GraphQLList(CompanyEdge)),
    },
    pageInfo: { type: new GraphQLNonNull(PageInfo) },
  },
  name: "CompanyConnection",
});

export const CompanyInput = new GraphQLInputObjectType({
  fields: {
    _id: {type: GraphQLString},
    default_lang: {type: GraphQLString},
    en_name: {type: GraphQLString},
    vi_name: {type: GraphQLString},
    job_category: {type: new GraphQLList(JobCategoryInput)},
    company_type: {type: GraphQLString},
    job_location: {type: new GraphQLList(GraphQLString)},
    verify_status: {type: GraphQLBoolean},
    premium_status: {type: GraphQLBoolean},
    address: {type: new GraphQLList(GraphQLString)},
    album: {type: new GraphQLList(GraphQLString)},
    en_slug: {type: GraphQLString},
    vi_slug: {type: GraphQLString},
    logo: {type: GraphQLString},
    cover: {type: GraphQLString},
    website: {type: GraphQLString},
    region: {type: GraphQLString},
    phone: {type: GraphQLString},
    facebook: {type: GraphQLString},
    youtube: {type: GraphQLString},
    address_contact: {type: GraphQLString},
    created_by: {type: GraphQLString},
    media_story: {type: new GraphQLList(MediaStoryInput)},
    text_story: {type: new GraphQLList(TextStoryInput)},
    people: {type: new GraphQLList(PeopleInput)},
    benefit: {type: new GraphQLList(BenefitContentInput)},
    seo_title: {type: GraphQLString},
    seo_description: {type: GraphQLString},
  },
  name: "CompanyInput",
  description: "The updated properties for a company.",
});

export const AssignPermissionInput = new GraphQLInputObjectType({
  fields: {
    listUser: {type: new GraphQLList(GraphQLString)},
    company: {type: new GraphQLNonNull(GraphQLString)},
    permission: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "AssignPermissionInput",
  description: "The updated properties for a group permission.",
});

export const AssignPermissionOnput = new GraphQLObjectType({
  fields: {
    status: {type: GraphQLBoolean},
  },
  name: "AssignPermissionOnput",
  description: "The updated properties for a group permission.",
});

export const CompanyArguments = {
  _id: { type: GraphQLString },
  slug: { type: GraphQLString },
};
