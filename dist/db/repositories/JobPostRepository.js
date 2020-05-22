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
    if (filter.title) {
        condition = Object.assign(condition, { title: new RegExp(filter.title, "i") });
    }
    if (filter.slug) {
        condition = Object.assign(condition, { slug: filter.slug });
    }
    if (filter.job_level) {
        condition = Object.assign(condition, { job_level: filter.job_level });
    }
    if (filter.job_category) {
        condition = Object.assign(condition, { job_category: filter.job_category });
    }
    if (filter.job_location) {
        condition = Object.assign(condition, { job_location: filter.job_location });
    }
    if (filter.job_skill) {
        condition = Object.assign(condition, { job_skill: filter.job_skill });
    }
    if (filter.company_benefit) {
        condition = Object.assign(condition, { "company.benefit.id": filter.company_benefit });
    }
    if (filter.user) {
        condition = Object.assign(condition, { "user.ref": filter.user });
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
                .populate('company.benefit.benefit_id')
                .populate('company.ref')
                .populate('user.ref')
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
                return JobPost_1.default.findById(getBy._id, projection)
                    .populate('job_level')
                    .populate('job_category')
                    .populate('job_location')
                    .populate('job_skill')
                    .populate('job_prefer_language')
                    .populate('company.benefit.benefit_id')
                    .populate('company.ref')
                    .populate('user.ref');
            }
            else if (getBy.slug) {
                return JobPost_1.default.findOne({ slug: getBy.slug }, projection)
                    .populate('job_level')
                    .populate('job_category')
                    .populate('job_location')
                    .populate('job_skill')
                    .populate('job_prefer_language')
                    .populate('company.benefit.benefit_id')
                    .populate('company.ref')
                    .populate('user.ref');
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