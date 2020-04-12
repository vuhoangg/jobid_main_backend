const numberToString = (n: number) => {
    return n < 10 ? `0${n}` : `${n}`;
};
export const yyyy_mm_dd_hh_mi = (date: Date) => {
    const hour = date.getHours();
    const min = date.getMinutes();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${numberToString(month)}-${numberToString(day)}-${numberToString(hour)}-${numberToString(min)}`;
};

export const yyyy_mm_dd_hh_mi_ss = (date: Date) => {
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${numberToString(month)}-${numberToString(day)}-${numberToString(hour)}-${numberToString(min)}-${numberToString(sec)}`;
};