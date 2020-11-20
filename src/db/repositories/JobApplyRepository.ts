import { CrudContract } from "../contracts/CrudContract";
import JobApply from "../schemas/JobApply";
import JobPost from "../schemas/JobPost";
import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";

interface ISort {
  created?: "newest" | "oldest";
  updated?: "newest" | "oldest";
}

interface IFilter {
  sort_by?: ISort;
  job_post?: string;
  employer?: string;
  user?: string;
  status?: string;
  created_at?: any;
  updated_at?: any;
}

interface IGetBy {
  _id?: string;
  user?: string;
  job_post?: string;
  employer?: string;
}

function getCondition(filter: IFilter) {
  let condition = {};
  if (filter.job_post) {
    condition = Object.assign(condition, { job_post: filter.job_post });
  }
  if (filter.user) {
    condition = Object.assign(condition, { user: filter.user });
  }
  if (filter.status) {
    condition = Object.assign(condition, { status: filter.status });
  }
  if (filter.created_at) {
    condition = Object.assign(condition, {
      created_at: {
        $gte: new Date(filter.created_at.from),
        $lte: new Date(filter.created_at.to),
      },
    });
  }
  if (filter.updated_at) {
    condition = Object.assign(condition, {
      updated_at: {
        $gte: new Date(filter.updated_at.from),
        $lte: new Date(filter.updated_at.to),
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

      if (filter.employer) {
        let employer = filter.employer;
        return JobPost.find({ employer: employer }, { _id: 1 }).then(r1 => {
          let _ids = r1.map(i => i._id);
          condition = Object.assign(condition, { job_post: { $in: _ids } });
          return JobApply.countDocuments(condition);
        })
      } else {
        return JobApply.countDocuments(condition);
      }
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

  get(_id, projection) {
    try {
      return JobApply.findById(_id, projection);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  filter(filter: IFilter, limit, page, projection) {
    try {
      let condition = getCondition(filter);
      let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
      if (filter.employer) {
        let employer = filter.employer;
        return JobPost.find({ employer: employer }, { _id: 1 }).then(r1 => {
          let _ids = r1.map(i => i._id);
          condition = Object.assign(condition, { job_post: { $in: _ids } });
          return JobApply.find(condition, projection)
            .populate(
              {
                path: "job_post",
                populate: [
                  { path: "address.city" },
                  { path: "company.ref" },
                  { path: "job_type" }
                ]
              })
            .populate("user")
            .sort(sort)
            .skip(limit * (page - 1))
            .limit(limit);
        })
      } else {
        return JobApply.find(condition, projection)
          .populate(
            {
              path: "job_post",
              populate: [
                { path: "address.city" },
                { path: "company.ref" },
                { path: "job_type" }
              ]
            })
          .populate("user")
          .sort(sort)
          .skip(limit * (page - 1))
          .limit(limit);
      }

    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  getBy(getBy: IGetBy, projection) {
    try {
      if (getBy.employer) {
        let employer = getBy.employer;
        delete getBy.employer;
        return JobApply.findOne(getBy, projection).populate("user").populate('job_post').then(r1 => {
          return JobPost.find({ employer: employer }).then(r2 => {
            if (r2) {
              return r1;
            }
          })
        });
      } else {
        return JobApply.findOne(getBy, projection).populate("user").populate('job_post');
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
