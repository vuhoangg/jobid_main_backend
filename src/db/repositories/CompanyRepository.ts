import { CrudContract } from "../contracts/CrudContract";
import Company from "../schemas/Company";
import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";

interface ISort {
  created?: "newest" | "oldest";
  updated?: "newest" | "oldest";
}

interface IFilter {
  sort_by?: ISort;
  name?: string;
  verify_status?: boolean;
  premium_status?: boolean;
  job_location?: string;
  job_category?: string;
  created_by?: string;
}

interface IGetBy {
  _id?: string;
  slug?: string;
}

function getCondition(filter: IFilter) {
  let condition = {};
  if (filter.name) {
    condition = Object.assign(condition, {
      $or: [{vi_name: new RegExp(filter.name, "i")}, {en_name: new RegExp(filter.name, "i")}],
    });
  }
  if (filter.verify_status) {
    condition = Object.assign(condition, {verify_status: filter.verify_status});
  }
  if (filter.premium_status) {
    condition = Object.assign(condition, {premium_status: filter.premium_status});
  }
  if (filter.job_category) {
    condition = Object.assign(condition, { job_category: filter.job_category });
  }
  if (filter.job_location) {
    condition = Object.assign(condition, { job_location: filter.job_location });
  }
  if (filter.created_by) {
    condition = Object.assign(condition, { created_by: filter.created_by });
  }
  return condition;
}

function getSort(sortBy: ISort) {
  let sort = {};
  if (sortBy.created) {
    sort = Object.assign(sort, {_id: sortBy.created === "newest" ? "desc" : "asc"});
  }
  if (sortBy.updated) {
    sort = Object.assign(sort, { updated_at: sortBy.updated === "newest" ? "desc" : "asc" });
  }
  return sort;
}

class CompanyRepository implements CrudContract {
  count(filter: IFilter) {
    try {
      let condition = getCondition(filter);
      return Company.countDocuments(condition);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  create(data) {
    try {
      console.log("data", data);
      return Company.create(data);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  delete(id) {
    try {
      return Company.findByIdAndRemove(id);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  get(id, projection) {
    try {
      return Company.findById(id, projection);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  filter(filter: IFilter, limit, page, projection) {
    try {
      let condition = getCondition(filter);
      let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
      return Company.find(condition, projection)
        .populate("job_category")
        .populate("job_location")
        .populate({
          path: "list_user",
          populate: {
            path: "user",
            model: "User",
          },
        })
        .populate({
          path: "list_user",
          populate: {
            path: "target_permission",
            model: "GroupPermission",
          },
        })
        .sort(sort)
        .skip(limit * (page - 1))
        .limit(limit);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  getBy(getBy: IGetBy, projection) {
    try {
      if (getBy._id) {
        return Company.findById(getBy._id, projection).populate("job_category").populate("job_location");
      } else if (getBy.slug) {
        return Company.findOne({ $or: [{ vi_slug: getBy.slug }, { en_slug: getBy.slug }] }, projection)
          .populate("job_category")
          .populate("job_location")
          .populate({
            path: "list_user",
            populate: {
              path: "user",
              model: "User",
            },
          })
          .populate({
            path: "list_user",
            populate: {
              path: "target_permission",
              model: "GroupPermission",
            },
          });
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
      return Company.findByIdAndUpdate(data._id, data, { new: true })
        .populate({
          path: "list_user",
          populate: {
            path: "user",
            model: "User",
          },
        })
        .populate({
          path: "list_user",
          populate: {
            path: "target_permission",
            model: "GroupPermission",
          },
        });
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  updateUserPermission(data) {
    try {
      return Company.findByIdAndUpdate(data._id, {$addToSet: {users: data.users}});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  verify(_id, status = true) {
    try {
      return Company.findByIdAndUpdate(_id, {verify_status: status}, {new: true});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  premium(_id, status = true) {
    try {
      return Company.findByIdAndUpdate(_id, {premium_status: status}, {new: true});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }
}

const CompanyService = new CompanyRepository();
export default CompanyService;
