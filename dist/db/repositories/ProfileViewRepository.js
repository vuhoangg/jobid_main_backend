"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProfileView_1 = __importDefault(require("../schemas/ProfileView"));
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
function getCondition(filter) {
    let condition = {};
    if (filter.user_hunter) {
        condition = Object.assign(condition, { user_hunter: filter.user_hunter });
    }
    if (filter.user_profile) {
        condition = Object.assign(condition, { user_profile: filter.user_profile });
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
class ProfileViewRepository {
    count(filter) {
        try {
            let condition = getCondition(filter);
            return ProfileView_1.default.countDocuments(condition);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    create(data) {
        try {
            return ProfileView_1.default.create(data);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    delete(id) {
        try {
            return ProfileView_1.default.findByIdAndRemove(id);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    get(id, projection) {
        try {
            return ProfileView_1.default.findById(id, projection).populate('user_hunter').populate('user_profile');
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
            return ProfileView_1.default.find(condition, projection).populate('user_hunter').populate('user_profile').sort(sort).skip(limit * (page - 1)).limit(limit);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    getBy(getBy, projection) {
        try {
            if (getBy._id) {
                return ProfileView_1.default.findById(getBy._id, projection);
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
            return ProfileView_1.default.findByIdAndUpdate(data._id, data, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    profileView(data) {
        try {
            let updateData = Object.assign(data, { $inc: { view_count: 1 } });
            return ProfileView_1.default.findOneAndUpdate({ user_hunter: data.user_hunter, user_profile: data.user_profile }, updateData, { new: true, upsert: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
}
const ProfileViewService = new ProfileViewRepository();
exports.default = ProfileViewService;
//# sourceMappingURL=ProfileViewRepository.js.map