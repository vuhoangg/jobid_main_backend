import {CrudContract} from "../contracts/CrudContract";
import JobPost from "../schemas/JobPost";
import {errorLog} from "../../helpers/log";
import {promiseNull} from "../../helpers/promise";

interface ISort {
  view_count?: "low_to_high" | "high_to_low";
  created?: "newest" | "oldest",
  updated?: "newest" | "oldest",
}

interface IFilter {
  sort_by?: ISort;
  title?: string;
  slug?: string;
  user?: string;
  job_level?: string;
  job_category?: string;
  job_location?: string;
  job_skill?: string;
  company_benefit?: string;
  status?: string;
}

interface IGetBy {
  _id?: string;
  slug?: string;
}

function getCondition(filter: IFilter) {
  let condition = {};
  if (filter.title) {
    condition = Object.assign(condition, {title: new RegExp(filter.title, "i")});
  }
  if (filter.slug) {
    condition = Object.assign(condition, {slug: filter.slug});
  }
  if (filter.job_level) {
    condition = Object.assign(condition, {job_level: filter.job_level});
  }
  if (filter.job_category) {
    condition = Object.assign(condition, {job_category: filter.job_category});
  }
  if (filter.job_location) {
    condition = Object.assign(condition, {job_location: filter.job_location});
  }
  if (filter.job_skill) {
    condition = Object.assign(condition, {job_skill: filter.job_skill});
  }
  if (filter.company_benefit) {
    condition = Object.assign(condition, {"company.benefit.id": filter.company_benefit});
  }
  if (filter.user) {
    condition = Object.assign(condition, {"user.ref": filter.user});
  }
  if (filter.status) {
    condition = Object.assign(condition, {"status": filter.status});
  } else {
    condition = Object.assign(condition, {"status": "active"});
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
  if (sortBy.view_count) {
    sort = Object.assign(sort, { view_count: sortBy.view_count === "high_to_low" ? "desc" : "asc" });
  }
  return sort;
}

class JobPostRepository implements CrudContract {
  count(filter: IFilter) {
    try {
      let condition = getCondition(filter);
      return JobPost.countDocuments(condition);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  create(data) {
    try {
      return JobPost.create(data);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  delete(id) {
    try {
      return JobPost.findByIdAndRemove(id);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  get(id, projection) {
    try {
      return JobPost.findById(id, projection);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  filter(filter: IFilter, limit, page, projection) {
    try {
      let condition = getCondition(filter);
      let sort = filter.sort_by ? getSort(filter.sort_by) : {_id: "desc"};
      return JobPost.find(condition, projection)
        .populate('job_level').populate('job_category').populate('job_location').populate('job_skill')
        .populate('job_prefer_language')
        .populate('company.benefit.benefit_id')
        .populate('company.ref')
        .populate('user.ref')
        .sort(sort).skip(limit * (page - 1)).limit(limit);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  getBy(getBy: IGetBy, projection) {
    try {
      if (getBy._id) {
        return JobPost.findById(getBy._id, projection)
          .populate('job_level')
          .populate('job_category')
          .populate('job_location')
          .populate('job_skill')
          .populate('job_prefer_language')
          .populate('company.benefit.benefit_id')
          .populate('company.ref')
          .populate('user.ref');
      } else if (getBy.slug) {
        return JobPost.findOne({slug: getBy.slug}, projection)
          .populate('job_level')
          .populate('job_category')
          .populate('job_location')
          .populate('job_skill')
          .populate('job_prefer_language')
          .populate('company.benefit.benefit_id')
          .populate('company.ref')
          .populate('user.ref');
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
      return JobPost.findByIdAndUpdate(data._id, data, {new: true});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }
}

const JobPostService = new JobPostRepository();
export default JobPostService;
