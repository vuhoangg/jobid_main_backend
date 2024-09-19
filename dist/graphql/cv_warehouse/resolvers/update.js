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
exports.createCvWarehouse = exports.updateCvWarehouse = void 0;
const CvWarehouseRepository_1 = __importDefault(require("../../../db/repositories/CvWarehouseRepository"));
const authenticate_1 = require("../../../middlewares/authenticate");
const updateCvWarehouse = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let isAuthenticated = (0, authenticate_1.authenticateEmployer)(context, context.res);
    if (isAuthenticated) {
        let loggedEmployer = context.res.locals.fullEmployer;
        let _id = args.input._id;
        let r1 = yield CvWarehouseRepository_1.default.get(_id, {});
        if (r1 && r1.employer.toString() == loggedEmployer._id.toString()) {
            return CvWarehouseRepository_1.default.update(args.input);
        }
        else {
            return r1;
        }
    }
});
exports.updateCvWarehouse = updateCvWarehouse;
const createCvWarehouse = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    let input = args.input;
    let isAuthenticated = yield (0, authenticate_1.authenticateEmployer)(context, context.res);
    if (isAuthenticated) {
        let loggedEmployer = context.res.locals.fullEmployer;
        input = Object.assign(input, { employer: loggedEmployer._id });
        return CvWarehouseRepository_1.default.create(input);
    }
});
exports.createCvWarehouse = createCvWarehouse;
//# sourceMappingURL=update.js.map