"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenNestedObject = exports.processDataUpdate = void 0;
const processDataUpdate = (object) => {
    const dataNonId = Object.keys(object).reduce((obj, key) => {
        if (key != "_id") {
            obj[key] = object[key];
        }
        return obj;
    }, {});
    return (0, exports.flattenNestedObject)(dataNonId);
};
exports.processDataUpdate = processDataUpdate;
const flattenNestedObject = (object, prefix = "", res = {}) => {
    return Object.entries(object).reduce((r, [key, val]) => {
        const k = `${prefix}${key}`;
        if (typeof val === "object" && !Array.isArray(val)) {
            (0, exports.flattenNestedObject)(val, `${k}.`, r);
        }
        else {
            res[k] = val;
        }
        return r;
    }, res);
};
exports.flattenNestedObject = flattenNestedObject;
//# sourceMappingURL=flattenNestedObject.js.map