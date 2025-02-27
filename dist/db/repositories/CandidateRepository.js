"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Candidate_1 = __importDefault(require("../schemas/Candidate"));
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
function getCondition(filter) {
    let condition = {};
    if (filter.interest) {
        condition = Object.assign(condition, { interest: new RegExp(filter.interest, "i") });
    }
    if (filter.name) {
        condition = Object.assign(condition, { $or: [{ first_name: new RegExp(filter.name, "i") }, { last_name: new RegExp(filter.name, "i") }] });
    }
    if (filter.except) {
        condition = Object.assign(condition, { _id: { $ne: filter.except } });
    }
    if (filter.email) {
        condition = Object.assign(condition, { email: filter.email });
    }
    if (filter.public) {
        condition = Object.assign(condition, { public: filter.public });
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
class CandidateRepository {
    count(filter) {
        try {
            let condition = getCondition(filter);
            return Candidate_1.default.countDocuments(condition);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    create(data) {
        try {
            return Candidate_1.default.create(data);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    delete(id) {
        try {
            return Candidate_1.default.findByIdAndRemove(id);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    get(id, projection) {
        try {
            return Candidate_1.default.findById(id, projection).populate('upload_by');
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
            return Candidate_1.default.find(condition, projection).sort(sort).skip(limit * (page - 1)).limit(limit).populate('upload_by');
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    getBy(getBy, projection) {
        try {
            if (getBy._id) {
                return Candidate_1.default.findById(getBy._id, projection).populate('upload_by');
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
            return Candidate_1.default.findByIdAndUpdate(data._id, data, { new: true }).populate('upload_by');
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
}
const CandidateService = new CandidateRepository();
exports.default = CandidateService;
//# sourceMappingURL=CandidateRepository.js.map