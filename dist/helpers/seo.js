"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seoDescription = exports.convertDescription = exports.truncateString = exports.freshText = exports.stripProperties = exports.stripTags = void 0;
const he = require("he");
const stripTags = (input, allowed) => {
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join("");
    const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    return input.replace(tags, ($0, $1) => (allowed.indexOf("<" + $1.toLowerCase() + ">") > -1 ? $0 : ""));
};
exports.stripTags = stripTags;
const stripProperties = (input, allowed) => {
    allowed = (((allowed || "") + "").toLowerCase().match(/[a-z][a-z0-9]*/g) || []).join("");
    const properties = /\s([a-z][a-z0-9]*)="[^"]*"/gi;
    return input.replace(properties, ($0, $1) => (allowed.indexOf($1.toLowerCase()) > -1 ? $0 : ""));
};
exports.stripProperties = stripProperties;
// remove tags
const freshText = (input) => {
    input = (0, exports.stripProperties)(input, []);
    input = (0, exports.stripTags)(input, "");
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
exports.freshText = freshText;
const truncateString = (string, length, ending) => {
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
exports.truncateString = truncateString;
const convertDescription = (input) => {
    return input.replace(/&#(\d+);/g, function (match, dec) {
        return String.fromCharCode(dec);
    });
};
exports.convertDescription = convertDescription;
const seoDescription = (text) => {
    if (text) {
        return (0, exports.truncateString)((0, exports.freshText)(he.decode(text)), 255, "");
    }
    return "";
};
exports.seoDescription = seoDescription;
//# sourceMappingURL=seo.js.map