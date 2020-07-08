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
      job_level: jobPost.job_level,
      job_category: jobPost.job_category,
      description: jobPost.description,
      requirement: jobPost.requirement,
      job_location: jobPost.job_location,
      salary:
        jobPost.salary.show || (loggedUser && loggedUser._id.toString() === jobPost.user.ref._id.toString())
          ? jobPost.salary
          : null,
      job_skill: jobPost.job_skill,
      job_prefer_language: jobPost.job_prefer_language,
      email_for_application: jobPost.email_for_application,
      company: jobPost.company,
      view_count: jobPost.view_count ? jobPost.view_count : 0,
      user: jobPost.user,
      status: jobPost.status,
      seo_title: jobPost.seo_title,
      seo_description: jobPost.seo_description,
      latitude: jobPost.latitude,
      longitude: jobPost.longitude,
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
          job_level: jobPosts[i].job_level,
          job_category: jobPosts[i].job_category,
          description: jobPosts[i].description,
          requirement: jobPosts[i].requirement,
          job_location: jobPosts[i].job_location,
          salary: jobPosts[i].salary.show ? jobPosts[i].salary : null,
          job_skill: jobPosts[i].job_skill,
          job_prefer_language: jobPosts[i].job_prefer_language,
          email_for_application: jobPosts[i].email_for_application,
          company: jobPosts[i].company,
          view_count: jobPosts[i].view_count ? jobPosts[i].view_count : 0,
          user: jobPosts[i].user,
          latitude: jobPosts[i].latitude,
          longitude: jobPosts[i].longitude,
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
