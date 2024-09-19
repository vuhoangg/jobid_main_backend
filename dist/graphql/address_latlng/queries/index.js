"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = require("../resolvers/get");
const types_1 = require("../types");
const addressLatLngQueries = {
    addressLatLng: {
        args: types_1.AddressLatLngArguments,
        resolve: (source, args, context, info) => (0, get_1.getAddressLatLng)(source, args, context, info),
        type: types_1.AddressLatLng,
    },
};
exports.default = addressLatLngQueries;
//# sourceMappingURL=index.js.map