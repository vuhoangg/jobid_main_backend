import {CrudContract} from "../contracts/CrudContract";
import JobView from "../schemas/JobView";
import {errorLog} from "../../helpers/log";
import {promiseNull} from "../../helpers/promise";
import JobPost from "../schemas/JobPost";

interface ISort {
  created?: "newest" | "oldest",
  updated?: "newest" | "oldest",
}

interface IFilter {
  sort_by?: ISort;
  job_post?: string;
  user?: string;
}

interface IGetBy {
  _id?: string;
}

function getCondition(filter: IFilter) {
  let condition = {};
  if (filter.user) {
    condition = Object.assign(condition, {user: filter.user});
  }
  if (filter.job_post) {
    condition = Object.assign(condition, {job_post: filter.job_post});
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

class JobViewRepository implements CrudContract {
  count(filter: IFilter) {
    try {
      let condition = getCondition(filter);
      return JobView.countDocuments(condition);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  create(data) {
    try {
      return JobView.create(data);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  delete(id) {
    try {
      return JobView.findByIdAndRemove(id);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  get(id, projection) {
    try {
      return JobView.findById(id, projection);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  filter(filter: IFilter, limit, page, projection) {
    try {
      let condition = getCondition(filter);
      let sort = filter.sort_by ? getSort(filter.sort_by) : {_id: "desc"};
      return JobView.find(condition, projection)
        .populate('user')
        .populate({ path: 'job_post', populate: { path: 'job_location' }})
        .sort(sort).skip(limit * (page - 1)).limit(limit);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  getBy(getBy: IGetBy, projection) {
    try {
      if (getBy._id) {
        return JobView.findById(getBy._id, projection);
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
      return JobView.findByIdAndUpdate(data._id, data, {new: true});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  viewJob(data) {
    try {
      // update view_count then save tracking
      return JobPost.findByIdAndUpdate(data.job_post, {$inc: {view_count: 1}}).then(r => {
        if (r) {
          return JobView.findOneAndUpdate({job_post: data.job_post, user: data.user}, data, {upsert: true, new: true});
        }
      })
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }
}

const JobViewService = new JobViewRepository();
export default JobViewService;
