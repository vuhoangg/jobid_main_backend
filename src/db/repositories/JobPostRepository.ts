import { CrudContract } from "../contracts/CrudContract";
import JobPost from "../schemas/JobPost";
import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";

interface ISort {
  view_count?: "low_to_high" | "high_to_low";
  created?: "newest" | "oldest";
  updated?: "newest" | "oldest";
}

interface IFilter {
  sort_by?: ISort;
  title?: string;
  city?: string;
  district?: string;
  ward?: string;
  slug?: string;
  user?: string;
  job_level?: string;
  job_category?: string;
  benefit?: string;
  status?: string;
  company?: string;
  coordinate?: any;
  expire?: boolean;
}

interface IGetBy {
  _id?: string;
  slug?: string;
}

function getCondition(filter: IFilter) {
  let condition = {};
  if (filter.title) {
    condition = Object.assign(condition, { title: new RegExp(filter.title, "i") });
  }
  if (filter.city) {
    condition = Object.assign(condition, { "address.city": filter.city });
  }
  if (filter.district) {
    condition = Object.assign(condition, { "address.district": filter.district });
  }
  if (filter.ward) {
    condition = Object.assign(condition, { "address.ward": filter.ward });
  }
  if (filter.slug) {
    condition = Object.assign(condition, { slug: filter.slug });
  }
  if (filter.job_category) {
    condition = Object.assign(condition, { job_category: filter.job_category });
  }
  if (filter.benefit) {
    condition = Object.assign(condition, { "benefit.benefit_id": filter.benefit });
  }
  if (filter.company) {
    condition = Object.assign(condition, { "company.ref": filter.company });
  }
  if (filter.user) {
    condition = Object.assign(condition, { user: filter.user });
  }
  if (filter.coordinate) {
    condition = Object.assign(
      condition,
      { "location.lat": { $gte: filter.coordinate.minLat, $lte: filter.coordinate.maxLat } },
      { "location.lng": { $gte: filter.coordinate.minLng, $lte: filter.coordinate.maxLng } }
    );
  }
  if (filter.status) {
    condition = Object.assign(condition, { status: filter.status });
  }
  if (filter.expire != undefined) {
    if (Boolean(filter.expire)) {
      condition = Object.assign(condition, { end_date: { $lte: new Date() } });
    } else {
      condition = Object.assign(condition, { end_date: { $gte: new Date() } });
    }
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
      let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
      return JobPost.find(condition, projection)
        .sort(sort)
        .skip(limit * (page - 1))
        .limit(limit)
        .populate("job_category")
        .populate("job_level")
        .populate("address.city")
        .populate("address.district")
        .populate("address.ward")
        .populate("job_type")
        .populate("benefit.benefit_id")
        .populate("company.ref")
        .populate("user");
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  getBy(getBy: IGetBy, projection) {
    try {
      if (getBy._id) {
        return JobPost.findById(getBy._id, projection)
          .populate("job_category")
          .populate("job_level")
          .populate("job_type")
          .populate("address.city")
          .populate("address.district")
          .populate("address.ward")
          .populate("benefit.benefit_id")
          .populate("company.ref")
          .populate("user");
      } else if (getBy.slug) {
        return JobPost.findOne({ slug: getBy.slug }, projection)
          .populate("job_category")
          .populate("job_level")
          .populate("job_type")
          .populate("address.city")
          .populate("address.district")
          .populate("address.ward")
          .populate("benefit.benefit_id")
          .populate("company.ref")
          .populate("user");
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
      return JobPost.findByIdAndUpdate(data._id, data, { new: true })
        .populate("job_category")
        .populate("job_level")
        .populate("job_type")
        .populate("address.city")
        .populate("address.district")
        .populate("address.ward")
        .populate("benefit.benefit_id")
        .populate("company.ref")
        .populate("user");
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }
}

const JobPostService = new JobPostRepository();
export default JobPostService;
