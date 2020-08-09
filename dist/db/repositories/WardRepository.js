"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
const Ward_1 = __importDefault(require("../schemas/Ward"));
const getCondition = (filter) => {
    let condition = {};
    if (filter.name) {
        condition = Object.assign(condition, { name: new RegExp(filter.name, "i") });
    }
    if (filter.district) {
        condition = Object.assign(condition, { district: filter.district });
    }
    return condition;
};
class WardRepository {
    constructor() {
        this.create = (data) => {
            try {
                return Ward_1.default.create(data);
            }
            catch (e) {
                log_1.errorLog(`Ward::create ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.delete = (_id) => {
            try {
                return Ward_1.default.findByIdAndRemove(_id);
            }
            catch (e) {
                log_1.errorLog(`Ward::delete ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.get = (getBy, projection = {}) => {
            try {
                if (getBy._id) {
                    return Ward_1.default.findById(getBy._id, projection);
                }
                else {
                    return Ward_1.default.findOne({ slug: getBy.slug }, projection);
                }
            }
            catch (e) {
                log_1.errorLog(`Ward::find ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.update = (data) => {
            try {
                return Ward_1.default.findByIdAndUpdate(data._id, data, { new: true });
            }
            catch (e) {
                log_1.errorLog(`Ward::update ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.filter = (filter, limit, page, projection = {}) => {
            try {
                let condition = getCondition(filter);
                return Ward_1.default.find(condition, projection)
                    .sort({ name: "asc" })
                    .skip(limit * (page - 1))
                    .limit(limit);
            }
            catch (e) {
                log_1.errorLog(`Ward::filter ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.count = (filter) => {
            try {
                let condition = getCondition(filter);
                return Ward_1.default.countDocuments(condition);
            }
            catch (e) {
                log_1.errorLog(`Ward::count ${e.message}`);
                return promise_1.promiseNull();
            }
        };
    }
    getBy(getBy, projection) {
        try {
            if (getBy._id) {
                return Ward_1.default.findById(getBy._id, projection);
            }
            else {
                return promise_1.promiseNull();
            }
        }
        catch (e) {
            log_1.errorLog(`Ward::getBy ${e.message}`);
            return promise_1.promiseNull();
        }
    }
}
const WardService = new WardRepository();
exports.default = WardService;
//# sourceMappingURL=WardRepository.js.map