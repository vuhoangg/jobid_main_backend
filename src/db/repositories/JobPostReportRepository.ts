import { CrudContract } from "../contracts/CrudContract";
import JobPostReport from "../schemas/JobPostReport";
import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";

interface ISort {
    created?: "newest" | "oldest",
    updated?: "newest" | "oldest",
}

interface IFilter {
    sort_by?: ISort;
    user?: string;
    job_post?: string;
}

interface IGetBy {
    _id?: string;
    job_post?: string;
    user?: string;
}

function getCondition(filter: IFilter) {
    let condition = {};
    if (filter.user) {
        condition = Object.assign(condition, { user: filter.user });
    }
    if (filter.job_post) {
        condition = Object.assign(condition, { job_post: filter.job_post });
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


class JobPostReportRepository implements CrudContract {
    count(filter: IFilter) {
        try {
            let condition = getCondition(filter);
            return JobPostReport.countDocuments(condition);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    create(data) {
        try {
            return JobPostReport.create(data);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    delete(id) {
        try {
            return JobPostReport.findByIdAndRemove(id);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    get(id, projection) {
        try {
            return JobPostReport.findById(id, projection);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    filter(filter: IFilter, page, limit, projection) {
        try {
            let condition = getCondition(filter);
            let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
            return JobPostReport.find(condition, projection).sort(sort).skip(limit * (page - 1)).limit(limit);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    getBy(getBy: IGetBy, projection) {
        try {
            return JobPostReport.findOne(getBy, projection);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    update(data) {
        try {
            return JobPostReport.findByIdAndUpdate(data._id, data, { new: true });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }
}

const JobPostReportService = new JobPostReportRepository();
export default JobPostReportService;
