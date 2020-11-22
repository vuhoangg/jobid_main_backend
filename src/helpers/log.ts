export const errorLog = (error) => {
    process.env.APP_DEBUG === "true" ? console.log(`error: ${error.name} ${error.message}`) : null;
};
export const debugLog = (message) => {
    process.env.APP_DEBUG === "true" ? console.log(`debug: ${message}`) : null;
};
