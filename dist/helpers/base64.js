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
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
exports.detectType = (base64) => {
    const result = base64.match(/[^:/]\w+(?=;|,)/)[0];
    if (result === "+xml") {
        return "svg";
    }
    else {
        return result;
    }
};
exports.convertBase64toImage = (base64) => __awaiter(void 0, void 0, void 0, function* () {
    const base64Data = base64.substr(base64.indexOf(",") + 1);
    const time = Date.now();
    const random = crypto_1.default.randomBytes(10).toString("hex");
    const name = time + "_" + random;
    yield fs_1.default.writeFileSync(`storage/static/${name}.${exports.detectType(base64)}`, base64Data, "base64");
    return name;
});
//# sourceMappingURL=base64.js.map