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
    return condition;
};
class CvRequestRepository {
    constructor() {
        this.create = (data) => {
            try {
                return CvRequest_1.default.create(data);
            }
            catch (e) {
                log_1.errorLog(`CvRequest::create ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.delete = (_id) => {
            try {
                return CvRequest_1.default.findByIdAndRemove(_id);
            }
            catch (e) {
                log_1.errorLog(`CvRequest::delete ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.get = (_id, projection = {}) => {
            try {
                return CvRequest_1.default.findById(_id, projection);
            }
            catch (e) {
                log_1.errorLog(`CvRequest::find ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.update = (data) => {
            try {
                return CvRequest_1.default.findByIdAndUpdate(data._id, data, { new: true });
            }
            catch (e) {
                log_1.errorLog(`CvRequest::update ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.filter = (filter, limit, page, projection = {}) => {
            try {
                let condition = getCondition(filter);
                return CvRequest_1.default.find(condition, projection)
                    .sort({ name: "asc" })
                    .skip(limit * (page - 1))
                    .limit(limit);
            }
            catch (e) {
                log_1.errorLog(`CvRequest::filter ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.count = (filter) => {
            try {
                let condition = getCondition(filter);
                return CvRequest_1.default.countDocuments(condition);
            }
            catch (e) {
                log_1.errorLog(`CvRequest::count ${e.message}`);
                return promise_1.promiseNull();
            }
        };
    }
    getBy(getBy, projection) {
        try {
            return CvRequest_1.default.findOne(getBy, projection);
        }
        catch (e) {
            log_1.errorLog(`CvRequest::getBy ${e.message}`);
            return promise_1.promiseNull();
        }
    }
}
const CvRequestService = new CvRequestRepository();
exports.default = CvRequestService;
//# sourceMappingURL=CvRequestRepository.js.map