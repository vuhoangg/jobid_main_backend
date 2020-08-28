import {CrudContract} from "../contracts/CrudContract";
import CompanyFollow from "../schemas/CompanyFollow";
import {errorLog} from "../../helpers/log";
import {promiseNull} from "../../helpers/promise";

interface ISort {
  created?: "newest" | "oldest",
  updated?: "newest" | "oldest",
}

interface IFilter {
  sort_by?: ISort;
  user?: string;
  company?: string;
}

interface IGetBy {
  _id?: string;
}

function getCondition(filter: IFilter) {
  let condition = {};
  if (filter.user) {
    condition = Object.assign(condition, {user: filter.user});
  }
  if (filter.company) {
    condition = Object.assign(condition, {company: filter.company});
  }
  return condition;
}

function getSort(sortBy: ISort) {
  let sort = {};
  if (sortBy.created) {
    sort = Object.assign(sort, {_id: (sortBy.created === "newest" ? "desc" : "asc")})
  }
  if (sortBy.updated) {
    sort = Object.assign(sort, {updated_at: (sortBy.updated === "newest" ? "desc" : "asc")})
  }
  return sort;
}

class CompanyFollowRepository implements CrudContract {
  count(filter: IFilter) {
    try {
      let condition = getCondition(filter);
      return CompanyFollow.countDocuments(condition);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  create(data) {
    try {
      return CompanyFollow.create(data);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  delete(id) {
    try {
      return CompanyFollow.findByIdAndRemove(id);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  get(id, projection) {
    try {
      return CompanyFollow.findById(id, projection);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  filter(filter: IFilter, limit, page, projection) {
    try {
      let condition = getCondition(filter);
      let sort = filter.sort_by ? getSort(filter.sort_by) : {_id: "desc"};
      return CompanyFollow.find(condition, projection).sort(sort).skip(limit * (page - 1)).limit(limit).populate('user').populate('company');
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  getBy(getBy, projection) {
    try {
      if (getBy._id) {
        return CompanyFollow.findById(getBy._id, projection);
      } else if (getBy.company) {
        return CompanyFollow.findOne({company: getBy.company, user: getBy.user}, projection).populate('user').populate('company');
      } else {
        return promiseNull();
      }
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  update(data) {
    try {
      return CompanyFollow.findOne({company: data.company, user: data.user}).then(r1 => {
        if (r1) {
          return CompanyFollow.findByIdAndRemove(r1._id).then(r2 => {
            return null
          });
        } else {
          return CompanyFollow.create({user: data.user, company: data.company});
        }
      });
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }
}

const CompanyFollowService = new CompanyFollowRepository();
export default CompanyFollowService;
