"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommunityPost_1 = __importDefault(require("../schemas/CommunityPost"));
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
function getCondition(filter) {
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
function getSort(sortBy) {
    let sort = {};
    if (sortBy.created) {
        sort = Object.assign(sort, { created_at: (sortBy.created === "newest" ? "desc" : "asc") });
    }
    if (sortBy.updated) {
        sort = Object.assign(sort, { updated_at: (sortBy.updated === "newest" ? "desc" : "asc") });
    }
    if (sortBy.view_count) {
        sort = Object.assign(sort, { view_count: (sortBy.view_count === "high_to_low" ? "desc" : "asc") });
    }
    return sort;
}
class CommunityPostRepository {
    count(filter) {
        try {
            let condition = getCondition(filter);
            return CommunityPost_1.default.countDocuments(condition);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    create(data) {
        try {
            return CommunityPost_1.default.create(data);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    delete(id) {
        try {
            return CommunityPost_1.default.findByIdAndRemove(id);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    get(id, projection) {
        try {
            return CommunityPost_1.default.findById(id, projection).populate('user').populate('community_category');
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    filter(filter, limit, page, projection) {
        try {
            let condition = getCondition(filter);
            let sort = filter.sort_by ? getSort(filter.sort_by) : { updated_at: "desc" };
            if (filter.suggestion) {
                return CommunityPost_1.default.findById(filter.suggestion, {}).then(r1 => {
                    return CommunityPost_1.default.find({
                        _id: { $ne: r1._id },
                        community_category: r1.community_category
                    }, projection).sort(sort).skip(limit * (page - 1)).limit(limit).populate('user').populate('community_category');
                });
            }
            else {
                return CommunityPost_1.default.find(condition, projection).sort(sort).skip(limit * (page - 1)).limit(limit).populate('user').populate('community_category');
            }
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    getBy(getBy, projection) {
        try {
            return CommunityPost_1.default.findOne(getBy, projection).populate('user').populate('community_category');
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    update(data) {
        try {
            return CommunityPost_1.default.findByIdAndUpdate(data._id, data, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    increaseAnswerCount(_id) {
        try {
            return CommunityPost_1.default.findByIdAndUpdate(_id, { $inc: { answer_count: 1 } }, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    decreaseAnswerCount(_id) {
        try {
            return CommunityPost_1.default.findByIdAndUpdate(_id, { $inc: { answer_count: -1 } }, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    increaseLike(_id) {
        try {
            return CommunityPost_1.default.findByIdAndUpdate(_id, { $inc: { like_count: 1 } }, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    decreaseLike(_id) {
        try {
            return CommunityPost_1.default.findByIdAndUpdate(_id, { $inc: { like_count: -1 } }, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    increaseViewCountBySlug(slug) {
        try {
            return CommunityPost_1.default.findOneAndUpdate({ slug: slug }, { $inc: { view_count: 1 } }, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
}
const CommunityPostService = new CommunityPostRepository();
exports.default = CommunityPostService;
//# sourceMappingURL=CommunityPostRepository.js.map