"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupPermission = getGroupPermission;
exports.getGroupPermissions = getGroupPermissions;
const helpers_1 = require("../../helpers");
const GroupPermissionRepository_1 = __importDefault(require("../../../db/repositories/GroupPermissionRepository"));
function getGroupPermission(source, args, context, info) {
    const fields = (0, helpers_1.rootField)(info);
    return GroupPermissionRepository_1.default.get(args._id, fields).then((groupPermission) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: groupPermission._id,
            name: groupPermission.name,
            description: groupPermission.description,
            permission: groupPermission.permission,
        };
        return node;
    }));
}
function getGroupPermissions(source, args, context, info) {
    let infos = (0, helpers_1.rootInfo)(info);
    let filter = (0, helpers_1.filterObject)(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    return GroupPermissionRepository_1.default.filter(filter, limit, page, infos.edges).then((groupPermission) => __awaiter(this, void 0, void 0, function* () {
        let countData = infos.pageInfo && infos.pageInfo.length ? yield GroupPermissionRepository_1.default.count(filter) : 0;
        let dataRet = {
            edges: groupPermission.map((item) => ({
                cursor: item._id,
                node: {
                    _id: item._id,
                    name: item.name,
                    description: item.description,
                    permission: item.permission,
                },
            })),
            pageInfo: {
                length: countData,
                hasNextPage: groupPermission.length >= limit,
                hasPreviousPage: page > 1,
            },
        };
        return dataRet;
    }));
}
//# sourceMappingURL=get.js.map