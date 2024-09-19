"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JobSkill_1 = __importDefault(require("../schemas/JobSkill"));
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
function getCondition(filter) {
    let condition = {};
    if (filter.title) {
        condition = Object.assign(condition, { title: new RegExp(filter.title, "i") });
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
class JobSkillRepository {
    count(filter) {
        try {
            let condition = getCondition(filter);
            return JobSkill_1.default.countDocuments(condition);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    create(data) {
        try {
            return JobSkill_1.default.create(data);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    delete(id) {
        try {
            return JobSkill_1.default.findByIdAndRemove(id);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    get(id, projection) {
        try {
            return JobSkill_1.default.findById(id, projection);
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
            return JobSkill_1.default.find(condition, projection).sort(sort).skip(limit * (page - 1)).limit(limit);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    getBy(getBy, projection) {
        try {
            return JobSkill_1.default.findOne(getBy, projection);
            ;
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    update(data) {
        try {
            return JobSkill_1.default.findByIdAndUpdate(data._id, data, { new: true });
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
}
const JobSkillService = new JobSkillRepository();
exports.default = JobSkillService;
//# sourceMappingURL=JobSkillRepository.js.map