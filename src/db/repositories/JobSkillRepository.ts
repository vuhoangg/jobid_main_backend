import { CrudContract } from "../contracts/CrudContract";
import JobSkill from "../schemas/JobSkill";
import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";

interface ISort {
  created?: "newest" | "oldest",
  updated?: "newest" | "oldest",
}

interface IFilter {
  sort_by?: ISort;
  title?: string;
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
  return condition;
}

function getSort(sortBy: ISort) {
  let sort = {};
  if (sortBy.created) {
    sort = Object.assign(sort, { _id: (sortBy.created === "newest" ? "desc" : "asc") })
  }
  if (sortBy.updated) {
    sort = Object.assign(sort, { updated_at: (sortBy.updated === "newest" ? "desc" : "asc") })
  }
  return sort;
}

class JobSkillRepository implements CrudContract {
  count(filter: IFilter) {
    try {
      let condition = getCondition(filter);
      return JobSkill.countDocuments(condition);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  create(data) {
    try {
      return JobSkill.create(data);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  delete(id) {
    try {
      return JobSkill.findByIdAndRemove(id);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  get(id, projection) {
    try {
      return JobSkill.findById(id, projection);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  filter(filter: IFilter, limit, page, projection) {
    try {
      let condition = getCondition(filter);
      let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
      return JobSkill.find(condition, projection).sort(sort).skip(limit * (page - 1)).limit(limit);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  getBy(getBy: IGetBy, projection) {
    try {
      return JobSkill.findOne(getBy, projection);;

    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  update(data) {
    try {
      return JobSkill.findByIdAndUpdate(data._id, data, { new: true });
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }
}

const JobSkillService = new JobSkillRepository();
export default JobSkillService;
