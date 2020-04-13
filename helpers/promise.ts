export const promiseNull = () => {
    return new Promise(resolve => {
        resolve(null);
    })
};