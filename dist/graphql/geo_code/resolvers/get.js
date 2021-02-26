"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geolib_1 = require("geolib");
exports.getDistanceBound = (source, args, context, info) => {
    const bound = geolib_1.getBoundsOfDistance({ lat: args.lat, lng: args.lng }, args.range * 1000);
    return geolib_1.getBounds(bound);
};
//# sourceMappingURL=get.js.map