"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CompanyNotificationRegister_1 = __importDefault(require("../schemas/CompanyNotificationRegister"));
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
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
class CompanyNotificationRegisterRepository {
    count(filter) {
        try {
            let condition = getCondition(filter);
            return CompanyNotificationRegister_1.default.countDocuments(condition);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    create(data) {
        try {
            return CompanyNotificationRegister_1.default.create(data);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    delete(id) {
        try {
            return CompanyNotificationRegister_1.default.findByIdAndRemove(id);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    get(id, projection) {
        try {
            return CompanyNotificationRegister_1.default.findById(id, projection);
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
            return CompanyNotificationRegister_1.default.find(condition, projection).sort(sort).skip(limit * (page - 1)).limit(limit)
                .populate('company');
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    getBy(getBy, projection) {
        try {
            return CompanyNotificationRegister_1.default.findOne(getBy, projection).populate('user').populate('company');
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    update(data) {
        try {
            return CompanyNotificationRegister_1.default.findOne({ company: data.company, user: data.user }).then(r1 => {
                if (r1) {
                    return CompanyNotificationRegister_1.default.findByIdAndRemove(r1._id).then(r2 => {
                        return null;
                    });
                }
                else {
                    return CompanyNotificationRegister_1.default.create({ user: data.user, company: data.company });
                }
            });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
}
const CompanyNotificationRegisterService = new CompanyNotificationRegisterRepository();
exports.default = CompanyNotificationRegisterService;
//# sourceMappingURL=CompanyNotificationRegisterRepository.js.map