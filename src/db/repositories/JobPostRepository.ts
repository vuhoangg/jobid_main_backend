import { CrudContract } from "../contracts/CrudContract";
import JobPost from "../schemas/JobPost";
import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";
import User from "../schemas/User";

interface ISort {
  view_count?: "low_to_high" | "high_to_low";
  salary?: "low_to_high" | "high_to_low";
  hot?: "low_to_high" | "high_to_low";
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
  employer?: string;
  job_level?: string;
  job_type?: string;
  job_category?: string;
  benefit?: string;
  status?: string;
  company_ref?: string;
  company_name?: string;
  coordinate?: any;
  expire?: boolean;
  salary_min?: number;
  salary_max?: number;
  except?: string;


  // near by here
  job_near?: string;
  latitude?: string;
  longitude?: string;

  suggestion?: string;

  staff_pick?: boolean;
}

interface IGetBy {
  _id?: string;
  slug?: string;
}

function getCondition(filter: IFilter) {
  let condition = {};
  if (filter.title) {
    // condition = Object.assign(condition, { title: new RegExp(filter.title, "i") });
    condition = Object.assign(condition, { "$text": { "$search": `${filter.title}` } });
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
  if (filter.job_level) {
    condition = Object.assign(condition, { job_level: filter.job_level });
  }
  if (filter.job_type) {
    condition = Object.assign(condition, { job_type: filter.job_type });
  }
  if (filter.benefit) {
    condition = Object.assign(condition, { "benefit.benefit_id": filter.benefit });
  }
  if (filter.company_ref) {
    condition = Object.assign(condition, { "company.ref": filter.company_ref });
  } else if (filter.company_name) {
    condition = Object.assign(condition, { "company.name": filter.company_name });
  }

  if (filter.user) {
    condition = Object.assign(condition, { user: filter.user });
  }
  if (filter.employer) {
    condition = Object.assign(condition, { employer: filter.employer });
  }

  if (filter.salary_min) {
    condition = Object.assign(condition, { "salary.min": { $gte: filter.salary_min } });
  }

  if (filter.salary_max) {
    condition = Object.assign(condition, { "salary.max": { $lte: filter.salary_max } });
  }

  if (filter.coordinate) {
    condition = Object.assign(condition, { "address.lat": { $gte: filter.coordinate.minLat, $lte: filter.coordinate.maxLat } });
    condition = Object.assign(condition, { "address.lng": { $gte: filter.coordinate.minLng, $lte: filter.coordinate.maxLng } });
  }

  if (filter.status) {
    condition = Object.assign(condition, { status: filter.status });
  }

  if (filter.staff_pick) {
    condition = Object.assign(condition, { staff_pick: filter.staff_pick });
  }

  if (filter.expire != undefined) {
    if (Boolean(filter.expire)) {
      condition = Object.assign(condition, { end_date: { $lte: new Date() } });
    } else {
      condition = Object.assign(condition, { end_date: { $gte: new Date() } });
    }
  }
  if (filter.except) {
    condition = Object.assign(condition, { _id: { $ne: filter.except } });
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
  if (sortBy.salary) {
    sort = Object.assign(sort, { "salary.max": sortBy.salary === "high_to_low" ? "desc" : "asc" });
  }
  if (sortBy.hot) {
    sort = Object.assign(sort, { view_count: sortBy.salary === "high_to_low" ? "desc" : "asc" });
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
      let sort = filter.sort_by ? getSort(filter.sort_by) : { created_at: "desc" };

      if (filter.suggestion) {
        return User.findById(filter.suggestion).then(r1 => {
          let favorite_job = r1.info.favorite_job || [];
          let job_category = favorite_job.map((item) => item.job_category);
          return JobPost.find({ status: "active", job_category: { "$in": job_category } }, projection)
            .sort(sort)
            .skip(limit * (page - 1))
            .limit(limit);
        })
      } else {
        let sortScore = { };

        if (filter.title) {
          projection = Object.assign(projection, { score: { $meta: "textScore" } });
          sortScore = {...sortScore, ...{ score: { $meta: "textScore" }}}
        }



        sort = Object.assign(sortScore, sort);
        let response = JobPost.find(condition, projection)
          .sort(sort)
          .skip(limit * (page - 1))
          .limit(limit);

        if (projection.job_category) {
          response = response.populate("job_category");
        }
        if (projection.job_level) {
          response = response.populate("job_level");
        }
        if (projection["address"]) {
          response = response.populate("address.city");
        }
        if (projection["address"]) {
          response = response.populate("address.district");
        }
        if (projection["address"]) {
          response = response.populate("address.ward");
        }
        if (projection.job_type) {
          response = response.populate("job_type");
        }
        if (projection['benefit']) {
          response = response.populate("benefit.benefit_id");
        }
        if (projection["company"]) {
          response = response.populate("company.ref");
        }
        if (projection.user) {
          response = response.populate("user");
        }
        return response;
      }


    } catch (e) {
      console.log(e);
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

  increaseViewCountBySlug(slug) {
    try {
      return JobPost.findOneAndUpdate({ slug: slug }, { $inc: { view_count: 1 } }, { new: true });
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }
}

const JobPostService = new JobPostRepository();
export default JobPostService;
