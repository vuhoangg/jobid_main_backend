"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootField = (info) => {
    return info.fieldNodes[0].selectionSet.selections.reduce((roots, selection) => {
        roots[selection.name.value] = true;
        return roots;
    }, {});
};
exports.getProjection = (fieldASTs) => {
    return fieldASTs.selectionSet.selections.reduce((projections, selection) => {
        projections[selection.name.value] = true;
        return projections;
    }, {});
};
exports.rootInfo = (info) => {
    const root = info.fieldNodes[0].selectionSet.selections;
    // console.log(root);
    let pageInfo = null;
    let edges = null;
    for (let i in root) {
        if (root[i].name.value === "pageInfo") {
            pageInfo = exports.getProjection(root[i]);
        }
        else if (root[i].name.value == "edges") {
            edges = exports.getProjection(root[i].selectionSet.selections[0]);
        }
    }
    return {
        pageInfo,
        edges,
    };
};
exports.filterObject = (filter) => {
    const replaceString = filter.split("'").join('"');
    return JSON.parse(replaceString);
};
//# sourceMappingURL=helpers.js.map