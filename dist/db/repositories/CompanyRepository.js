"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Company_1 = __importDefault(require("../schemas/Company"));
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
function getCondition(filter) {
    let condition = {};
    if (filter.name) {
        condition = Object.assign(condition, {
            $or: [{ vi_name: new RegExp(filter.name, "i") }, { en_name: new RegExp(filter.name, "i") }],
        });
    }
    if (filter.verify_status) {
        condition = Object.assign(condition, { verify_status: filter.verify_status });
    }
    if (filter.premium_status) {
        condition = Object.assign(condition, { premium_status: filter.premium_status });
    }
    if (filter.job_category) {
        condition = Object.assign(condition, { job_category: filter.job_category });
    }
    if (filter.job_location) {
        condition = Object.assign(condition, { job_location: filter.job_location });
    }
    if (filter.created_by) {
        condition = Object.assign(condition, { created_by: filter.created_by });
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
class CompanyRepository {
    count(filter) {
        try {
            let condition = getCondition(filter);
            return Company_1.default.countDocuments(condition);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    create(data) {
        try {
            console.log("data", data);
            return Company_1.default.create(data);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    delete(id) {
        try {
            return Company_1.default.findByIdAndRemove(id);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    get(id, projection) {
        try {
            return Company_1.default.findById(id, projection);
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
            return Company_1.default.find(condition, projection)
                .populate('job_category')
                .populate('job_location')
                .populate({
                path: 'list_user',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            })
                .populate({
                path: 'list_user',
                populate: {
                    path: 'target_permission',
                    model: 'GroupPermission'
                }
            })
                .sort(sort).skip(limit * (page - 1))
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
                return Company_1.default.findById(getBy._id, projection).populate("job_category").populate("job_location");
            }
            else if (getBy.slug) {
                return Company_1.default.findOne({ $or: [{ vi_slug: getBy.slug }, { en_slug: getBy.slug }] }, projection)
                    .populate('job_category')
                    .populate('job_location')
                    .populate({
                    path: 'list_user',
                    populate: {
                        path: 'user',
                        model: 'User'
                    }
                })
                    .populate({
                    path: 'list_user',
                    populate: {
                        path: 'target_permission',
                        model: 'GroupPermission'
                    }
                });
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
            return Company_1.default.findByIdAndUpdate(data._id, data, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    updateUserPermission(data) {
        try {
            return Company_1.default.findByIdAndUpdate(data._id, { $addToSet: { users: data.users } });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    verify(_id, status = true) {
        try {
            return Company_1.default.findByIdAndUpdate(_id, { verify_status: status }, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    premium(_id, status = true) {
        try {
            return Company_1.default.findByIdAndUpdate(_id, { premium_status: status }, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
}
const CompanyService = new CompanyRepository();
exports.default = CompanyService;
//# sourceMappingURL=CompanyRepository.js.map