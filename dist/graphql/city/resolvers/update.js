"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCity = void 0;
const permission_1 = require("../../../helpers/permission");
const CityRepository_1 = __importDefault(require("../../../db/repositories/CityRepository"));
exports.updateCity = (args, context) => {
    // TODO Admin and User has permission
    if (context.isAuthenticated()) {
        let loggedUser = context.user;
        let input = args.input;
        if (permission_1.isSuperUser(loggedUser.email)) {
            return CityRepository_1.default.update(input);
        }
    }
    else {
        return null;
    }
};
//# sourceMappingURL=update.js.map