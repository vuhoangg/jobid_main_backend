import { flattenNestedObject } from "../helpers/flattenNestedObject";

export const rootField = (info) => {
  return info.fieldNodes[0].selectionSet.selections.reduce((roots, selection) => {
    roots[selection.name.value] = true;
    return roots;
  }, {});
};

export const getProjection = (fieldASTs) => {
  let selections = fieldASTs.selectionSet.selections;
  let projections = {};
  for (let i = 0; i < selections.length; i++) {
    if (selections[i].selectionSet) {
      projections[`${selections[i].name.value}`] = getProjection(selections[i]);
    } else {
      projections[`${selections[i].name.value}`] = true;
    }
  }
  return projections;

  // return fieldASTs.selectionSet.selections.reduce((projections, selection) => {
  //   projections[selection.name.value] = true;
  //   return projections;
  // }, {});
};

export const rootInfo = (info) => {
  const root = info.fieldNodes[0].selectionSet.selections;
  // console.log(root);
  let pageInfo = null;
  let edges = null;
  for (let i in root) {
    if (root[i].name.value === "pageInfo") {
      pageInfo = getProjection(root[i]);
    } else if (root[i].name.value == "edges") {
      edges = getProjection(root[i].selectionSet.selections[0]);
      // edges = flattenNestedObject(edges);
    }
  }
  return {
    pageInfo,
    edges,
  };
};

export const filterObject = (filter) => {
  const replaceString = filter.split("'").join('"');
  return JSON.parse(replaceString);
};
