"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    create(data) {
        try {
            return Company_1.default.create(data);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    delete(id) {
        try {
            return Company_1.default.findByIdAndRemove(id);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    get(_id, projection) {
        try {
            return Company_1.default.findById(_id, projection);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    filter(filter, limit, page, projection) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    let response = yield Company_1.default.find(condition, projection)
                        .sort(sort)
                        .skip(limit * (page - 1))
                        .limit(limit);
                    if (response.some((company) => company.office)) {
                        response = yield Company_1.default.populate(response, { path: "office.city" });
                        response = yield Company_1.default.populate(response, { path: "office.district" });
                        response = yield Company_1.default.populate(response, { path: "office.ward" });
                    }
                    if (response.some((company) => company.created_by)) {
                        response = yield Company_1.default.populate(response, { path: "created_by" });
                    }
                    if (response.some((company) => company.job_category)) {
                        console.log("HELLO");
                        response = yield Company_1.default.populate(response, { path: "job_category" });
                    }
                    return response;
                }
            }
            catch (e) {
                (0, log_1.errorLog)(e);
                return (0, promise_1.promiseNull)();
            }
        });
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
            let dataUpdate = (0, flattenNestedObject_1.processDataUpdate)(data);
            return Company_1.default.findByIdAndUpdate(data._id, data, { new: true })
                .populate("office.city")
                .populate("office.district")
                .populate("office.ward")
                .populate("job_category")
                .populate("benefit.id")
                .populate("created_by");
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    updateUserPermission(data) {
        try {
            return Company_1.default.findByIdAndUpdate(data._id, { $addToSet: { users: data.users } });
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    verify(_id, status = true) {
        try {
            return Company_1.default.findByIdAndUpdate(_id, { verify_status: status }, { new: true });
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    premium(_id, status = true) {
        try {
            return Company_1.default.findByIdAndUpdate(_id, { premium_status: status }, { new: true });
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    increaseFollow(_id) {
        try {
            return Company_1.default.findByIdAndUpdate(_id, { $inc: { follow: 1 } }, { new: true });
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    decreaseFollow(_id) {
        try {
            return Company_1.default.findByIdAndUpdate(_id, { $inc: { follow: -1 } }, { new: true });
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    increaseViewCountBySlug(slug) {
        try {
            return Company_1.default.findOneAndUpdate({ slug: slug }, { $inc: { view_count: 1 } }, { new: true });
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    increaseRating(_id, rateValue) {
        try {
            let rateField = "";
            switch (rateValue) {
                case 1:
                    rateField = "one_star_count";
                    break;
                case 2:
                    rateField = "two_star_count";
                    break;
                case 3:
                    rateField = "three_star_count";
                    break;
                case 4:
                    rateField = "four_star_count";
                    break;
                case 5:
                    rateField = "five_star_count";
                    break;
            }
            if (rateField) {
                let objChange = {};
                objChange[rateField] = 1;
                return Company_1.default.findOneAndUpdate({ _id: _id }, { $inc: objChange }, { new: true });
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
    decreaseRating(_id, rateValue) {
        try {
            let rateField = "";
            switch (rateValue) {
                case 1:
                    rateField = "one_star_count";
                    break;
                case 2:
                    rateField = "two_star_count";
                    break;
                case 3:
                    rateField = "three_star_count";
                    break;
                case 4:
                    rateField = "four_star_count";
                    break;
                case 5:
                    rateField = "five_star_count";
                    break;
            }
            if (rateField) {
                let objChange = {};
                objChange[rateField] = -1;
                return Company_1.default.findOneAndUpdate({ _id: _id }, { $inc: objChange }, { new: true });
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
}
const CompanyService = new CompanyRepository();
exports.default = CompanyService;
//# sourceMappingURL=CompanyRepository.js.map