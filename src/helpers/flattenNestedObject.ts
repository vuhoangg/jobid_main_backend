export const processDataUpdate = (object) => {
  const dataNonId = Object.keys(object).reduce((obj, key) => {
    if (key != "_id") {
      obj[key] = object[key]
    }
    return obj
  }, {});
  return flattenNestedObject(dataNonId);
};

export const flattenNestedObject = (object, prefix = "", res = {}) => {
  return Object.entries(object).reduce((r, [key, val]) => {
    const k = `${prefix}${key}`;
    if (typeof val === "object" && !Array.isArray(val)) {
      flattenNestedObject(val, `${k}.`, r);
    } else {
      res[k] = val;
    }
    return r;
  }, res);
};
