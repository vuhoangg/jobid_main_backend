import { CrudContract } from "../contracts/CrudContract";
import Company from "../schemas/Company";
import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";
import { flattenNestedObject, processDataUpdate } from "../../helpers/flattenNestedObject";
import User from "../schemas/User";

interface ISort {
  created?: "newest" | "oldest";
  updated?: "newest" | "oldest";
  follow?: "high_to_low" | "low_to_high",
  hot?: "high_to_low" | "low_to_high",
}

interface IFilter {
  sort_by?: ISort;
  name?: string;
  verify_status?: boolean;
  premium_status?: boolean;
  office_city?: string;
  job_category?: string;
  created_by?: string;

  suggestion?: string;
}

interface IGetBy {
  _id?: string;
  slug?: string;
}

function getCondition(filter: IFilter) {
  let condition = {};
  if (filter.name) {
    condition = Object.assign(condition, { name: new RegExp(filter.name, "i") });
  }
  if (filter.verify_status) {
    condition = Object.assign(condition, { verify_status: filter.verify_status });
  }
  if (filter.premium_status) {
    condition = Object.assign(condition, { premium_status: filter.premium_status });
  }
  if (filter.job_category) {
    condition = Object.assign(condition, { job_category: filter.job_category });
  }
  if (filter.office_city) {
    condition = Object.assign(condition, { "office.city": filter.office_city });
  }
  if (filter.created_by) {
    condition = Object.assign(condition, { created_by: filter.created_by });
  }
  return condition;
}

function getSort(sortBy: ISort) {
  let sort = {};
  if (sortBy.created) {
    sort = Object.assign(sort, { _id: sortBy.created === "newest" ? "desc" : "asc" });
  }
  if (sortBy.updated) {
    sort = Object.assign(sort, { updated_at: sortBy.updated === "newest" ? "desc" : "asc" });
  }
  if (sortBy.follow) {
    sort = Object.assign(sort, { follow: sortBy.follow === "high_to_low" ? "desc" : "asc" });
  }
  if (sortBy.hot) {
    sort = Object.assign(sort, { follow: sortBy.follow === "high_to_low" ? "desc" : "asc" });
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

  get(_id, projection) {
    try {
      return Company.findById(_id, projection);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  filter(filter: IFilter, limit, page, projection) {
    try {
      let condition = getCondition(filter);
      let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
      if (filter.suggestion) {
        return User.findById(filter.suggestion).then(r1 => {
          let favorite_job = r1.info.favorite_job || [];
          let job_category = favorite_job.map((item) => item.job_category);
          return Company.find({ verify_status: true, job_category: { "$in": job_category } }, projection)
            .sort(sort)
            .skip(limit * (page - 1))
            .limit(limit);
        })
      } else {
        let response = Company.find(condition, projection)
          .sort(sort)
          .skip(limit * (page - 1))
          .limit(limit);
        if (response["office"]) {
          response = response.populate("office.city");
        }
        if (response["office"]) {
          response = response.populate("office.district");
        }
        if (response["office"]) {
          response = response.populate("office.ward");
        }
        if (response["created_by"]) {
          response = response.populate("created_by");
        }
        if (response["job_category"]) {
          response = response.populate("job_category");
        }

        return response;

      }

    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  getBy(getBy: IGetBy, projection) {
    try {
      if (getBy._id) {
        return Company.findById(getBy._id, projection)
          .populate("office.city")
          .populate("office.district")
          .populate("office.ward")
          .populate("job_category")
          .populate("benefit.id")
          .populate("created_by")

      } else if (getBy.slug) {
        return Company.findOne({ slug: getBy.slug }, projection)
          .populate("office.city")
          .populate("office.district")
          .populate("office.ward")
          .populate("job_category")
          .populate("benefit.id")
          .populate("created_by")


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
      return Company.findByIdAndUpdate(data._id, data, { new: true })
        .populate("office.city")
        .populate("office.district")
        .populate("office.ward")
        .populate("job_category")
        .populate("benefit.id")
        .populate("created_by")

    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  updateUserPermission(data) {
    try {
      return Company.findByIdAndUpdate(data._id, { $addToSet: { users: data.users } });
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  verify(_id, status = true) {
    try {
      return Company.findByIdAndUpdate(_id, { verify_status: status }, { new: true });
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  premium(_id, status = true) {
    try {
      return Company.findByIdAndUpdate(_id, { premium_status: status }, { new: true });
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  increaseFollow(_id) {
    try {
      return Company.findByIdAndUpdate(_id, { $inc: { follow: 1 } }, { new: true });
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }
  decreaseFollow(_id) {
    try {
      return Company.findByIdAndUpdate(_id, { $inc: { follow: -1 } }, { new: true });
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  increaseViewCountBySlug(slug) {
    try {
      return Company.findOneAndUpdate({ slug: slug }, { $inc: { view_count: 1 } }, { new: true });
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  increaseRating(_id, rateValue) {
    try {
      let rateField = "";
      switch (rateValue) {
        case 1:
          rateField = "one_star_count";
          break;
        case 2:
          rateField = "two_star_count";
          break;
        case 3:
          rateField = "three_star_count";
          break;
        case 4:
          rateField = "four_star_count";
          break;
        case 5:
          rateField = "five_star_count";
          break;
      }
      if (rateField) {
        let objChange = {};
        objChange[rateField] = 1;
        return Company.findOneAndUpdate({ _id: _id }, { $inc: objChange }, { new: true });
      } else {
        return promiseNull();
      }

    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  decreaseRating(_id, rateValue) {
    try {
      let rateField = "";
      switch (rateValue) {
        case 1:
          rateField = "one_star_count";
          break;
        case 2:
          rateField = "two_star_count";
          break;
        case 3:
          rateField = "three_star_count";
          break;
        case 4:
          rateField = "four_star_count";
          break;
        case 5:
          rateField = "five_star_count";
          break;
      }
      if (rateField) {
        let objChange = {};
        objChange[rateField] = -1;
        return Company.findOneAndUpdate({ _id: _id }, { $inc: objChange }, { new: true });
      } else {
        return promiseNull();
      }

    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }
}

const CompanyService = new CompanyRepository();
export default CompanyService;
