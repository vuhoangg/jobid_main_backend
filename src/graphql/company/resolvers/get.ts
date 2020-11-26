import CompanyFollowService from "../../../db/repositories/CompanyFollowRepository";
import CompanyNotificationRegisterService from "../../../db/repositories/CompanyNotificationRegisterRepository";
import CompanyService from "../../../db/repositories/CompanyRepository";
import JobPostService from "../../../db/repositories/JobPostRepository";
import { seoDescription } from "../../../helpers/seo";
import { authenticateUser } from "../../../middlewares/authenticate";
import { filterObject, rootField, rootInfo } from "../../helpers";

export const getCompany = async (source, args, context, info) => {
  const fields = rootField(info);
  let getBy = args._id ? { _id: args._id } : { slug: args.slug };

  let company = await CompanyService.getBy(getBy, fields);

  let is_follow = false;
  let is_register = false;
  let isAuthenticated = await authenticateUser(context, context.res);
  if (isAuthenticated) {
    let loggedUser = context.res.locals.fullUser;
    is_follow = !! await CompanyFollowService.count({ company: company._id, user: loggedUser._id });
    is_register = !! await CompanyNotificationRegisterService.count({ company: company._id, user: loggedUser._id });
  }
  let job_count = await JobPostService.count({ company_ref: company._id, status: "active" });

  let node = {
    _id: company._id,
    name: company.name,
    business_code: company.business_code,
    job_category: company.job_category,
    company_type: company.company_type,
    verify_status: company.verify_status,
    premium_status: company.premium_status,
    album: company.album,
    slug: company.slug,
    logo: company.logo,
    cover: company.cover,
    website: company.website,
    email: company.email,
    phone: company.phone,
    facebook: company.facebook,
    youtube: company.youtube,
    video: company.video,
    description: company.description,
    slogan: company.slogan,
    created_by: company.created_by,
    office: company.office,
    story: company.story,
    people: company.people,
    benefit: company.benefit,
    follow: company.follow,
    view_count: company.view_count,
    job_count: job_count,
    is_follow: is_follow,
    is_register: is_register,
    size: company.size,
    seo_title: company.seo_title || company.name,
    seo_description: company.seo_description || seoDescription(company.description),
    created_at: company.created_at,
    updated_at: company.updated_at,
  };
  return node;
}

export const getCompanys = async (source, args, context, info) => {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);

  let companys = await CompanyService.filter(filter, args.limit, args.page, infos.edges);
  let isAuthenticated = await authenticateUser(context, context.res);

  let edges = [];
  for (let i = 0; i < companys.length; i++) {

    let is_follow = false;
    let is_register = false;
    if (isAuthenticated) {
      let loggedUser = context.res.locals.fullUser;
      is_follow = !! await CompanyFollowService.count({ company: companys[i]._id, user: loggedUser._id });
      is_register = !! await CompanyNotificationRegisterService.count({ company: companys[i]._id, user: loggedUser._id });
    }
    let job_count = await JobPostService.count({ company_ref: companys[i]._id, status: "active" });
    let company = {
      cursor: companys[i]._id,
      node: {
        _id: companys[i]._id,
        name: companys[i].name,
        business_code: companys[i].business_code,
        job_category: companys[i].job_category,
        company_type: companys[i].company_type,
        verify_status: companys[i].verify_status,
        premium_status: companys[i].premium_status,

        album: companys[i].album,
        slug: companys[i].slug,
        logo: companys[i].logo,
        cover: companys[i].cover,
        website: companys[i].website,
        email: companys[i].email,
        phone: companys[i].phone,
        facebook: companys[i].facebook,
        youtube: companys[i].youtube,
        video: companys[i].video,
        description: companys[i].description,
        slogan: companys[i].slogan,
        created_by: companys[i].created_by,
        office: companys[i].office,
        story: companys[i].story,
        people: companys[i].people,
        benefit: companys[i].benefit,
        follow: companys[i].follow,
        view_count: companys[i].view_count,
        job_count: job_count,
        is_follow: is_follow,
        is_register: is_register,
        size: companys[i].size,
        seo_title: companys[i].seo_title || companys[i].name,
        seo_description: companys[i].seo_description || seoDescription(companys[i].description),
        created_at: companys[i].created_at,
        updated_at: companys[i].updated_at,
      },
    };
    edges.push(company);
  }
  let countData = infos.pageInfo && infos.pageInfo.length ? await CompanyService.count(filter) : 0;
  let dataRet = {
    ...{ edges },
    pageInfo: {
      length: countData,
      hasNextPage: companys.length >= args.limit,
      hasPreviousPage: args.page > 1,
    },
  };
  return dataRet;
}
