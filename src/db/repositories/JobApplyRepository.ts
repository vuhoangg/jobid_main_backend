import { CrudContract } from "../contracts/CrudContract";
import JobApply from "../schemas/JobApply";
import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";

interface ISort {
  created?: "newest" | "oldest";
  updated?: "newest" | "oldest";
}

interface IFilter {
  sort_by?: ISort;
  job_post?: string;
  user?: string;
  target?: string;
  status?: string;
  createdAt?: any;
  updatedAt?: any;
}

interface IGetBy {
  _id?: string;
}

function getCondition(filter: IFilter) {
  let condition = {};
  if (filter.job_post) {
    condition = Object.assign(condition, { job_post: filter.job_post });
  }
  if (filter.user) {
    condition = Object.assign(condition, { user: filter.user });
  }
  if (filter.target) {
    condition = Object.assign(condition, { target: filter.target });
  }
  if (filter.status) {
    condition = Object.assign(condition, { status: filter.status });
  }
  if (filter.createdAt) {
    condition = Object.assign(condition, {
      created_at: {
        $gte: new Date(filter.createdAt.from),
        $lte: new Date(filter.createdAt.to),
      },
    });
  }
  if (filter.updatedAt) {
    condition = Object.assign(condition, {
      updated_at: {
        $gte: new Date(filter.updatedAt.from),
        $lte: new Date(filter.updatedAt.to),
      },
    });
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
  return sort;
}

class JobApplyRepository implements CrudContract {
  count(filter: IFilter) {
    try {
      let condition = getCondition(filter);
      return JobApply.countDocuments(condition);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  create(data) {
    try {
      return JobApply.create(data);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  delete(id) {
    try {
      return JobApply.findByIdAndRemove(id);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  get(id, projection) {
    try {
      return JobApply.findById(id, projection)
        .populate("user")
        .populate({ path: "job_post", populate: { path: "job_location" } });
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  filter(filter: IFilter, limit, page, projection) {
    try {
      let condition = getCondition(filter);
      let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
      return JobApply.find(condition, projection)
        .populate("user")
        .populate({ path: "job_post", populate: { path: "job_location" } })
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
        return JobApply.findById(getBy._id, projection);
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
      return JobApply.findByIdAndUpdate(data._id, data, { new: true });
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  applyJob(data) {
    try {
      return JobApply.findOneAndUpdate(
        {
          job_post: data.job_post,
          user: data.user,
          status: data.status,
          file: data.file,
          email: data.email,
          description: data.description,
        },
        data,
        { upsert: true, new: true }
      );
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }
}

const JobApplyService = new JobApplyRepository();
export default JobApplyService;
