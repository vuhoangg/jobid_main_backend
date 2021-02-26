"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_1 = require("@elastic/elasticsearch");
const { ELASTICSEARCH_HOST, ELASTICSEARCH_AUTH_USERNAME, ELASTICSEARCH_AUTH_PASSWORD, STREET_WEIGHT, WARD_WEIGHT, DISTRICT_WEIGHT, CITY_WEIGHT, TEXT_WEIGHT, } = process.env;
const elClient = new elasticsearch_1.Client({
    node: ELASTICSEARCH_HOST,
    auth: {
        username: ELASTICSEARCH_AUTH_USERNAME,
        password: ELASTICSEARCH_AUTH_PASSWORD,
    },
});
exports.getCoordinatesFromText = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: data } = yield elClient.search({
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
    return Object.assign({ edges });
});
exports.getCoordinatesFromLatLong = (source, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const { body: data } = yield elClient.search({
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
    return Object.assign({ edges });
});
//# sourceMappingURL=get.js.map