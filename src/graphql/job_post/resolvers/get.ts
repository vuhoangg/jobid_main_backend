import JobPostService from "../../../db/repositories/JobPostRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";
import { authenticateUser } from "../../../middlewares/authenticate";
import JobPostWishlistService from "../../../db/repositories/JobPostWishlistRepository";
import JobApplyService from "../../../db/repositories/JobApplyRepository";
import { seoDescription } from "../../../helpers/seo";
import JobPostReportService from "../../../db/repositories/JobPostReportRepository";
import { getBounds, getBoundsOfDistance, getDistance } from "geolib";

export const getJobPost = async (source, args, context, info) => {
  const fields = rootField(info);
  let getBy = args._id ? { _id: args._id } : { slug: args.slug };

  let jobPost = await JobPostService.getBy(getBy, fields);
  let isAuthenticated = await authenticateUser(context, context.res);

  let loggedUser = null;
  if (isAuthenticated) {
    loggedUser = context.res.locals.fullUser;
  }

  let is_featured = false;
  let is_wishlist = false;
  if (loggedUser) {
    is_wishlist = !! await JobPostWishlistService.count({ job_post: jobPost._id, user: loggedUser._id });
  }

  let save_count = await JobPostWishlistService.count({ job_post: jobPost._id });
  let report_count = await JobPostReportService.count({ job_post: jobPost._id });
  let apply_count = await JobApplyService.count({ job_post: jobPost._id });

  let node = {
    _id: jobPost._id,
    title: jobPost.title,
    slug: jobPost.slug,
    job_type: jobPost.job_type,
    job_level: jobPost.job_level,
    job_category: jobPost.job_category,
    number: jobPost.number,
    description: jobPost.description,
    requirement: jobPost.requirement,
    salary: jobPost.salary,
    address: jobPost.address,
    company: jobPost.company,
    contact: jobPost.contact,
    image: jobPost.image,
    photos: jobPost.photos,
    video: jobPost.video,
    benefit: jobPost.benefit,
    end_date: jobPost.end_date,
    user: jobPost.user,
    view_count: jobPost.view_count,
    save_count: save_count,
    apply_count: apply_count,
    report_count: report_count,
    status: jobPost.status,
    seo_title: jobPost.seo_title || jobPost.title,
    seo_description: jobPost.seo_description || seoDescription(jobPost.description),
    is_featured: is_featured,
    is_wishlist: is_wishlist,
    created_at: jobPost.created_at,
    updated_at: jobPost.updated_at,
  };
  return node;
};

export const getJobPosts = async (source, args, context, info) => {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let limit = args.limit > 1000 ? 10 : args.limit;
  let page = args.page;

  if (filter.job_near) {
    let range = Number(filter.job_near);
    let latitude = Number(filter.latitude);
    let longitude = Number(filter.longitude);

    if (latitude && longitude) {
      const bound = getBoundsOfDistance(
        { lat: latitude, lng: longitude },
        range * 1000 / Math.sqrt(2),
      );
      let coordinate = getBounds(bound);
      filter = Object.assign(filter, { coordinate: coordinate });
    }
  }


  try {
    let jobPosts = await JobPostService.filter(filter, limit, page, infos.edges);
    if (jobPosts) {
      let edges = [];

      let loggedUser = null;
      if (await authenticateUser(context, context.res)) {
        loggedUser = context.res.locals.fullUser;
      }

      for (let i = 0; i < jobPosts.length; i++) {
        let is_featured = false;
        let is_wishlist = false;
        if (loggedUser) {
          if (infos.edges['is_wishlist']) {
            is_wishlist = !! await JobPostWishlistService.count({ job_post: jobPosts[i]._id, user: loggedUser._id });
          }
        }

        let minRange = 1000000;
        let rangeLat = 0;
        let rangeLng = 0;

        if (filter.coordinate) {
          let address = jobPosts[i].address;
          for (let x = 0; x < address.length; x++) {
            if (address[x].lat && address[x].lng) {
              let computedRange = getDistance(
                { latitude: Number(filter.latitude), longitude: Number(filter.longitude) },
                { latitude: Number(address[x].lat), longitude: Number(address[x].lng) },
              )
              if (computedRange < minRange) {
                minRange = computedRange;
                rangeLat = Number(filter.latitude);
                rangeLng = Number(filter.longitude);
              }
            }
          }
        }
        let range = minRange == 1000000 ? 0 : minRange;

        let jobPost = {
          cursor: jobPosts[i]._id,
          node: {
            _id: jobPosts[i]._id,
            title: jobPosts[i].title,
            slug: jobPosts[i].slug,
            job_type: jobPosts[i].job_type,
            job_level: jobPosts[i].job_level,
            job_category: jobPosts[i].job_category,
            number: jobPosts[i].number,
            description: jobPosts[i].description,
            requirement: jobPosts[i].requirement,
            salary: jobPosts[i].salary,
            address: jobPosts[i].address,
            company: jobPosts[i].company,
            contact: jobPosts[i].contact,
            image: jobPosts[i].image,
            photos: jobPosts[i].photos,
            video: jobPosts[i].video,
            benefit: jobPosts[i].benefit,
            end_date: jobPosts[i].end_date,
            user: jobPosts[i].user,
            view_count: jobPosts[i].view_count,
            range: range,
            range_lat: rangeLat,
            range_lng: rangeLng,
            status: jobPosts[i].status,
            seo_title: jobPosts[i].seo_title || jobPosts[i].title,
            seo_description: jobPosts[i].seo_description || seoDescription(jobPosts[i].seo_description),
            is_featured: is_featured,
            is_wishlist: is_wishlist,
            created_at: jobPosts[i].created_at,
            updated_at: jobPosts[i].updated_at,
          },
        };
        edges.push(jobPost);
      }
      let countData = infos.pageInfo && infos.pageInfo.length ? await JobPostService.count(filter) : 0;
      let dataRet = {
        ...{ edges },
        pageInfo: {
          length: countData,
          hasNextPage: jobPosts.length >= limit,
          hasPreviousPage: args.page > 1,
        },
      };
      return dataRet;
    }
  } catch (error) {
    console.log(error);
  }

}
