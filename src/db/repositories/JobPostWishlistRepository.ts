import { CrudContract } from "../contracts/CrudContract";
import JobPostWishlist from "../schemas/JobPostWishlist";
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


class JobPostWishlistRepository implements CrudContract {
    count(filter: IFilter) {
        try {
            let condition = getCondition(filter);
            return JobPostWishlist.countDocuments(condition);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    create(data) {
        try {
            return JobPostWishlist.create(data);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    delete(id) {
        try {
            return JobPostWishlist.findByIdAndRemove(id);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    get(id, projection) {
        try {
            return JobPostWishlist.findById(id, projection);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    filter(filter: IFilter, limit, page, projection) {
        try {
            let condition = getCondition(filter);
            let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
            return JobPostWishlist.find(condition, projection).sort(sort).skip(limit * (page - 1)).limit(limit)
                .populate(
                    {
                        path: "job_post",
                        populate: [
                            { path: "address.city" },
                            { path: "company.ref" },
                            { path: "job_type" }
                        ]
                    });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    getBy(getBy: IGetBy, projection) {
        try {
            return JobPostWishlist.findOne(getBy, projection);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    update(data) {
        try {
            return JobPostWishlist.findByIdAndUpdate(data._id, data, { new: true });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }
}

const JobPostWishlistService = new JobPostWishlistRepository();
export default JobPostWishlistService;