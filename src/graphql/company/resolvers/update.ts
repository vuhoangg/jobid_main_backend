import CompanyService from "../../../db/repositories/CompanyRepository";
import { isSuperUser } from "../../../helpers/permission";
import UserService from "../../../db/repositories/UserRepository";

export function updateCompany(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      return CompanyService.update(args.input);
    }
  }
}

export function createCompany(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      // TODO remove input premium, verify status
      return CompanyService.create(args.input);
    }
  }
}

export function assignPermission(source, args, context, info) {
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

  if (context.isAuthenticated()) {
    return { status: 200 };
  }
}
