import { CrudContract } from "../contracts/CrudContract";
import Banner from "../schemas/Banner";
import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";

interface ISort {
    created?: "newest" | "oldest",
    updated?: "newest" | "oldest",
}

interface IFilter {
    sort_by?: ISort;
    status?: string;
    random: boolean;
}

interface IGetBy {
    _id?: string;
}

function getCondition(filter: IFilter) {
    let condition = {};
    if (filter.status) {
        condition = Object.assign(condition, { status: filter.status });
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

class BannerRepository implements CrudContract {
    count(filter: IFilter) {
        try {
            let condition = getCondition(filter);
            return Banner.countDocuments(condition);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    create(data) {
        try {
            return Banner.create(data);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    delete(id) {
        try {
            return Banner.findByIdAndRemove(id);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    get(id, projection) {
        try {
            return Banner.findById(id, projection);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    filter(filter: IFilter, limit, page, projection) {
        try {
            let condition = getCondition(filter);
            let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
            if (filter.random) {
                return Banner.countDocuments(condition).then(count => {
                    let rd = Math.floor(Math.random() * count);
                    return Banner.find(condition, projection).sort(sort).skip(rd).limit(limit);
                })
            } else {
                return Banner.find(condition, projection).sort(sort).skip(limit * (page - 1)).limit(limit);
            }
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    getBy(getBy: IGetBy, projection) {
        try {
            if (getBy._id) {
                return Banner.findById(getBy._id, projection);
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
            return Banner.findByIdAndUpdate(data._id, data, { new: true });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }
}

const BannerService = new BannerRepository();
export default BannerService;
