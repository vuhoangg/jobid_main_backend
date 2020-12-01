"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
const CvTheme_1 = __importDefault(require("../schemas/CvTheme"));
const getCondition = (filter) => {
    let condition = {};
    if (filter.created_by) {
        condition = Object.assign(condition, { created_by: filter.created_by });
    }
    if (filter.status) {
        condition = Object.assign(condition, { status: filter.status });
    }
    return condition;
};
class CvThemeRepository {
    constructor() {
        this.create = (data) => {
            try {
                return CvTheme_1.default.create(data);
            }
            catch (e) {
                log_1.errorLog(`CvTheme::create ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.delete = (_id) => {
            try {
                return CvTheme_1.default.findByIdAndRemove(_id);
            }
            catch (e) {
                log_1.errorLog(`CvTheme::delete ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.get = (_id, projection = {}) => {
            try {
                return CvTheme_1.default.findById(_id, projection);
            }
            catch (e) {
                log_1.errorLog(`CvTheme::find ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.update = (data) => {
            try {
                return CvTheme_1.default.findByIdAndUpdate(data._id, data, { new: true });
            }
            catch (e) {
                log_1.errorLog(`CvTheme::update ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.filter = (filter, page, limit, projection = {}) => {
            try {
                let condition = getCondition(filter);
                return CvTheme_1.default.find(condition, projection)
                    .sort({ title: "asc" })
                    .skip(limit * (page - 1))
                    .limit(limit);
            }
            catch (e) {
                log_1.errorLog(`CvTheme::filter ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.count = (filter) => {
            try {
                let condition = getCondition(filter);
                return CvTheme_1.default.countDocuments(condition);
            }
            catch (e) {
                log_1.errorLog(`CvTheme::count ${e.message}`);
                return promise_1.promiseNull();
            }
        };
    }
    getBy(getBy, projection) {
        try {
            if (getBy._id) {
                return CvTheme_1.default.findById(getBy._id, projection);
            }
            else {
                return promise_1.promiseNull();
            }
        }
        catch (e) {
            log_1.errorLog(`CvTheme::getBy ${e.message}`);
            return promise_1.promiseNull();
        }
    }
}
const CvThemeService = new CvThemeRepository();
exports.default = CvThemeService;
//# sourceMappingURL=CvThemeRepository.js.map