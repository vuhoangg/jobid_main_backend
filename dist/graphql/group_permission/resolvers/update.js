"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroupPermission = exports.updateGroupPermission = void 0;
const GroupPermissionRepository_1 = __importDefault(require("../../../db/repositories/GroupPermissionRepository"));
function updateGroupPermission(source, args, context, info) {
    if (context.isAuthenticated()) {
        return GroupPermissionRepository_1.default.update(args.input);
    }
}
exports.updateGroupPermission = updateGroupPermission;
function createGroupPermission(source, args, context, info) {
    if (context.isAuthenticated()) {
        return GroupPermissionRepository_1.default.create(args.input);
    }
}
exports.createGroupPermission = createGroupPermission;
//# sourceMappingURL=update.js.map