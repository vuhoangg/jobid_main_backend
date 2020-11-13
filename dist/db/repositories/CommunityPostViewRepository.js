"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommunityPostView_1 = __importDefault(require("../schemas/CommunityPostView"));
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
const CommunityPost_1 = __importDefault(require("../schemas/CommunityPost"));
function getCondition(filter) {
    let condition = {};
    if (filter.user) {
        condition = Object.assign(condition, { user: filter.user });
    }
    if (filter.community_post) {
        condition = Object.assign(condition, { community_post: filter.community_post });
    }
    return condition;
}
function getSort(sortBy) {
    let sort = {};
    if (sortBy.created) {
        sort = Object.assign(sort, { _id: (sortBy.created === "newest" ? "desc" : "asc") });
    }
    if (sortBy.updated) {
        sort = Object.assign(sort, { updated_at: (sortBy.updated === "newest" ? "desc" : "asc") });
    }
    return sort;
}
class CommunityPostViewRepository {
    count(filter) {
        try {
            let condition = getCondition(filter);
            return CommunityPostView_1.default.countDocuments(condition);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    create(data) {
        try {
            return CommunityPostView_1.default.create(data);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    delete(id) {
        try {
            return CommunityPostView_1.default.findByIdAndRemove(id);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    get(id, projection) {
        try {
            return CommunityPostView_1.default.findById(id, projection);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    filter(filter, limit, page, projection) {
        try {
            let condition = getCondition(filter);
            let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
            return CommunityPostView_1.default.find(condition, projection)
                .populate('user')
                .populate({ path: 'community_post', populate: { path: 'job_location' } })
                .sort(sort).skip(limit * (page - 1)).limit(limit);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    getBy(getBy, projection) {
        try {
            if (getBy._id) {
                return CommunityPostView_1.default.findById(getBy._id, projection);
            }
            else {
                return promise_1.promiseNull();
            }
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    update(data) {
        try {
            return CommunityPostView_1.default.findByIdAndUpdate(data._id, data, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    viewCommunityPost(data) {
        try {
            // update view_count then save tracking
            return CommunityPost_1.default.findByIdAndUpdate(data.community_post, { $inc: { view_count: 1 } }).then(r => {
                if (r) {
                    return CommunityPostView_1.default.findOneAndUpdate({ community_post: data.community_post, user: data.user }, data, { upsert: true, new: true });
                }
            });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
}
const CommunityPostViewService = new CommunityPostViewRepository();
exports.default = CommunityPostViewService;
//# sourceMappingURL=CommunityPostViewRepository.js.map