import CompanyService from "../../../db/repositories/CompanyRepository";
import { isSuperUser } from "../../../helpers/permission";
import UserService from "../../../db/repositories/UserRepository";
import { toSlug } from "../../../helpers/string";
import { authenticate } from "../../../middlewares/authenticate";

export const updateCompany = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      return CompanyService.update(args.input);
    } else {
      let _id = args.input._id;
      return CompanyService.get(_id, {}).then((r1) => {
        if (r1 && r1.created_by.toString() == loggedUser._id.toString()) {
          return CompanyService.update(args.input);
        } else {
          return r1;
        }
      });
    }
  }
};

export const createCompany = async (source, args, context, info) => {
  let input = args.input;
  input.slug = toSlug(input.name, true).toLowerCase();
  if (await authenticate(context, context.res)) {
    let loggedUser = context.user;
    input = Object.assign(input, { created_by: loggedUser._id });
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

  if (await authenticate(context, context.res)) {
    return { status: 200 };
  }
};

export const verifyCompany = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.user;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return CompanyService.verify(input._id);
    }
  }
};

export const premiumCompany = async (source, args, context, info) => {
  if (await authenticate(context, context.res)) {
    let loggedUser = context.user;
    let input = args.input;
    if (isSuperUser(loggedUser.email)) {
      return CompanyService.premium(input._id);
    }
  }
};
