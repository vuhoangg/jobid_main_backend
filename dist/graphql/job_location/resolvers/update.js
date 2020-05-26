"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobLocation = exports.updateJobLocation = void 0;
const JobLocationRepository_1 = __importDefault(require("../../../db/repositories/JobLocationRepository"));
const permission_1 = require("../../../helpers/permission");
function updateJobLocation(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return JobLocationRepository_1.default.update(args.input);
        }
    }
}
exports.updateJobLocation = updateJobLocation;
function createJobLocation(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return JobLocationRepository_1.default.create(args.input);
        }
    }
}
exports.createJobLocation = createJobLocation;
//# sourceMappingURL=update.js.map