"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Employer_1 = __importDefault(require("../schemas/Employer"));
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
function getCondition(filter) {
    let condition = {};
    if (filter.name) {
        condition = Object.assign(condition, {
            $or: [{ first_name: new RegExp(filter.name, "i") }, { last_name: new RegExp(filter.name, "i") }],
        });
    }
    if (filter.spam != undefined) {
        condition = Object.assign(condition, { spam: { $gt: Number(filter.spam) } });
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
class EmployerRepository {
    count(filter) {
        try {
            let condition = getCondition(filter);
            return Employer_1.default.countDocuments(condition);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    create(data) {
        try {
            return Employer_1.default.create(data);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    delete(id) {
        try {
            return Employer_1.default.findByIdAndRemove(id);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    get(id, projection) {
        try {
            return Employer_1.default.findById(id, projection);
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
            return Employer_1.default.find(condition, projection)
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
                return Employer_1.default.findById(getBy._id, projection);
            }
            else if (getBy.email) {
                return Employer_1.default.findOne({ email: getBy.email }, projection);
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
            return Employer_1.default.findByIdAndUpdate(data._id, data, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    logout(_id) {
        try {
            return Employer_1.default.findByIdAndUpdate(_id, { accessToken: "", refreshToken: "" });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    findEmployerRefreshToken(accessToken) {
        return Employer_1.default.findOne({ accessToken });
    }
    refreshToken(_id, accessToken, refreshToken) {
        return Employer_1.default.updateOne({ _id }, { accessToken, refreshToken });
    }
    updateCompanyPermission(data) {
        try {
            return Employer_1.default.findByIdAndUpdate(data._id, { $addToSet: { company_role: data.company_role } }, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    markSpam(_id) {
        try {
            return Employer_1.default.findByIdAndUpdate(_id, { $inc: { spam: 1 } }, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    removeSpam(_id) {
        try {
            return Employer_1.default.findByIdAndUpdate(_id, { spam: 0 }, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    getById(_id) {
        try {
            return Employer_1.default.findById(_id);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
}
const EmployerService = new EmployerRepository();
exports.default = EmployerService;
//# sourceMappingURL=EmployerRepository.js.map