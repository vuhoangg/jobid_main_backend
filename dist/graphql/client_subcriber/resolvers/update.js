"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientSubcriber = exports.updateClientSubcriber = void 0;
const ClientSubcriberRepository_1 = __importDefault(require("../../../db/repositories/ClientSubcriberRepository"));
const permission_1 = require("../../../helpers/permission");
function updateClientSubcriber(source, args, context, info) {
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return ClientSubcriberRepository_1.default.update(args.input);
        }
    }
}
exports.updateClientSubcriber = updateClientSubcriber;
function createClientSubcriber(source, args, context, info) {
    // if (context.isAuthenticated()) {
    //   let loggedUser = context.user;
    //   if (isSuperUser(loggedUser.email)) {
    return ClientSubcriberRepository_1.default.create(args.input);
    //   }
    // }
}
exports.createClientSubcriber = createClientSubcriber;
//# sourceMappingURL=update.js.map