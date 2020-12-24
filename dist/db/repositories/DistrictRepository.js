"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
const District_1 = __importDefault(require("../schemas/District"));
const getCondition = (filter) => {
    let condition = {};
    if (filter.name) {
        condition = Object.assign(condition, { name: new RegExp(filter.name, "i") });
    }
    if (filter.city) {
        condition = Object.assign(condition, { city: filter.city });
    }
    return condition;
};
class DistrictRepository {
    constructor() {
        this.create = (data) => {
            try {
                return District_1.default.create(data);
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
        this.delete = (_id) => {
            try {
                return District_1.default.findByIdAndRemove(_id);
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
        this.get = (getBy, projection = {}) => {
            try {
                if (getBy._id) {
                    return District_1.default.findById(getBy._id, projection);
                }
                else {
                    return District_1.default.findOne({ slug: getBy.slug }, projection);
                }
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
        this.update = (data) => {
            try {
                return District_1.default.findByIdAndUpdate(data._id, data, { new: true });
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
        this.filter = (filter, limit, page, projection = {}) => {
            try {
                let condition = getCondition(filter);
                return District_1.default.find(condition, projection)
                    .sort({ name: "asc" })
                    .skip(limit * (page - 1))
                    .limit(limit);
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
        this.count = (filter) => {
            try {
                let condition = getCondition(filter);
                return District_1.default.countDocuments(condition);
            }
            catch (e) {
                log_1.errorLog(e);
                return promise_1.promiseNull();
            }
        };
    }
    getBy(getBy, projection) {
        try {
            if (getBy._id) {
                return District_1.default.findById(getBy._id, projection);
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
}
const DistrictService = new DistrictRepository();
exports.default = DistrictService;
//# sourceMappingURL=DistrictRepository.js.map