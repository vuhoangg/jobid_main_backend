import { CrudContract } from "../contracts/CrudContract";
import Employer from "../schemas/Employer";
import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";
import { processDataUpdate } from "../../helpers/flattenNestedObject";
import moment from "moment";

interface ISort {
    created?: "newest" | "oldest";
    updated?: "newest" | "oldest";
}

interface IFilter {
    sort_by?: ISort;
    name?: string;
    spam?: number;
    current_job_level?: string;
    gender?: string;
    nation?: string;
    language?: string;
    salary_from?: string;
    salary_to?: string;
    experience_from?: string;
    experience_to?: string;
    last_updated?: string;
    prefer_job_location?: string;
    prefer_job_category?: string;
    keyword?: string;
    job?: any;
    location?: any;
    level?: any;
    education?: any;
    age_from?: any;
    age_to?: any;
}

interface IGetBy {
    _id?: string;
    email?: string;
}

function getCondition(filter: IFilter) {
    let condition: any = {};
    if (filter.name) {
        condition = Object.assign(condition, {
            $or: [{ first_name: new RegExp(filter.name, "i") }, { last_name: new RegExp(filter.name, "i") }],
        });
    }
    if (filter.spam != undefined) {
        condition = Object.assign(condition, { spam: { $gt: Number(filter.spam) } });
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

class EmployerRepository implements CrudContract {
    count(filter: IFilter) {
        try {
            let condition = getCondition(filter);
            return Employer.countDocuments(condition);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    create(data) {
        try {
            return Employer.create(data);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    delete(id) {
        try {
            return Employer.findByIdAndRemove(id);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    get(id, projection) {
        try {
            return Employer.findById(id, projection);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    filter(filter: IFilter, limit, page, projection) {
        try {
            let condition = getCondition(filter);
            let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
            return Employer.find(condition, projection)
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
                return Employer.findById(getBy._id, projection);
            } else if (getBy.email) {
                return Employer.findOne({ email: getBy.email }, projection);
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
            return Employer.findByIdAndUpdate(data._id, data, { new: true });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    logout(_id) {
        try {
            return Employer.findByIdAndUpdate(_id, { accessToken: "", refreshToken: "" });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    findEmployerRefreshToken(accessToken: string) {
        return Employer.findOne({ accessToken });
    }

    refreshToken(_id: string, accessToken: string, refreshToken: string) {
        return Employer.updateOne({ _id }, { accessToken, refreshToken });
    }

    updateCompanyPermission(data) {
        try {
            return Employer.findByIdAndUpdate(data._id, { $addToSet: { company_role: data.company_role } }, { new: true });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    markSpam(_id) {
        try {
            return Employer.findByIdAndUpdate(_id, { $inc: { spam: 1 } }, { new: true });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    removeSpam(_id) {
        try {
            return Employer.findByIdAndUpdate(_id, { spam: 0 }, { new: true });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    getById(_id) {
        try {
            return Employer.findById(_id);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }
}

const EmployerService = new EmployerRepository();
export default EmployerService;
