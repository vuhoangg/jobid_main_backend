"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenNestedObject = (object, prefix = "", res = {}) => {
    return Object.entries(object).reduce((r, [key, val]) => {
        const k = `${prefix}${key}`;
        if (typeof val === "object") {
            exports.flattenNestedObject(val, `${k}.`, r);
        }
        else {
            res[k] = val;
        }
        return r;
    }, res);
};
//# sourceMappingURL=flattenNestedObject.js.map