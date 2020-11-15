"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Company_1 = __importDefault(require("../schemas/Company"));
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
const flattenNestedObject_1 = require("../../helpers/flattenNestedObject");
const User_1 = __importDefault(require("../schemas/User"));
function getCondition(filter) {
    let condition = {};
    if (filter.name) {
        condition = Object.assign(condition, { name: new RegExp(filter.name, "i") });
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
    if (filter.office_city) {
        condition = Object.assign(condition, { "office.city": filter.office_city });
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
    if (sortBy.follow) {
        sort = Object.assign(sort, { follow: sortBy.follow === "high_to_low" ? "desc" : "asc" });
    }
    if (sortBy.hot) {
        sort = Object.assign(sort, { follow: sortBy.follow === "high_to_low" ? "desc" : "asc" });
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
    get(_id, projection) {
        try {
            return Company_1.default.findById(_id, projection);
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
            if (filter.suggestion) {
                return User_1.default.findById(filter.suggestion).then(r1 => {
                    let favorite_job = r1.info.favorite_job || [];
                    let job_category = favorite_job.map((item) => item.job_category);
                    return Company_1.default.find({ verify_status: true, job_category: { "$in": job_category } }, projection)
                        .sort(sort)
                        .skip(limit * (page - 1))
                        .limit(limit);
                });
            }
            else {
                return Company_1.default.find(condition, projection)
                    .populate("office.city")
                    .populate("office.district")
                    .populate("office.ward")
                    .populate("created_by")
                    .populate("job_category")
                    .sort(sort)
                    .skip(limit * (page - 1))
                    .limit(limit);
            }
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    getBy(getBy, projection) {
        try {
            if (getBy._id) {
                return Company_1.default.findById(getBy._id, projection)
                    .populate("office.city")
                    .populate("office.district")
                    .populate("office.ward")
                    .populate("job_category")
                    .populate("benefit.id")
                    .populate("created_by");
            }
            else if (getBy.slug) {
                return Company_1.default.findOne({ slug: getBy.slug }, projection)
                    .populate("office.city")
                    .populate("office.district")
                    .populate("office.ward")
                    .populate("job_category")
                    .populate("benefit.id")
                    .populate("created_by");
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
            let dataUpdate = flattenNestedObject_1.processDataUpdate(data);
            return Company_1.default.findByIdAndUpdate(data._id, data, { new: true })
                .populate("office.city")
                .populate("office.district")
                .populate("office.ward")
                .populate("job_category")
                .populate("benefit.id")
                .populate("created_by");
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
    increaseFollow(_id) {
        try {
            return Company_1.default.findByIdAndUpdate(_id, { $inc: { follow: 1 } }, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    decreaseFollow(_id) {
        try {
            return Company_1.default.findByIdAndUpdate(_id, { $inc: { follow: -1 } }, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    increaseViewCountBySlug(slug) {
        try {
            return Company_1.default.findOneAndUpdate({ slug: slug }, { $inc: { view_count: 1 } }, { new: true });
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