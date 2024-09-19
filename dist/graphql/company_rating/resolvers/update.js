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
exports.createJobRating = void 0;
const CompanyRatingRepository_1 = __importDefault(require("../../../db/repositories/CompanyRatingRepository"));
const CompanyRepository_1 = __importDefault(require("../../../db/repositories/CompanyRepository"));
const authenticate_1 = require("../../../middlewares/authenticate");
// export const updateJobRating = async (source, args, context, info) => {
//   if (await authenticateUser(context, context.res)) {
//     let input = args.input;
//     return CompanyRatingService.update(input).then(async (data) => data);
//   }
// };
const createJobRating = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, authenticate_1.authenticateUser)(context, context.res)) {
        let input = args.input;
        let loggedUser = context.res.locals.fullUser;
        let findRating = yield CompanyRatingRepository_1.default.getBy({ user: loggedUser._id, company: input.company }, {});
        let new_rate = input.rate_value;
        if (findRating) {
            let old_rate = findRating.rate_value;
            input = Object.assign(input, { _id: findRating._id });
            let companyRating = yield CompanyRatingRepository_1.default.update(input);
            if (new_rate != old_rate) {
                yield CompanyRepository_1.default.decreaseRating(input.company, old_rate);
                yield CompanyRepository_1.default.increaseRating(input.company, new_rate);
            }
            return companyRating;
        }
        else {
            input = Object.assign(input, { user: loggedUser._id });
            yield CompanyRepository_1.default.increaseRating(input.company, new_rate);
            let companyRating = yield CompanyRatingRepository_1.default.create(input);
            return companyRating;
        }
    }
});
exports.createJobRating = createJobRating;
//# sourceMappingURL=update.js.map