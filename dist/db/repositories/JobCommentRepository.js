"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JobComment_1 = __importDefault(require("../schemas/JobComment"));
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
function getCondition(filter) {
    let condition = {};
    if (filter.job_post) {
        condition = Object.assign(condition, { job: filter.job_post });
    }
    return condition;
}
function getSort(sortBy) {
    let sort = {};
    if (sortBy.created) {
        sort = Object.assign(sort, { _id: sortBy.created === "newest" ? "desc" : "asc" });
    }
    if (sortBy.updated) {
        sort = Object.assign(sort, { updated_at: sortBy.updated === "newest" ? "desc" : "asc" });
    }
    return sort;
}
class JobCommentRepository {
    count(filter) {
        try {
            let condition = getCondition(filter);
            return JobComment_1.default.countDocuments(condition);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    create(data) {
        try {
            return JobComment_1.default.create(data);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    delete(id) {
        try {
            return JobComment_1.default.findByIdAndRemove(id);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    get(id, projection) {
        try {
            return JobComment_1.default.findById(id, projection);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    filter(filter, limit, page, projection) {
        try {
            let condition = getCondition(filter);
            let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
            return JobComment_1.default.find(condition, projection)
                .populate("user")
                .sort(sort)
                .skip(limit * (page - 1))
                .limit(limit);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    getBy(getBy, projection) {
        try {
            if (getBy._id) {
                return JobComment_1.default.findById(getBy._id, projection);
            }
            else {
                return (0, promise_1.promiseNull)();
            }
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    update(data) {
        try {
            return JobComment_1.default.findByIdAndUpdate(data._id, data, { new: true });
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
}
const JobCommentService = new JobCommentRepository();
exports.default = JobCommentService;
//# sourceMappingURL=JobCommentRepository.js.map