"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JobApply_1 = __importDefault(require("../schemas/JobApply"));
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
function getCondition(filter) {
    let condition = {};
    if (filter.job_post) {
        condition = Object.assign(condition, { job_post: filter.job_post });
    }
    if (filter.user) {
        condition = Object.assign(condition, { user: filter.user });
    }
    if (filter.target) {
        condition = Object.assign(condition, { target: filter.target });
    }
    if (filter.status) {
        condition = Object.assign(condition, { status: filter.status });
    }
    if (filter.createdAt) {
        condition = Object.assign(condition, {
            created_at: {
                $gte: new Date(filter.createdAt.from),
                $lte: new Date(filter.createdAt.to),
            },
        });
    }
    if (filter.updatedAt) {
        condition = Object.assign(condition, {
            updated_at: {
                $gte: new Date(filter.updatedAt.from),
                $lte: new Date(filter.updatedAt.to),
            },
        });
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
class JobApplyRepository {
    count(filter) {
        try {
            let condition = getCondition(filter);
            return JobApply_1.default.countDocuments(condition);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    create(data) {
        try {
            return JobApply_1.default.create(data);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    delete(id) {
        try {
            return JobApply_1.default.findByIdAndRemove(id);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    get(id, projection) {
        try {
            return JobApply_1.default.findById(id, projection)
                .populate("user")
                .populate({ path: "job_post", populate: { path: "job_location" } });
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
            return JobApply_1.default.find(condition, projection)
                .populate("user")
                .populate({ path: "job_post", populate: { path: "job_location" } })
                .sort(sort)
                .skip(limit * (page - 1))
                .limit(limit);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    getBy(getBy, projection) {
        try {
            if (getBy._id) {
                return JobApply_1.default.findById(getBy._id, projection);
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
            return JobApply_1.default.findByIdAndUpdate(data._id, data, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    applyJob(data) {
        try {
            return JobApply_1.default.findOneAndUpdate({
                job_post: data.job_post,
                user: data.user,
                status: data.status,
                file: data.file,
                email: data.email,
                description: data.description,
            }, data, { upsert: true, new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
}
const JobApplyService = new JobApplyRepository();
exports.default = JobApplyService;
//# sourceMappingURL=JobApplyRepository.js.map