import CompanyService from "../../../db/repositories/CompanyRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export function getCompany(source, args, context, info) {
  const fields = rootField(info);
  let getBy = args._id ? { _id: args._id } : { slug: args.slug };
  return CompanyService.getBy(getBy, fields).then(async (company) => {
    let node = {
      _id: company._id,
      default_lang: company.default_lang,
      en_name: company.en_name,
      vi_name: company.vi_name,
      job_category: company.job_category,
      company_type: company.company_type,
      job_location: company.job_location,
      verify_status: company.verify_status,
      premium_status: company.premium_status,
      address: company.address,
      album: company.album,
      en_slug: company.en_slug,
      vi_slug: company.vi_slug,
      logo: company.logo,
      cover: company.cover,
      website: company.website,
      region: company.region,
      phone: company.phone,
      facebook: company.facebook,
      youtube: company.youtube,
      address_contact: company.address_contact,
      created_by: company.created_by,
      media_story: company.media_story,
      text_story: company.text_story,
      people: company.people,
      benefit: company.benefit,
      follow: company.follow,
      seo_title: company.seo_title,
      seo_description: company.seo_description,
      created_at: company.created_at,
      updated_at: company.updated_at,
    };
    return node;
  });
}

export function getCompanys(source, args, context, info) {
  let infos = rootInfo(info);
  let filter = filterObject(args.filter);
  return CompanyService.filter(filter, args.limit, args.page, infos.edges).then(async (companys) => {
    let edges = [];
    for (let i = 0; i < companys.length; i++) {
      let company = {
        cursor: companys[i]._id,
        node: {
          _id: companys[i]._id,
          default_lang: companys[i].default_lang,
          en_name: companys[i].en_name,
          vi_name: companys[i].vi_name,
          job_category: companys[i].job_category,
          company_type: companys[i].company_type,
          job_location: companys[i].job_location,
          verify_status: companys[i].verify_status,
          premium_status: companys[i].premium_status,
          address: companys[i].address,
          album: companys[i].album,
          en_slug: companys[i].en_slug,
          vi_slug: companys[i].vi_slug,
          logo: companys[i].logo,
          cover: companys[i].cover,
          website: companys[i].website,
          region: companys[i].region,
          phone: companys[i].phone,
          facebook: companys[i].facebook,
          youtube: companys[i].youtube,
          address_contact: companys[i].address_contact,
          created_by: companys[i].created_by,
          media_story: companys[i].media_story,
          text_story: companys[i].text_story,
          people: companys[i].people,
          benefit: companys[i].benefit,
          follow: companys[i].follow,
          seo_title: companys[i].seo_title,
          seo_description: companys[i].seo_description,
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
  });
}
