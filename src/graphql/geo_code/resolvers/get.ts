import {getBounds, getBoundsOfDistance} from "geolib";

export const getDistanceBound = (source, args, context, info) => {
  const bound = getBoundsOfDistance(
    {lat: args.lat, lng: args.lng},
    args.range * 1000,
  );
  return getBounds(bound);
};
