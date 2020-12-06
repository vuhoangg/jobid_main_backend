"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
const CvWarehouse_1 = __importDefault(require("../schemas/CvWarehouse"));
const getCondition = (filter) => {
    let condition = {};
    if (filter.employer) {
        condition = Object.assign(condition, { employer: filter.employer });
    }
    if (filter.public) {
        condition = Object.assign(condition, { public: filter.public });
    }
    if (filter.status) {
        condition = Object.assign(condition, { status: filter.status });
    }
    return condition;
};
class CvWarehouseRepository {
    constructor() {
        this.create = (data) => {
            try {
                return CvWarehouse_1.default.create(data);
            }
            catch (e) {
                log_1.errorLog(`CvWarehouse::create ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.delete = (_id) => {
            try {
                return CvWarehouse_1.default.findByIdAndRemove(_id);
            }
            catch (e) {
                log_1.errorLog(`CvWarehouse::delete ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.get = (_id, projection = {}) => {
            try {
                return CvWarehouse_1.default.findById(_id, projection);
            }
            catch (e) {
                log_1.errorLog(`CvWarehouse::find ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.update = (data) => {
            try {
                return CvWarehouse_1.default.findByIdAndUpdate(data._id, data, { new: true });
            }
            catch (e) {
                log_1.errorLog(`CvWarehouse::update ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.filter = (filter, page, limit, projection = {}) => {
            try {
                let condition = getCondition(filter);
                return CvWarehouse_1.default.find(condition, projection)
                    .sort({ main_cv: "desc" })
                    .skip(limit * (page - 1))
                    .limit(limit);
            }
            catch (e) {
                log_1.errorLog(`CvWarehouse::filter ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.all = (filter) => {
            try {
                return CvWarehouse_1.default.find(filter);
            }
            catch (e) {
                log_1.errorLog(`CvWarehouse::getBy ${e.message}`);
                return promise_1.promiseNull();
            }
        };
        this.count = (filter) => {
            try {
                let condition = getCondition(filter);
                return CvWarehouse_1.default.countDocuments(condition);
            }
            catch (e) {
                log_1.errorLog(`CvWarehouse::count ${e.message}`);
                return promise_1.promiseNull();
            }
        };
    }
    getBy(getBy, projection) {
        try {
            return CvWarehouse_1.default.findOne(getBy, projection);
        }
        catch (e) {
            log_1.errorLog(`CvWarehouse::getBy ${e.message}`);
            return promise_1.promiseNull();
        }
    }
}
const CvWarehouseService = new CvWarehouseRepository();
exports.default = CvWarehouseService;
//# sourceMappingURL=CvWarehouseRepository.js.map