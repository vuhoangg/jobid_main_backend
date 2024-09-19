"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
const CvRequest_1 = __importDefault(require("../schemas/CvRequest"));
const getCondition = (filter) => {
    let condition = {};
    if (filter.cv_user) {
        condition = Object.assign(condition, { cv_user: filter.cv_user });
    }
    return condition;
};
class CvRequestRepository {
    constructor() {
        this.create = (data) => {
            try {
                return CvRequest_1.default.create(data);
            }
            catch (e) {
                (0, log_1.errorLog)(e);
                return (0, promise_1.promiseNull)();
            }
        };
        this.delete = (_id) => {
            try {
                return CvRequest_1.default.findByIdAndRemove(_id);
            }
            catch (e) {
                (0, log_1.errorLog)(e);
                return (0, promise_1.promiseNull)();
            }
        };
        this.get = (_id, projection = {}) => {
            try {
                return CvRequest_1.default.findById(_id, projection);
            }
            catch (e) {
                (0, log_1.errorLog)(e);
                return (0, promise_1.promiseNull)();
            }
        };
        this.update = (data) => {
            try {
                return CvRequest_1.default.findByIdAndUpdate(data._id, data, { new: true });
            }
            catch (e) {
                (0, log_1.errorLog)(e);
                return (0, promise_1.promiseNull)();
            }
        };
        this.filter = (filter, page, limit, projection = {}) => {
            try {
                let condition = getCondition(filter);
                return CvRequest_1.default.find(condition, projection)
                    .sort({ _id: "desc" })
                    .skip(limit * (page - 1))
                    .limit(limit);
            }
            catch (e) {
                (0, log_1.errorLog)(e);
                return (0, promise_1.promiseNull)();
            }
        };
        this.count = (filter) => {
            try {
                let condition = getCondition(filter);
                return CvRequest_1.default.countDocuments(condition);
            }
            catch (e) {
                (0, log_1.errorLog)(e);
                return (0, promise_1.promiseNull)();
            }
        };
    }
    getBy(getBy, projection) {
        try {
            return CvRequest_1.default.findOne(getBy, projection);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
}
const CvRequestService = new CvRequestRepository();
exports.default = CvRequestService;
//# sourceMappingURL=CvRequestRepository.js.map