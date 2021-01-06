import { getAddressLatLng } from "../resolvers/get";
import { AddressLatLng, AddressLatLngArguments } from "../types";

const addressLatLngQueries = {
    addressLatLng: {
        args: AddressLatLngArguments,
        resolve: (source, args, context, info) => getAddressLatLng(source, args, context, info),
        type: AddressLatLng,
    },
};
export default addressLatLngQueries;
