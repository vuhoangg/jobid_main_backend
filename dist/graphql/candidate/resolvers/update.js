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
exports.createCandidate = exports.updateCandidate = void 0;
const CandidateRepository_1 = __importDefault(require("../../../db/repositories/CandidateRepository"));
const authenticate_1 = require("../../../middlewares/authenticate");
exports.updateCandidate = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield authenticate_1.authenticate(context, context.res)) {
        let loggedUser = context.user;
        let input = args.input;
        return CandidateRepository_1.default.get(input._id, {}).then((r) => {
            if (r && r.upload_by._id.toString() == loggedUser._id.toString()) {
                return CandidateRepository_1.default.update(args.input);
            }
            else {
                return r;
            }
        });
    }
});
exports.createCandidate = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield authenticate_1.authenticate(context, context.res)) {
        let loggedUser = context.user;
        let input = args.input;
        input = Object.assign(input, { upload_by: loggedUser._id });
        return CandidateRepository_1.default.create(input);
    }
});
//# sourceMappingURL=update.js.map