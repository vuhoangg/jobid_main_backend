import { CrudContract } from "../contracts/CrudContract";
import CommunityPostAnswer from "../schemas/CommunityPostAnswer";
import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";

interface ISort {
    created?: "newest" | "oldest",
    updated?: "newest" | "oldest",
}

interface IFilter {
    sort_by?: ISort;
    user?: string;
    community_post?: string;
    reply?: string;

}

interface IGetBy {
    _id?: string;
    community_post?: string;
    user?: string;
}

function getCondition(filter: IFilter) {
    let condition = {};
    if (filter.user) {
        condition = Object.assign(condition, { user: filter.user });
    }
    if (filter.community_post) {
        condition = Object.assign(condition, { community_post: filter.community_post });
    }
    if (filter.reply) {
        condition = Object.assign(condition, { reply: filter.reply });
    } else {
        // condition = Object.assign(condition, { $lt: { reply: filter.reply } });
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


class CommunityPostAnswerRepository implements CrudContract {
    count(filter: IFilter) {
        try {
            let condition = getCondition(filter);
            return CommunityPostAnswer.countDocuments(condition);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    create(data) {
        try {
            return CommunityPostAnswer.create(data);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    delete(id) {
        try {
            return CommunityPostAnswer.findByIdAndRemove(id);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    get(id, projection) {
        try {
            return CommunityPostAnswer.findById(id, projection);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    filter(filter: IFilter, limit, page, projection) {
        try {
            let condition = getCondition(filter);
            let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
            return CommunityPostAnswer.find(condition, projection).sort(sort).skip(limit * (page - 1)).limit(limit)
                .populate("user");
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    getBy(getBy: IGetBy, projection) {
        try {
            return CommunityPostAnswer.findOne(getBy, projection);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    update(data) {
        try {
            return CommunityPostAnswer.findByIdAndUpdate(data._id, data, { new: true });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }
}

const CommunityPostAnswerService = new CommunityPostAnswerRepository();
export default CommunityPostAnswerService;