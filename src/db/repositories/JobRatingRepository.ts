import { CrudContract } from "../contracts/CrudContract";
import JobRating from "../schemas/JobRating";
import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";

interface ISort {
  created?: "newest" | "oldest";
  updated?: "newest" | "oldest";
}

interface IFilter {
  sort_by?: ISort;
  job_post?: string;
}

interface IGetBy {
  _id?: string;
  job_post?: string;
}

function getCondition(filter: IFilter) {
  let condition = {};
  if (filter.job_post) {
    condition = Object.assign(condition, { job: filter.job_post });
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

class JobRatingRepository implements CrudContract {
  count(filter: IFilter) {
    try {
      let condition = getCondition(filter);
      return JobRating.countDocuments(condition);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  create(data) {
    try {
      return JobRating.findOneAndUpdate(
        {
          job: data.job,
          rating: data.rating,
        },
        data,
        { upsert: true, new: true }
      );
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  delete(id) {
    try {
      return JobRating.findByIdAndRemove(id);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  get(job_post, projection) {
    try {
      return JobRating.findById(job_post, projection);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  filter(filter: IFilter, limit, page, projection) {
    try {
      let condition = getCondition(filter);
      let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
      return JobRating.find(condition, projection)
        .populate("rating.user")
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
        return JobRating.findById(getBy._id, projection);
      } else if (getBy.job_post) {
        console.log(projection);
        return JobRating.findOne({ job: getBy.job_post }, projection);
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
      return JobRating.findByIdAndUpdate(data._id, data, { new: true });
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }
}

const JobRatingService = new JobRatingRepository();
export default JobRatingService;
