"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistanceBound = void 0;
const geolib_1 = require("geolib");
const getDistanceBound = (source, args, context, info) => {
    const bound = (0, geolib_1.getBoundsOfDistance)({ lat: args.lat, lng: args.lng }, args.range * 1000);
    return (0, geolib_1.getBounds)(bound);
};
exports.getDistanceBound = getDistanceBound;
//# sourceMappingURL=get.js.map