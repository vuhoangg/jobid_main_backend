import { GraphQLNonNull } from "graphql";
import { JobPost, JobPostInput, JobPostTrackingBySlug, JobPostTrackingBySlugInput } from "../types";
import { createJobPost, updateJobPost, trackingBySlug } from "../resolvers/update";

const jobPostMutations = {
    jobPostUpdate: {
        args: { input: { type: GraphQLNonNull(JobPostInput) } },
        resolve: (source, args, context, info) => updateJobPost(source, args, context, info),
        type: new GraphQLNonNull(JobPost),
    },
    jobPostCreate: {
        args: { input: { type: GraphQLNonNull(JobPostInput) } },
        resolve: (source, args, context, info) => createJobPost(source, args, context, info),
        type: new GraphQLNonNull(JobPost),
    },
    jobPostTrackingBySlug: {
        args: { input: { type: GraphQLNonNull(JobPostTrackingBySlugInput) } },
        resolve: (source, args, context, info) => trackingBySlug(source, args, context, info),
        type: new GraphQLNonNull(JobPostTrackingBySlug),
    }
};
export default jobPostMutations;
