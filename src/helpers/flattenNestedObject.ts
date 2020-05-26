export const flattenNestedObject = (object, prefix = "", res = {}) => {
  return Object.entries(object).reduce((r, [key, val]) => {
    const k = `${prefix}${key}`;
    if (typeof val === "object") {
      flattenNestedObject(val, `${k}.`, r);
    } else {
      res[k] = val;
    }
    return r;
  }, res);
};
