"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CompanyView_1 = __importDefault(require("../schemas/CompanyView"));
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
const Company_1 = __importDefault(require("../schemas/Company"));
function getCondition(filter) {
    let condition = {};
    if (filter.user) {
        condition = Object.assign(condition, { user: filter.user });
    }
    if (filter.company) {
        condition = Object.assign(condition, { company: filter.company });
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
class CompanyViewRepository {
    count(filter) {
        try {
            let condition = getCondition(filter);
            return CompanyView_1.default.countDocuments(condition);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    create(data) {
        try {
            return CompanyView_1.default.create(data);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    delete(id) {
        try {
            return CompanyView_1.default.findByIdAndRemove(id);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    get(id, projection) {
        try {
            return CompanyView_1.default.findById(id, projection);
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
            return CompanyView_1.default.find(condition, projection)
                .populate('user')
                .populate({ path: 'company', populate: { path: 'job_location' } })
                .sort(sort).skip(limit * (page - 1)).limit(limit);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    getBy(getBy, projection) {
        try {
            if (getBy._id) {
                return CompanyView_1.default.findById(getBy._id, projection);
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
            return CompanyView_1.default.findByIdAndUpdate(data._id, data, { new: true });
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    viewCompany(data) {
        try {
            // update view_count then save tracking
            return Company_1.default.findByIdAndUpdate(data.company, { $inc: { view_count: 1 } }).then(r => {
                if (r) {
                    return CompanyView_1.default.findOneAndUpdate({ company: data.company, user: data.user }, data, { upsert: true, new: true });
                }
            });
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
}
const CompanyViewService = new CompanyViewRepository();
exports.default = CompanyViewService;
//# sourceMappingURL=CompanyViewRepository.js.map