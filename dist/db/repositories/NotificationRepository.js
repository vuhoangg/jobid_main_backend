"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../helpers/log");
const promise_1 = require("../../helpers/promise");
const Notification_1 = __importDefault(require("../schemas/Notification"));
function getCondition(filter) {
    let condition = {};
    if (filter.type) {
        condition = Object.assign(condition, { type: filter.type });
    }
    if (filter.subject) {
        condition = Object.assign(condition, { subject: filter.subject });
    }
    if (filter.target_object_type) {
        condition = Object.assign(condition, { "target.object_type": filter.target_object_type });
    }
    if (filter.target_ref) {
        condition = Object.assign(condition, { "target.ref": filter.target_ref });
    }
    if (filter.read != undefined) {
        condition = Object.assign(condition, { read: filter.read });
    }
    return condition;
}
function getSort(sortBy) {
    let sort = {};
    if (sortBy.created) {
        sort = Object.assign(sort, { _id: (sortBy.created === "newest" ? "desc" : "asc") });
    }
    if (sortBy.updated) {
        sort = Object.assign(sort, { updated_at: (sortBy.updated === "newest" ? "desc" : "asc") });
    }
    return sort;
}
class NotificationRepository {
    count(filter) {
        try {
            let condition = getCondition(filter);
            return Notification_1.default.countDocuments(condition);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    create(data) {
        try {
            return Notification_1.default.create(data);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    delete(id) {
        try {
            return Notification_1.default.findByIdAndRemove(id);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    filter(filter, limit, page, projection) {
        try {
            let condition = getCondition(filter);
            let sort = filter.sort_by ? getSort(filter.sort_by) : { _id: "desc" };
            return Notification_1.default.find(condition, projection).sort(sort).skip(limit * (page - 1)).limit(limit);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    get(id, projection) {
        try {
            return Notification_1.default.findById(id, projection);
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    getBy(getBy, projection) {
        try {
            if (getBy._id) {
                return Notification_1.default.findById(getBy._id, projection);
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
            return Notification_1.default.findByIdAndUpdate(data._id, data, { new: true });
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    readNotification(data) {
        try {
            return Notification_1.default.findOneAndUpdate({ _id: data._id, "target.ref": data.target, read: false }, { read: true }, { new: true });
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
    readAllNotification(data) {
        try {
            return Notification_1.default.updateMany({ "target.ref": data.target, read: false }, { read: true }, { new: true });
        }
        catch (e) {
            (0, log_1.errorLog)(e);
            return (0, promise_1.promiseNull)();
        }
    }
}
const NotificationService = new NotificationRepository();
exports.default = NotificationService;
//# sourceMappingURL=NotificationRepository.js.map