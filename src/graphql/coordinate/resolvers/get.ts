import {Client} from "@elastic/elasticsearch";

const {
  ELASTICSEARCH_HOST,
  ELASTICSEARCH_AUTH_USERNAME,
  ELASTICSEARCH_AUTH_PASSWORD,
  STREET_WEIGHT,
  WARD_WEIGHT,
  DISTRICT_WEIGHT,
  CITY_WEIGHT,
  TEXT_WEIGHT,
} = process.env;

const elClient = new Client({
  node: ELASTICSEARCH_HOST,
  auth: {
    username: ELASTICSEARCH_AUTH_USERNAME,
    password: ELASTICSEARCH_AUTH_PASSWORD,
  },
});

export const getCoordinatesFromText = async (source, args, context, info) => {
  const {body: data} = await elClient.search({
    index: "coordinates",
    body: {
      query: {
        multi_match: {
          query: args.text,
          fields: [
            `street^${STREET_WEIGHT}`,
            `ward^${WARD_WEIGHT}`,
            `district^${DISTRICT_WEIGHT}`,
            `city^${CITY_WEIGHT}`,
            "text.keywordstring",
            "text.edgengram",
            `text^${TEXT_WEIGHT}`,
          ],
        },
      },
      from: 0,
      size: 10,
    },
  });
  const edges = [];
  if (data.hits.hits.length === 0) {
    return {
      edges: [],
    };
  }
  for (const coordinate of data.hits.hits) {
    const node = {
      cursor: coordinate._id,
      node: {
        _id: coordinate._id,
        latitude: coordinate._source.latitude,
        longitude: coordinate._source.longitude,
        text: coordinate._source.text,
        city: coordinate._source.city,
        district: coordinate._source.district,
        ward: coordinate._source.ward,
        street: coordinate._source.street,
        house_number: coordinate._source.house_number,
      },
    };
    edges.push(node);
  }
  return {
    ...{edges},
  };
};

export const getCoordinatesFromLatLong = async (source, args, context, info) => {
  const {body: data} = await elClient.search({
    index: "coordinates",
    body: {
      query: {
        bool: {
          filter: [
            {
              range: {
                latitude: {
                  gte: args.latitude,
                  lte: args.latitude,
                }
              }
            },
            {
              range: {
                longitude: {
                  gte: args.longitude,
                  lte: args.longitude
                },
              },
            },
          ],
        },
      },
    },
  });
  const edges = [];
  if (data.hits.hits.length === 0) {
    return {
      edges: [],
    };
  }
  for (const coordinate of data.hits.hits) {
    const node = {
      cursor: coordinate._id,
      node: {
        _id: coordinate._id,
        latitude: coordinate._source.latitude,
        longitude: coordinate._source.longitude,
        text: coordinate._source.text,
        city: coordinate._source.city,
        district: coordinate._source.district,
        ward: coordinate._source.ward,
        street: coordinate._source.street,
        house_number: coordinate._source.house_number,
      },
    };
    edges.push(node);
  }
  return {
    ...{edges},
  };
};
