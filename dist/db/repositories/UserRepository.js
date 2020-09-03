"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../schemas/User"));
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
const moment_1 = __importDefault(require("moment"));
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
    if (filter.keyword) {
        condition = Object.assign(Object.assign({}, condition), { $or: [
                { "customize_info.full_name": new RegExp(filter.keyword, "i") },
                { full_name: new RegExp(filter.keyword, "i") },
            ] });
    }
    if (filter.job) {
        condition = Object.assign(Object.assign({}, condition), { "customize_info.work_preference": Object.assign(Object.assign({}, condition.job_category), { job_category: filter.job }) });
    }
    if (filter.location) {
        condition = Object.assign(Object.assign({}, condition), { "customize_info.work_preference": Object.assign(Object.assign({}, condition.work_preference), { job_location: filter.location }) });
    }
    if (filter.experience_from || filter.experience_to) {
        condition = Object.assign(Object.assign({}, condition), { "customize_info.current_experience_number": { $gte: filter.experience_from, $lte: filter.experience_to } });
    }
    if (filter.salary_from || filter.salary_to) {
        condition = Object.assign(Object.assign({}, condition), { "customize_info.work_preference.salary": { $gte: filter.salary_from, $lte: filter.salary_to } });
    }
    if (filter.level) {
        condition = Object.assign(Object.assign({}, condition), { "customize_info.current_job_level": filter.level });
    }
    if (filter.language) {
        condition = Object.assign(Object.assign({}, condition), { "customize_info.language.lang": filter.language });
    }
    if (filter.education) {
        condition = Object.assign(Object.assign({}, condition), { "customize_info.education_history": { $elemMatch: { qualification: filter.education } } });
    }
    if (filter.nation) {
        condition = Object.assign(Object.assign({}, condition), { "customize_info.nation": filter.nation });
    }
    if (filter.age_from || filter.age_to) {
        const from = moment_1.default().subtract(parseInt(filter.age_from), "years").toISOString();
        const to = moment_1.default().subtract(parseInt(filter.age_to), "years").toISOString();
        condition = Object.assign(Object.assign({}, condition), { "customize_info.birthday": { $gte: to, $lte: from } });
    }
    if (filter.gender) {
        condition = Object.assign(Object.assign({}, condition), { "customize_info.gender": filter.gender });
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
class UserRepository {
    count(filter) {
        try {
            let condition = getCondition(filter);
            return User_1.default.countDocuments(condition);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    create(data) {
        try {
            return User_1.default.create(data);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    delete(id) {
        try {
            return User_1.default.findByIdAndRemove(id);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    get(id, projection) {
        try {
            return User_1.default.findById(id, projection)
                .populate("customize_info.current_job_level")
                .populate("customize_info.location")
                .populate("customize_info.skill")
                .populate("customize_info.work_preference.job_location")
                .populate("customize_info.work_preference.job_category")
                .populate("customize_info.work_preference.job_level")
                .populate("customize_info.work_preference.benefit")
                .populate("info.address.city")
                .populate("info.address.district")
                .populate("info.address.ward")
                .populate("info.experience.level")
                .populate("info.favorite_job.job_type")
                .populate("info.favorite_job.job_category")
                .populate("info.favorite_job.job_location.city")
                .populate("info.favorite_job.job_location.district")
                .populate("info.favorite_job.job_location.ward");
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
            return User_1.default.find(condition, projection)
                .sort(sort)
                .skip(limit * (page - 1))
                .limit(limit)
                .populate("customize_info.current_job_level")
                .populate("customize_info.location")
                .populate("customize_info.skill")
                .populate("customize_info.work_preference.job_location")
                .populate("customize_info.work_preference.job_category")
                .populate("customize_info.work_preference.job_level")
                .populate("customize_info.work_preference.benefit")
                .populate("info.address.city")
                .populate("info.address.district")
                .populate("info.address.ward")
                .populate("info.experience.level")
                .populate("info.favorite_job.job_type")
                .populate("info.favorite_job.job_category")
                .populate("info.favorite_job.job_location.city")
                .populate("info.favorite_job.job_location.district")
                .populate("info.favorite_job.job_location.ward");
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    getBy(getBy, projection) {
        try {
            if (getBy._id) {
                return User_1.default.findById(getBy._id, projection)
                    .populate("customize_info.current_job_level")
                    .populate("customize_info.location")
                    .populate("customize_info.skill")
                    .populate("customize_info.work_preference.job_location")
                    .populate("customize_info.work_preference.job_category")
                    .populate("customize_info.work_preference.job_level")
                    .populate("customize_info.work_preference.benefit")
                    .populate("info.address.city")
                    .populate("info.address.district")
                    .populate("info.address.ward")
                    .populate("info.experience.level")
                    .populate("info.favorite_job.job_type")
                    .populate("info.favorite_job.job_category")
                    .populate("info.favorite_job.job_location.city")
                    .populate("info.favorite_job.job_location.district")
                    .populate("info.favorite_job.job_location.ward");
            }
            else if (getBy.email) {
                return User_1.default.findOne({ email: getBy.email }, projection)
                    .populate("customize_info.current_job_level")
                    .populate("customize_info.location")
                    .populate("customize_info.skill")
                    .populate("customize_info.work_preference.job_location")
                    .populate("customize_info.work_preference.job_category")
                    .populate("customize_info.work_preference.job_level")
                    .populate("customize_info.work_preference.benefit")
                    .populate("info.address.city")
                    .populate("info.address.district")
                    .populate("info.address.ward")
                    .populate("info.experience.level")
                    .populate("info.favorite_job.job_type")
                    .populate("info.favorite_job.job_category")
                    .populate("info.favorite_job.job_location.city")
                    .populate("info.favorite_job.job_location.district")
                    .populate("info.favorite_job.job_location.ward");
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
            return User_1.default.findByIdAndUpdate(data._id, data, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    updateCompanyPermission(data) {
        try {
            return User_1.default.findByIdAndUpdate(data._id, { $addToSet: { company_role: data.company_role } }, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    markSpam(_id) {
        try {
            return User_1.default.findByIdAndUpdate(_id, { $inc: { spam: 1 } }, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
    removeSpam(_id) {
        try {
            return User_1.default.findByIdAndUpdate(_id, { spam: 0 }, { new: true });
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
}
const UserService = new UserRepository();
exports.default = UserService;
//# sourceMappingURL=UserRepository.js.map