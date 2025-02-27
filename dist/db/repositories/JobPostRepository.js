"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JobPost_1 = __importDefault(require("../schemas/JobPost"));
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
const User_1 = __importDefault(require("../schemas/User"));
function getCondition(filter) {
    let condition = {};
    if (filter.title) {
        // condition = Object.assign(condition, { title: new RegExp(filter.title, "i") });
        condition = Object.assign(condition, { "$text": { "$search": `${filter.title}` } });
    }
    if (filter.city) {
        condition = Object.assign(condition, { "address.city": filter.city });
    }
    if (filter.district) {
        condition = Object.assign(condition, { "address.district": filter.district });
    }
    if (filter.ward) {
        condition = Object.assign(condition, { "address.ward": filter.ward });
    }
    if (filter.slug) {
        condition = Object.assign(condition, { slug: filter.slug });
    }
    if (filter.job_category) {
        condition = Object.assign(condition, { job_category: filter.job_category });
    }
    if (filter.job_level) {
        condition = Object.assign(condition, { job_level: filter.job_level });
    }
    if (filter.job_type) {
        condition = Object.assign(condition, { job_type: filter.job_type });
    }
    if (filter.benefit) {
        condition = Object.assign(condition, { "benefit.benefit_id": filter.benefit });
    }
    if (filter.company_ref) {
        condition = Object.assign(condition, { "company.ref": filter.company_ref });
    }
    else if (filter.company_name) {
        condition = Object.assign(condition, { "company.name": filter.company_name });
    }
    if (filter.user) {
        condition = Object.assign(condition, { user: filter.user });
    }
    if (filter.employer) {
        condition = Object.assign(condition, { employer: filter.employer });
    }
    if (filter.salary_min) {
        condition = Object.assign(condition, { "salary.min": { $gte: filter.salary_min } });
    }
    if (filter.salary_max) {
        condition = Object.assign(condition, { "salary.max": { $lte: filter.salary_max } });
    }
    if (filter.coordinate) {
        condition = Object.assign(condition, { "address.lat": { $gte: filter.coordinate.minLat, $lte: filter.coordinate.maxLat } });
        condition = Object.assign(condition, { "address.lng": { $gte: filter.coordinate.minLng, $lte: filter.coordinate.maxLng } });
    }
    if (filter.status) {
        condition = Object.assign(condition, { status: filter.status });
    }
    if (filter.staff_pick) {
        condition = Object.assign(condition, { staff_pick: filter.staff_pick });
    }
    if (filter.expire != undefined) {
        if (Boolean(filter.expire)) {
            condition = Object.assign(condition, { end_date: { $lte: new Date() } });
        }
        else {
            condition = Object.assign(condition, { end_date: { $gte: new Date() } });
        }
    }
    if (filter.except) {
        condition = Object.assign(condition, { _id: { $ne: filter.except } });
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
    if (sortBy.view_count) {
        sort = Object.assign(sort, { view_count: sortBy.view_count === "high_to_low" ? "desc" : "asc" });
    }
    if (sortBy.salary) {
        sort = Object.assign(sort, { "salary.max": sortBy.salary === "high_to_low" ? "desc" : "asc" });
    }
    if (sortBy.hot) {
        sort = Object.assign(sort, { view_count: sortBy.salary === "high_to_low" ? "desc" : "asc" });
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
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    create(data) {
        try {
            return JobPost_1.default.create(data);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    delete(id) {
        try {
            return JobPost_1.default.findByIdAndRemove(id);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    get(id, projection) {
        try {
            return JobPost_1.default.findById(id, projection);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    filter(filter, limit, page, projection) {
        try {
            let condition = getCondition(filter);
            let sort = filter.sort_by ? getSort(filter.sort_by) : { created_at: "desc" };
            if (filter.suggestion) {
                return User_1.default.findById(filter.suggestion).then(r1 => {
                    let favorite_job = r1.info.favorite_job || [];
                    let job_category = favorite_job.map((item) => item.job_category);
                    return JobPost_1.default.find({ status: "active", job_category: { "$in": job_category } }, projection)
                        .sort(sort)
                        .skip(limit * (page - 1))
                        .limit(limit);
                });
            }
            else {
                let sortScore = {};
                if (filter.title) {
                    projection = Object.assign(projection, { score: { $meta: "textScore" } });
                    sortScore = Object.assign(Object.assign({}, sortScore), { score: { $meta: "textScore" } });
                }
                sort = Object.assign(sortScore, sort);
                let response = JobPost_1.default.find(condition, projection)
                    .sort(sort)
                    .skip(limit * (page - 1))
                    .limit(limit);
                if (projection.job_category) {
                    response = response.populate("job_category");
                }
                if (projection.job_level) {
                    response = response.populate("job_level");
                }
                if (projection["address"]) {
                    response = response.populate("address.city");
                }
                if (projection["address"]) {
                    response = response.populate("address.district");
                }
                if (projection["address"]) {
                    response = response.populate("address.ward");
                }
                if (projection.job_type) {
                    response = response.populate("job_type");
                }
                if (projection['benefit']) {
                    response = response.populate("benefit.benefit_id");
                }
                if (projection["company"]) {
                    response = response.populate("company.ref");
                }
                if (projection.user) {
                    response = response.populate("user");
                }
                return response;
            }
        }
        catch (e) {
            console.log(e);
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    getBy(getBy, projection) {
        try {
            if (getBy._id) {
                return JobPost_1.default.findById(getBy._id, projection)
                    .populate("job_category")
                    .populate("job_level")
                    .populate("job_type")
                    .populate("address.city")
                    .populate("address.district")
                    .populate("address.ward")
                    .populate("benefit.benefit_id")
                    .populate("company.ref")
                    .populate("user");
            }
            else if (getBy.slug) {
                return JobPost_1.default.findOne({ slug: getBy.slug }, projection)
                    .populate("job_category")
                    .populate("job_level")
                    .populate("job_type")
                    .populate("address.city")
                    .populate("address.district")
                    .populate("address.ward")
                    .populate("benefit.benefit_id")
                    .populate("company.ref")
                    .populate("user");
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
            return JobPost_1.default.findByIdAndUpdate(data._id, data, { new: true })
                .populate("job_category")
                .populate("job_level")
                .populate("job_type")
                .populate("address.city")
                .populate("address.district")
                .populate("address.ward")
                .populate("benefit.benefit_id")
                .populate("company.ref")
                .populate("user");
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    increaseViewCountBySlug(slug) {
        try {
            return JobPost_1.default.findOneAndUpdate({ slug: slug }, { $inc: { view_count: 1 } }, { new: true });
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
}
const JobPostService = new JobPostRepository();
exports.default = JobPostService;
//# sourceMappingURL=JobPostRepository.js.map