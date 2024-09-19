"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterObject = exports.rootInfo = exports.getProjection = exports.rootField = void 0;
const rootField = (info) => {
    return info.fieldNodes[0].selectionSet.selections.reduce((roots, selection) => {
        roots[selection.name.value] = true;
        return roots;
    }, {});
};
exports.rootField = rootField;
const getProjection = (fieldASTs) => {
    // let selections = fieldASTs.selectionSet.selections;
    // let projections = {};
    // for (let i = 0; i < selections.length; i++) {
    //   if (selections[i].selectionSet) {
    //     projections[`${selections[i].name.value}`] = getProjection(selections[i]);
    //   } else {
    //     projections[`${selections[i].name.value}`] = true;
    //   }
    // }
    // return projections;
    return fieldASTs.selectionSet.selections.reduce((projections, selection) => {
        projections[selection.name.value] = true;
        return projections;
    }, {});
};
exports.getProjection = getProjection;
const rootInfo = (info) => {
    const root = info.fieldNodes[0].selectionSet.selections;
    // console.log(root);
    let pageInfo = null;
    let edges = null;
    for (let i in root) {
        if (root[i].name.value === "pageInfo") {
            pageInfo = (0, exports.getProjection)(root[i]);
        }
        else if (root[i].name.value == "edges") {
            edges = (0, exports.getProjection)(root[i].selectionSet.selections[0]);
            // edges = flattenNestedObject(edges);
        }
    }
    return {
        pageInfo,
        edges,
    };
};
exports.rootInfo = rootInfo;
const filterObject = (filter) => {
    const replaceString = filter.split("'").join('"');
    return JSON.parse(replaceString);
};
exports.filterObject = filterObject;
//# sourceMappingURL=helpers.js.map