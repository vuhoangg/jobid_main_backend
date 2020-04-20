import {CrudContract} from "../contracts/CrudContract";
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

class BaseRepository implements CrudContract {
    count(filter) {
        try {
            return promiseNull();
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    create(data) {
        try {
            return promiseNull();
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    delete(id) {
        try {
            return promiseNull();
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    filter(filter: IFilter, limit, page, projection) {
        try {
            let condition = getCondition(filter);
            let sort = filter.sort_by ? getSort(filter.sort_by) : {_id: "desc"};
            return promiseNull();
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    get(id, projection) {
        try {
            return promiseNull();
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    getBy(getBy: IGetBy, projection) {
        try {
            if (getBy._id) {
                return promiseNull();
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
            return promiseNull();
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

}

const BaseService = new BaseRepository();
export default BaseService;
