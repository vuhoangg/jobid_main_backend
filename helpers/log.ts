export const errorLog = (message) => {
    process.env.APP_DEBUG === "true" ? console.log("error: ", message): null;
};
export const debugLog = (message) => {
    process.env.APP_DEBUG === "false" ? console.log("debug: ", message): null;
};
