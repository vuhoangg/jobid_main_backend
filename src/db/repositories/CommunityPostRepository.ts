import { CrudContract } from "../contracts/CrudContract";
import CommunityPost from "../schemas/CommunityPost";
import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";

interface ISort {
    created?: "newest" | "oldest",
    updated?: "newest" | "oldest",
    view_count?: "high_to_low" | "low_to_high"
}

interface IFilter {
    sort_by?: ISort;
    keyword?: string;
    user?: string;
    status?: string;
    community_category?: string;

    suggestion?: string;
    except?: string;
}

interface IGetBy {
    _id?: string;
    slug?: string;
}

function getCondition(filter: IFilter) {
    let condition = {};
    if (filter.keyword) {
        condition = Object.assign(condition, { $or: [{ title: new RegExp(filter.keyword, "i") }, { description: new RegExp(filter.keyword, "i") }] });
    }
    if (filter.user) {
        condition = Object.assign(condition, { user: filter.user });
    }
    if (filter.status) {
        condition = Object.assign(condition, { status: filter.status });
    }
    if (filter.community_category) {
        condition = Object.assign(condition, { community_category: filter.community_category });
    }
    if (filter.except) {
        condition = Object.assign(condition, { _id: { $ne: filter.except } });
    }
    return condition;
}


function getSort(sortBy: ISort) {
    let sort = {};
    if (sortBy.created) {
        sort = Object.assign(sort, { created_at: (sortBy.created === "newest" ? "desc" : "asc") })
    }
    if (sortBy.updated) {
        sort = Object.assign(sort, { updated_at: (sortBy.updated === "newest" ? "desc" : "asc") })
    }
    if (sortBy.view_count) {
        sort = Object.assign(sort, { view_count: (sortBy.view_count === "high_to_low" ? "desc" : "asc") })
    }
    return sort;
}


class CommunityPostRepository implements CrudContract {
    count(filter: IFilter) {
        try {
            let condition = getCondition(filter);
            return CommunityPost.countDocuments(condition);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    create(data) {
        try {
            return CommunityPost.create(data);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    delete(id) {
        try {
            return CommunityPost.findByIdAndRemove(id);
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    get(id, projection) {
        try {
            return CommunityPost.findById(id, projection).populate('user').populate('community_category');
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    filter(filter: IFilter, limit, page, projection) {
        try {
            let condition = getCondition(filter);
            let sort = filter.sort_by ? getSort(filter.sort_by) : { updated_at: "desc" };

            if (filter.suggestion) {
                return CommunityPost.findById(filter.suggestion, {}).then(r1 => {
                    return CommunityPost.find({
                        _id: { $ne: r1._id },
                        community_category: r1.community_category
                    }, projection).sort(sort).skip(limit * (page - 1)).limit(limit).populate('user').populate('community_category');
                })

            } else {
                return CommunityPost.find(condition, projection).sort(sort).skip(limit * (page - 1)).limit(limit).populate('user').populate('community_category');
            }

        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    getBy(getBy: IGetBy, projection) {
        try {
            return CommunityPost.findOne(getBy, projection).populate('user').populate('community_category');
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    update(data) {
        try {
            return CommunityPost.findByIdAndUpdate(data._id, data, { new: true });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    increaseAnswerCount(_id) {
        try {
            return CommunityPost.findByIdAndUpdate(_id, { $inc: { answer_count: 1 } }, { new: true });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }
    decreaseAnswerCount(_id) {
        try {
            return CommunityPost.findByIdAndUpdate(_id, { $inc: { answer_count: -1 } }, { new: true });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    increaseLike(_id) {
        try {
            return CommunityPost.findByIdAndUpdate(_id, { $inc: { like_count: 1 } }, { new: true });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }
    decreaseLike(_id) {
        try {
            return CommunityPost.findByIdAndUpdate(_id, { $inc: { like_count: -1 } }, { new: true });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }

    increaseViewCountBySlug(slug) {
        try {
            return CommunityPost.findOneAndUpdate({ slug: slug }, { $inc: { view_count: 1 } }, { new: true });
        } catch (e) {
            errorLog(e);
            return promiseNull();
        }
    }
}

const CommunityPostService = new CommunityPostRepository();
export default CommunityPostService;