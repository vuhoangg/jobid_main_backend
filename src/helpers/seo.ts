const he = require("he");

export const stripTags = (input: string, allowed: string) => {
  allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join("");
  const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  return input.replace(tags, ($0, $1) => (allowed.indexOf("<" + $1.toLowerCase() + ">") > -1 ? $0 : ""));
};

export const stripProperties = (input: any, allowed: any) => {
  allowed = (((allowed || "") + "").toLowerCase().match(/[a-z][a-z0-9]*/g) || []).join("");
  const properties = /\s([a-z][a-z0-9]*)="[^"]*"/gi;
  return input.replace(properties, ($0, $1) => (allowed.indexOf($1.toLowerCase()) > -1 ? $0 : ""));
};

// remove tags
export const freshText = (input: string) => {
  input = stripProperties(input, []);
  input = stripTags(input, "");
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

export const truncateString = (string: string, length: number, ending: string) => {
  if (length === null) {
    length = 100;
  }
  if (ending === null) {
    ending = "...";
  }
  if (string.length > length) {
    return string.substring(0, length - ending.length) + ending;
  } else {
    return string;
  }
};

export const convertDescription = (input: string) => {
  return input.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec);
  });
};

export const seoDescription = (text: string) => {
  if (text) {
    return truncateString(freshText(he.decode(text)), 255, "");
  }
  return "";
};
