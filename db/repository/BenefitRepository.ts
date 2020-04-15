import {CrudContract} from "../contracts";
import Benefit from "../schema/Benefit";
import {errorLog} from "../../helpers/log";
import {promiseNull} from "../../helpers/promise";

interface ISort {
    created?: "newest" | "oldest",
    updated?: "newest" | "oldest",
}

interface IFilter {
    sort_by?: ISort;
}

interface IGetBy {
    _id?: string;
}

function getCondition(filter: IFilter) {
    let condition = {};
    return condition;
}

function getSort(sortBy: ISort) {
    let sort = {};
    if (sortBy.created) {
        sort = Object.assign(sort, {_id: (sortBy.created === "newest" ? "desc" : "asc")})
    }
    if (sortBy.updated) {
        sort = Object.assign(sort, {updated_at: (sortBy.updated === "newest" ? "desc" : "asc")})
    }
    return sort;
}

class BenefitRepository implements CrudContract {
    count(filter: IFilter) {
        try {
            let condition = getCondition(filter);
            return Benefit.countDocuments(condition);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    create(data) {
        try {
            return Benefit.create(data);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    delete(id) {
        try {
            return Benefit.findByIdAndRemove(id);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    get(id, projection) {
        try {
            return Benefit.findById(id, projection);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    filter(filter: IFilter, limit, page, projection) {
        try {
            let condition = getCondition(filter);
            let sort = filter.sort_by ? getSort(filter.sort_by) : {_id: "desc"};
            return Benefit.find(condition, projection).sort(sort).skip(limit * (page - 1)).limit(limit);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    getBy(getBy: IGetBy, projection) {
        try {
            if (getBy._id) {
                return Benefit.findById(getBy._id, projection);
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
            return Benefit.findByIdAndUpdate(data._id, data, {new: true});
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }
}

const BenefitService = new BenefitRepository();
export default BenefitService;