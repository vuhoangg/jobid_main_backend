"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
const CvEmployer_1 = __importDefault(require("../schemas/CvEmployer"));
const getCondition = (filter) => {
    let condition = {};
    if (filter.cv_warehouse) {
        condition = Object.assign(condition, { cv_warehouse: filter.cv_warehouse });
    }
    if (filter.public) {
        condition = Object.assign(condition, { public: filter.public });
    }
    if (filter.status) {
        condition = Object.assign(condition, { status: filter.status });
    }
    return condition;
};
class CvEmployerRepository {
    constructor() {
        this.create = (data) => {
            try {
                return CvEmployer_1.default.create(data);
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
        this.delete = (_id) => {
            try {
                return CvEmployer_1.default.findByIdAndRemove(_id);
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
        this.get = (_id, projection = {}) => {
            try {
                return CvEmployer_1.default.findById(_id, projection);
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
        this.update = (data) => {
            try {
                return CvEmployer_1.default.findByIdAndUpdate(data._id, data, { new: true });
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
        this.filter = (filter, page, limit, projection = {}) => {
            try {
                let condition = getCondition(filter);
                return CvEmployer_1.default.find(condition, projection)
                    .sort({ main_cv: "desc" })
                    .skip(limit * (page - 1))
                    .limit(limit);
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
        this.all = (filter) => {
            try {
                return CvEmployer_1.default.find(filter);
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
        this.count = (filter) => {
            try {
                let condition = getCondition(filter);
                return CvEmployer_1.default.countDocuments(condition);
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
    }
    getBy(getBy, projection) {
        try {
            return CvEmployer_1.default.findOne(getBy, projection);
        }
        catch (e) {
            log_1.errorLog(e);
            return promise_1.promiseNull();
        }
    }
}
const CvEmployerService = new CvEmployerRepository();
exports.default = CvEmployerService;
//# sourceMappingURL=CvEmployerRepository.js.map