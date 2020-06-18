import CompanyService from "../../../db/repositories/CompanyRepository";
import { isSuperUser } from "../../../helpers/permission";
import { toSlug } from "../../../helpers/string";

export function updateCompany(source, args, context, info) {
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      return CompanyService.update(args.input);
    }
  }
}

export function createCompany(source, args, context, info) {
  let input = args.input;
  input.vi_slug = toSlug(input.vi_name || input.en_name, true).toLowerCase();
  input.en_slug = toSlug(input.vi_name || input.en_name, true).toLowerCase();
  if (context.isAuthenticated()) {
    let loggedUser = context.user;
    if (isSuperUser(loggedUser.email)) {
      // TODO remove input premium, verify status
      return CompanyService.create(input);
    }
  }
}
