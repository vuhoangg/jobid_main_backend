import { CrudContract } from "../contracts/CrudContract";
import CompanyView from "../schemas/CompanyView";
import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";
import Company from "../schemas/Company";

interface ISort {
    created?: "newest" | "oldest",
    updated?: "newest" | "oldest",
}

interface IFilter {
    sort_by?: ISort;
    company?: string;
    user?: string;
}

interface IGetBy {
    _id?: string;
}

function getCondition(filter: IFilter) {
    let condition = {};
    if (filter.user) {
        condition = Object.assign(condition, { user: filter.user });
    }
    if (filter.company) {
        condition = Object.assign(condition, { company: filter.company });
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

class CompanyViewRepository implements CrudContract {
    count(filter: IFilter) {
        try {
            let condition = getCondition(filter);
            return CompanyView.countDocuments(condition);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    create(data) {
        try {
            return CompanyView.create(data);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    delete(id) {
        try {
            return CompanyView.findByIdAndRemove(id);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    get(id, projection) {
        try {
            return CompanyView.findById(id, projection);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    filter(filter: IFilter, limit, page, projection) {
        try {
            let condition = getCondition(filter);
            let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
            return CompanyView.find(condition, projection)
                .populate('user')
                .populate({ path: 'company', populate: { path: 'job_location' } })
                .sort(sort).skip(limit * (page - 1)).limit(limit);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    getBy(getBy: IGetBy, projection) {
        try {
            if (getBy._id) {
                return CompanyView.findById(getBy._id, projection);
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
            return CompanyView.findByIdAndUpdate(data._id, data, { new: true });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    viewCompany(data) {
        try {
            // update view_count then save tracking
            return Company.findByIdAndUpdate(data.company, { $inc: { view_count: 1 } }).then(r => {
                if (r) {
                    return CompanyView.findOneAndUpdate({ company: data.company, user: data.user }, data, { upsert: true, new: true });
                }
            })
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }
}

const CompanyViewService = new CompanyViewRepository();
export default CompanyViewService;
