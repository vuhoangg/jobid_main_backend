import { GraphQLNonNull } from "graphql";
import { PaginationArguments } from "../../types";
import { getJobPostWishlist, getJobPostWishlists } from "../resolvers/get";
import { JobPostWishlist, JobPostWishlistArguments, JobPostWishlistConnection } from "../types";

const jobPostWishlistQueries = {
    jobPostWishlist: {
        args: JobPostWishlistArguments,
        resolve: (source, args, context, info) => getJobPostWishlist(source, args, context, info),
        type: new GraphQLNonNull(JobPostWishlist),
    },
    jobPostWishlists: {
        args: PaginationArguments,
        resolve: (source, args, context, info) => getJobPostWishlists(source, args, context, info),
        type: new GraphQLNonNull(JobPostWishlistConnection),
    }
};
export default jobPostWishlistQueries;
