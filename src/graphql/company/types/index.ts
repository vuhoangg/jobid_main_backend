import {GroupPermission} from './../../group_permission/types';
import {User} from './../../user/types';
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
import {PageInfo} from "../../types";
import {JobCategory} from "../../job_category/types";
import {Benefit} from "../../benefit/types";
import {City} from "../../city/types";
import {District} from "../../district/types";
import {Ward} from "../../ward/types";


export const Story = new GraphQLObjectType({
  description: "Represents a story.",
  fields: {
    title: {type: GraphQLString},
    content: {type: GraphQLString},
    media_type: {type: GraphQLString},
    media_link: {type: GraphQLString},
  },
  name: "Story",
});

export const StoryInput = new GraphQLInputObjectType({
  description: "The updated properties for a story.",
  fields: {
    title: {type: GraphQLString},
    content: {type: GraphQLString},
    media_type: {type: GraphQLString},
    media_link: {type: GraphQLString},
  },
  name: "StoryInput",
});

export const People = new GraphQLObjectType({
  description: "Represents a person.",
  fields: {
    name: {type: GraphQLString},
    content: {type: GraphQLString},
    position: {type: GraphQLString},
    avatar: {type: GraphQLString},
  },
  name: "People",
});
export const PeopleInput = new GraphQLInputObjectType({
  description: "The updated properties for a person.",
  fields: {
    name: {type: GraphQLString},
    content: {type: GraphQLString},
    position: {type: GraphQLString},
    avatar: {type: GraphQLString},
  },
  name: "PeopleInput",
});
export const BenefitContent = new GraphQLObjectType({
  description: "Represents a benefit content.",
  fields: {
    content: {type: GraphQLString},
    id: {type: Benefit},
  },
  name: "BenefitContent",
});
export const BenefitContentInput = new GraphQLInputObjectType({
  description: "The updated properties for a benefit content.",
  fields: {
    content: {type: GraphQLString},
    id: {type: GraphQLString},
  },
  name: "BenefitContentInput",
});
export const Office = new GraphQLObjectType({
  description: "Represents a office content.",
  fields: {
    city: {type: City},
    district: {type: District},
    ward: {type: Ward},
    address: {type: GraphQLString},
    lat: {type: GraphQLFloat},
    lng: {type: GraphQLFloat},
  },
  name: "Office"
});
export const OfficeInput = new GraphQLInputObjectType({
  description: "The updated properties for a office.",
  fields: {
    city: {type: GraphQLString},
    district: {type: GraphQLString},
    ward: {type: GraphQLString},
    address: {type: GraphQLString},
    lat: {type: GraphQLFloat},
    lng: {type: GraphQLFloat},
  },
  name: "OfficeInput"
});

export const AlbumImage = new GraphQLObjectType({
  description: "Represents an album image",
  fields: {
    src: {type: GraphQLString},
    description: {type: GraphQLString},
  },
  name: "AlbumImage",
});

export const AlbumImageInput = new GraphQLInputObjectType({
  description: "The updated properties for an album image",
  fields: {
    src: {type: GraphQLString},
    description: {type: GraphQLString},
  },
  name: "AlbumImageInput",
});

export const Album = new GraphQLObjectType({
  description: "Represents an album",
  fields: {
    name: {type: GraphQLString},
    images: {type: new GraphQLList(AlbumImage)}
  },
  name: "Album"
});

export const AlbumInput = new GraphQLInputObjectType({
  description: "The updated properties for an album",
  fields: {
    name: {type: GraphQLString},
    images: {type: new GraphQLList(AlbumImageInput)}
  },
  name: "AlbumInput"
});

export const CompanySize = new GraphQLObjectType({
  description: "Represents a company size",
  fields: {
    from: {type: GraphQLInt},
    to: {type: GraphQLInt}
  },
  name: "CompanySize"
});

export const CompanySizeInput = new GraphQLInputObjectType({
  description: "The updated properties for a company size",
  fields: {
    from: {type: GraphQLInt},
    to: {type: GraphQLInt}
  },
  name: "CompanySizeInput"
});

export const Company = new GraphQLObjectType({
  description: "Represents a company.",
  fields: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: GraphQLString},
    business_code: {type: GraphQLString},
    slogan: {type: GraphQLString},
    logo: {type: GraphQLString},
    cover: {type: GraphQLString},
    website: {type: GraphQLString},
    email: {type: GraphQLString},
    phone: {type: GraphQLString},
    facebook: {type: GraphQLString},
    youtube: {type: GraphQLString},
    video: {type: GraphQLList(GraphQLString)},
    description: {type: GraphQLString},

    company_type: {type: GraphQLString},
    job_category: {type: new GraphQLList(JobCategory)},

    verify_status: {type: GraphQLBoolean},
    premium_status: {type: GraphQLBoolean},

    album: {type: new GraphQLList(Album)},
    slug: {type: GraphQLString},


    created_by: {type: User},
    story: {type: new GraphQLList(Story)},
    office: {type: new GraphQLList(Office)},
    people: {type: new GraphQLList(People)},
    benefit: {type: new GraphQLList(BenefitContent)},
    follow: {type: GraphQLInt},
    size: {type: CompanySize},

    seo_title: {type: GraphQLString},
    seo_description: {type: GraphQLString},
    created_at: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)},
  },
  name: "Company",
});
export const CompanyEdge = new GraphQLObjectType({
  description: "A list of edges.",
  fields: {
    cursor: {type: new GraphQLNonNull(GraphQLString)},
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
    pageInfo: {type: new GraphQLNonNull(PageInfo)},
  },
  name: "CompanyConnection",
});

export const CompanyInput = new GraphQLInputObjectType({
  fields: {
    _id: {type: GraphQLString},
    name: {type: GraphQLString},
    business_code: {type: GraphQLString},
    slogan: {type: GraphQLString},
    logo: {type: GraphQLString},
    cover: {type: GraphQLString},
    website: {type: GraphQLString},
    email: {type: GraphQLString},
    phone: {type: GraphQLString},
    facebook: {type: GraphQLString},
    youtube: {type: GraphQLString},
    video: {type: GraphQLList(GraphQLString)},
    description: {type: GraphQLString},

    company_type: {type: GraphQLString},
    job_category: {type: new GraphQLList(GraphQLString)},

    verify_status: {type: GraphQLBoolean},
    premium_status: {type: GraphQLBoolean},

    album: {type: new GraphQLList(AlbumInput)},
    slug: {type: GraphQLString},

    created_by: {type: GraphQLString},
    office: {type: new GraphQLList(OfficeInput)},
    story: {type: new GraphQLList(StoryInput)},
    people: {type: new GraphQLList(PeopleInput)},
    benefit: {type: new GraphQLList(BenefitContentInput)},

    follow: {type: GraphQLInt},
    size: {type: CompanySizeInput},

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
  _id: {type: GraphQLString},
  slug: {type: GraphQLString},
};
