import { CrudContract } from "../contracts/CrudContract";
import JobRegister from "../schemas/JobRegister";
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

class JobRegisterRepository implements CrudContract {
    count(filter: IFilter) {
        try {
            let condition = getCondition(filter);
            return JobRegister.countDocuments(condition);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    create(data) {
        try {
            return JobRegister.create(data);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    delete(id) {
        try {
            return JobRegister.findByIdAndRemove(id);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    get(id, projection) {
        try {
            return JobRegister.findById(id, projection);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    filter(filter: IFilter, limit, page, projection) {
        try {
            let condition = getCondition(filter);
            let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
            return JobRegister.find(condition, projection).sort(sort).skip(limit * (page - 1)).limit(limit);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    getBy(getBy: IGetBy, projection) {
        try {
            if (getBy._id) {
                return JobRegister.findById(getBy._id, projection);
            } else if (getBy.slug) {
                return JobRegister.findOne({ slug: getBy.slug }, projection);
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
            return JobRegister.findByIdAndUpdate(data._id, data, { new: true });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }
}

const JobRegisterService = new JobRegisterRepository();
export default JobRegisterService;
