import { CrudContract } from "../contracts/CrudContract";
import CommunityPostView from "../schemas/CommunityPostView";
import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";
import CommunityPost from "../schemas/CommunityPost";

interface ISort {
    created?: "newest" | "oldest",
    updated?: "newest" | "oldest",
}

interface IFilter {
    sort_by?: ISort;
    community_post?: string;
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
    if (filter.community_post) {
        condition = Object.assign(condition, { community_post: filter.community_post });
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

class CommunityPostViewRepository implements CrudContract {
    count(filter: IFilter) {
        try {
            let condition = getCondition(filter);
            return CommunityPostView.countDocuments(condition);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    create(data) {
        try {
            return CommunityPostView.create(data);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    delete(id) {
        try {
            return CommunityPostView.findByIdAndRemove(id);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    get(id, projection) {
        try {
            return CommunityPostView.findById(id, projection);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    filter(filter: IFilter, limit, page, projection) {
        try {
            let condition = getCondition(filter);
            let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
            return CommunityPostView.find(condition, projection)
                .populate('user')
                .populate({ path: 'community_post', populate: { path: 'job_location' } })
                .sort(sort).skip(limit * (page - 1)).limit(limit);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    getBy(getBy: IGetBy, projection) {
        try {
            if (getBy._id) {
                return CommunityPostView.findById(getBy._id, projection);
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
            return CommunityPostView.findByIdAndUpdate(data._id, data, { new: true });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    viewCommunityPost(data) {
        try {
            // update view_count then save tracking
            return CommunityPost.findByIdAndUpdate(data.community_post, { $inc: { view_count: 1 } }).then(r => {
                if (r) {
                    return CommunityPostView.findOneAndUpdate({ community_post: data.community_post, user: data.user }, data, { upsert: true, new: true });
                }
            })
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }
}

const CommunityPostViewService = new CommunityPostViewRepository();
export default CommunityPostViewService;
