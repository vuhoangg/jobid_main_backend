"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const he = require("he");
exports.stripTags = (input, allowed) => {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join("");
    const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    return input.replace(tags, ($0, $1) => (allowed.indexOf("<" + $1.toLowerCase() + ">") > -1 ? $0 : ""));
};
exports.stripProperties = (input, allowed) => {
    allowed = (((allowed || "") + "").toLowerCase().match(/[a-z][a-z0-9]*/g) || []).join("");
    const properties = /\s([a-z][a-z0-9]*)="[^"]*"/gi;
    return input.replace(properties, ($0, $1) => (allowed.indexOf($1.toLowerCase()) > -1 ? $0 : ""));
};
// remove tags
exports.freshText = (input) => {
    input = exports.stripProperties(input, []);
    input = exports.stripTags(input, "");
    input = input.replace(/&nbsp;/g, " ");
    input = input.replace(/\r\n/g, " ");
    input = input.replace(/\t/g, " ");
    input = input.replace(/•/g, "");
    input = input.replace(/\*/g, "");
    input = input.replace(//g, "");
    input = input.replace(/\+/g, "");
    input = input.replace(/\-/g, "");
    input = input.replace(/\s+/g, " ");
    input = input.trim();
    return input;
};
exports.truncateString = (string, length, ending) => {
    if (length === null) {
        length = 100;
    }
    if (ending === null) {
        ending = "...";
    }
    if (string.length > length) {
        return string.substring(0, length - ending.length) + ending;
    }
    else {
        return string;
    }
};
exports.convertDescription = (input) => {
    return input.replace(/&#(\d+);/g, function (match, dec) {
        return String.fromCharCode(dec);
    });
};
exports.seoDescription = (text) => {
    if (text) {
        return exports.truncateString(exports.freshText(he.decode(text)), 255, "");
    }
    return "";
};
//# sourceMappingURL=seo.js.map