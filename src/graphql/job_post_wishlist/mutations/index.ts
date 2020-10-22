import { GraphQLNonNull } from "graphql";
import { JobPostWishlist, JobPostWishlistInput } from "../types";
import { createJobPostWishlist, deleteJobPostWishlist } from "../resolvers/update";

const jobPostWishlistMutations = {
    jobPostWishlistCreate: {
        args: { input: { type: GraphQLNonNull(JobPostWishlistInput) } },
        resolve: (source, args, context, info) => createJobPostWishlist(source, args, context, info),
        type: new GraphQLNonNull(JobPostWishlist),
    },
    jobPostWishlistDelete: {
        args: { input: { type: GraphQLNonNull(JobPostWishlistInput) } },
        resolve: (source, args, context, info) => deleteJobPostWishlist(source, args, context, info),
        type: new GraphQLNonNull(JobPostWishlist),
    },
};
export default jobPostWishlistMutations;
