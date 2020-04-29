"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JobPost_1 = __importDefault(require("../schemas/JobPost"));
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
function getCondition(filter) {
    let condition = {};
    if (filter.vi_title) {
        condition = Object.assign(condition, { vi_title: new RegExp(filter.vi_title, "i") });
    }
    if (filter.en_title) {
        condition = Object.assign(condition, { en_title: new RegExp(filter.en_title, "i") });
    }
    if (filter.vi_slug) {
        condition = Object.assign(condition, { vi_slug: filter.vi_slug });
    }
    if (filter.en_slug) {
        condition = Object.assign(condition, { en_slug: filter.en_slug });
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
    if (sortBy.view_count) {
        sort = Object.assign(sort, { view_count: sortBy.view_count === "high_to_low" ? "desc" : "asc" });
    }
    return sort;
}
class JobPostRepository {
    count(filter) {
        try {
            let condition = getCondition(filter);
            return JobPost_1.default.countDocuments(condition);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    create(data) {
        try {
            return JobPost_1.default.create(data);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    delete(id) {
        try {
            return JobPost_1.default.findByIdAndRemove(id);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    get(id, projection) {
        try {
            return JobPost_1.default.findById(id, projection);
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
            return JobPost_1.default.find(condition, projection)
                .populate('job_level').populate('job_category').populate('job_location').populate('job_skill')
                .populate('job_prefer_language')
                .populate('benefit.id')
                .populate('company.ref')
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
                return JobPost_1.default.findById(getBy._id, projection);
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
            return JobPost_1.default.findByIdAndUpdate(data._id, data, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
}
const JobPostService = new JobPostRepository();
exports.default = JobPostService;
//# sourceMappingURL=JobPostRepository.js.map