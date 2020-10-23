import JobPostWishlistService from "../../../db/repositories/JobPostWishlistRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";
import { authenticate } from "../../../middlewares/authenticate";

export const getJobPostWishlist = async (source, args, context, info) => {
    const fields = rootField(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    let loggedUser = null;
    if (await authenticate(context, context.res)) {
        loggedUser = context.res.locals.fullUser;
    }
    return JobPostWishlistService.getBy(getBy, fields).then(async (jobPostWishlist) => {

        let job_post = jobPostWishlist.job_post;
        job_post = Object.assign(job_post, { is_featured: false, is_wishlist: true });

        let node = {
            _id: jobPostWishlist._id,
            user: jobPostWishlist.user,
            job_post: job_post,
            created_at: jobPostWishlist.created_at,
            updated_at: jobPostWishlist.updated_at,
        };
        return node;
    });
};

export function getJobPostWishlists(source, args, context, info) {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    let limit = args.limit > 50 ? 10 : args.limit;
    return JobPostWishlistService.filter(filter, limit, args.page, infos.edges).then(async (jobPostWishlists) => {
        let edges = [];
        for (let i = 0; i < jobPostWishlists.length; i++) {
            let job_post = jobPostWishlists[i].job_post;
            job_post = Object.assign(job_post, { is_featured: false, is_wishlist: true });
            let jobPostWishlist = {
                cursor: jobPostWishlists[i]._id,
                node: {
                    _id: jobPostWishlists[i]._id,
                    user: jobPostWishlists[i].user,
                    job_post: job_post,
                    created_at: jobPostWishlists[i].created_at,
                    updated_at: jobPostWishlists[i].updated_at,
                },
            };
            edges.push(jobPostWishlist);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? await JobPostWishlistService.count(filter) : 0;
        let dataRet = {
            ...{ edges },
            pageInfo: {
                length: countData,
                hasNextPage: jobPostWishlists.length >= limit,
                hasPreviousPage: args.page > 1,
            },
        };
        return dataRet;
    });
}
