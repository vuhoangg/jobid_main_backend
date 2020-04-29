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
  vi_title?: string;
  en_title?: string;
  vi_slug?: string;
  en_slug?: string;
}

interface IGetBy {
  _id?: string;
}

function getCondition(filter: IFilter) {
  let condition = {};
  if (filter.vi_title) {
    condition = Object.assign(condition, {vi_title: new RegExp(filter.vi_title, "i")});
  }
  if (filter.en_title) {
    condition = Object.assign(condition, {en_title: new RegExp(filter.en_title, "i")});
  }
  if (filter.vi_slug) {
    condition = Object.assign(condition, {vi_slug: filter.vi_slug});
  }
  if (filter.en_slug) {
    condition = Object.assign(condition, {en_slug: filter.en_slug});
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
        .populate('benefit.id')
        .populate('company.ref')
        .sort(sort).skip(limit * (page - 1)).limit(limit);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  getBy(getBy: IGetBy, projection) {
    try {
      if (getBy._id) {
        return JobPost.findById(getBy._id, projection);
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
