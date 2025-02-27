import CompanyService from "../../../db/repositories/CompanyRepository";
import CompanyViewService from "../../../db/repositories/CompanyViewRepository";
import { isSuperUser } from "../../../helpers/permission";
import UserService from "../../../db/repositories/UserRepository";
import { toSlug } from "../../../helpers/string";
import { authenticateEmployer, authenticateUser } from "../../../middlewares/authenticate";

export const updateCompany = async (source, args, context, info) => {
  let isAuthenticated = authenticateEmployer(context, context.res);
  if (isAuthenticated) {
    let loggedEmployer = context.res.locals.fullEmployer;
    if (isSuperUser(loggedEmployer.email)) {
      return CompanyService.update(args.input);
    } else {
      let _id = args.input._id;
      let r1 = await CompanyService.get(_id, {});
      if (r1 && r1.created_by.toString() == loggedEmployer._id.toString()) {
        return CompanyService.update(args.input);
      } else {
        return r1;
      }
    }
  }
};

export const createCompany = async (source, args, context, info) => {
  let input = args.input;
  input.slug = toSlug(input.name, true).toLowerCase();
  let isAuthenticated = await authenticateEmployer(context, context.res);
  if (isAuthenticated) {
    let loggedEmployer = context.res.locals.fullEmployer;
    input = Object.assign(input, { created_by: loggedEmployer._id });
    return CompanyService.create(input);
  }
};

export const assignPermission = async (source, args, context, info) => {
  const dataUpdateUser = args.input.listUser.map((item: any) => ({
    _id: item,
    company_role: { company_id: args.input.company, group_permission: args.input.permission },
  }));
  const dataUpdateCompany = args.input.listUser.map((item: any) => ({
    _id: args.input.company,
    users: { user_id: item, permission: args.input.permission },
  }));
  Promise.all(dataUpdateUser.map((data: any) => UserService.updateCompanyPermission(data)));
  Promise.all(dataUpdateCompany.map((data: any) => CompanyService.updateUserPermission(data)));

  if (await authenticateUser(context, context.res)) {
    return { status: 200 };
  }
};

export const verifyCompany = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return CompanyService.verify(input._id);
    }
  }
};

export const premiumCompany = async (source, args, context, info) => {
  if (await authenticateUser(context, context.res)) {
    let loggedUser = context.res.locals.fullUser;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return CompanyService.premium(input._id);
    }
  }
};


export const trackingBySlug = async (source, args, context, info) => {
  let input = args.input;
  let company = await CompanyService.increaseViewCountBySlug(input.slug);
  let isAuthenticated = await authenticateUser(context, context.res);
  if (isAuthenticated) {
    let loggedUser = context.res.locals.fullUser;
    let payload = {
      company: company._id,
      user: loggedUser._id,
    }
    await CompanyViewService.create(payload);
  }
  return {
    status: true
  }
}