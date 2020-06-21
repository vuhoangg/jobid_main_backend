import {CrudContract} from "../contracts/CrudContract";
import User from "../schemas/User";
import {errorLog} from "../../helpers/log";
import {promiseNull} from "../../helpers/promise";
import {processDataUpdate} from "../../helpers/flattenNestedObject";

interface ISort {
  created?: "newest" | "oldest";
  updated?: "newest" | "oldest";
}

interface IFilter {
  sort_by?: ISort;
  name?: string;
  spam?: number;
  current_job_level?: string;
  gender?: string;
  nation?: string;
  language?: string;
  salary_from?: string;
  salary_to?: string;
  experience_from?: string;
  experience_to?: string;
  last_updated?: string;
  prefer_job_location?: string;
  prefer_job_category?: string;
}

interface IGetBy {
  _id?: string;
  email?: string;
}

function getCondition(filter: IFilter) {
  let condition = {};
  if (filter.name) {
    condition = Object.assign(condition, {"$or": [{first_name: new RegExp(filter.name, "i")}, {last_name: new RegExp(filter.name, "i")}]})
  }
  if (filter.spam != undefined) {
    condition = Object.assign(condition, {spam: {"$gt": Number(filter.spam)}})
  }
  return condition;
}

function getSort(sortBy: ISort) {
  let sort = {};
  if (sortBy.created) {
    sort = Object.assign(sort, {_id: sortBy.created === "newest" ? "desc" : "asc"});
  }
  if (sortBy.updated) {
    sort = Object.assign(sort, {updated_at: sortBy.updated === "newest" ? "desc" : "asc"});
  }
  return sort;
}

class UserRepository implements CrudContract {
  count(filter: IFilter) {
    try {
      let condition = getCondition(filter);
      return User.countDocuments(condition);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  create(data) {
    try {
      return User.create(data);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  delete(id) {
    try {
      return User.findByIdAndRemove(id);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  get(id, projection) {
    try {
      return User.findById(id, projection)
        .populate("customize_info.current_job_level")
        .populate("customize_info.location")
        .populate("customize_info.skill")
        .populate("customize_info.work_preference.job_location")
        .populate("customize_info.work_preference.job_category")
        .populate("customize_info.work_preference.job_level")
        .populate("customize_info.work_preference.benefit");
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  filter(filter: IFilter, limit, page, projection) {
    try {
      let condition = getCondition(filter);
      let sort = filter.sort_by ? getSort(filter.sort_by) : {_id: "desc"};
      return User.find(condition, projection)
        .sort(sort)
        .skip(limit * (page - 1))
        .limit(limit)
        .populate("customize_info.current_job_level")
        .populate("customize_info.location")
        .populate("customize_info.skill")
        .populate("customize_info.work_preference.job_location")
        .populate("customize_info.work_preference.job_category")
        .populate("customize_info.work_preference.job_level")
        .populate("customize_info.work_preference.benefit");
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  getBy(getBy: IGetBy, projection) {
    try {
      if (getBy._id) {
        return User.findById(getBy._id, projection)
          .populate("customize_info.current_job_level")
          .populate("customize_info.location")
          .populate("customize_info.skill")
          .populate("customize_info.work_preference.job_location")
          .populate("customize_info.work_preference.job_category")
          .populate("customize_info.work_preference.job_level")
          .populate("customize_info.work_preference.benefit");;
      } else if (getBy.email) {
        return User.findOne({email: getBy.email}, projection)
          .populate("customize_info.current_job_level")
          .populate("customize_info.location")
          .populate("customize_info.skill")
          .populate("customize_info.work_preference.job_location")
          .populate("customize_info.work_preference.job_category")
          .populate("customize_info.work_preference.job_level")
          .populate("customize_info.work_preference.benefit");;
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
      let dataUpdate = processDataUpdate(data);
      return User.findByIdAndUpdate(data._id, dataUpdate, {new: true});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  updateCompanyPermission(data) {
    try {
      return User.findByIdAndUpdate(data._id, {$addToSet: {company_role: data.company_role}}, {new: true});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  markSpam(_id) {
    try {
      return User.findByIdAndUpdate(_id, {$inc: {spam: 1}}, {new: true});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  removeSpam(_id) {
    try {
      return User.findByIdAndUpdate(_id, {spam: 0}, {new: true});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }
}


const UserService = new UserRepository();
export default UserService;
