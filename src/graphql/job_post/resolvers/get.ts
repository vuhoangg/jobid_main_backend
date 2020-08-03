import JobPostService from "../../../db/repositories/JobPostRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export function getJobPost(source, args, context, info) {
  const fields = rootField(info);
  let getBy = args._id ? { _id: args._id } : { slug: args.slug };
  let loggedUser = null;
  if (context.isAuthenticated()) {
    loggedUser = context.user;
  }
  return JobPostService.getBy(getBy, fields).then(async (jobPost) => {
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
      image: jobPost.image,
      photos: jobPost.photos,
      video: jobPost.video,
      benefit: jobPost.benefit,
      end_date: jobPost.end_date,
      user: jobPost.user,
      view_count: jobPost.view_count,
      status: jobPost.status,
      seo_title: jobPost.seo_title,
      seo_description: jobPost.seo_description,
      created_at: jobPost.created_at,
      updated_at: jobPost.updated_at,
    };
    return node;
  });
}

export function getJobPosts(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  let limit = args.limit > 50 ? 10 : args.limit;
  return JobPostService.filter(filter, limit, args.page, infos.edges).then(async (jobPosts) => {
    let edges = [];
    for (let i = 0; i < jobPosts.length; i++) {
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
          image: jobPosts[i].image,
          photos: jobPosts[i].photos,
          video: jobPosts[i].video,
          benefit: jobPosts[i].benefit,
          end_date: jobPosts[i].end_date,
          user: jobPosts[i].user,
          view_count: jobPosts[i].view_count,
          status: jobPosts[i].status,
          seo_title: jobPosts[i].seo_title,
          seo_description: jobPosts[i].seo_description,
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
  });
}
