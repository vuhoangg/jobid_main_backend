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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CityRepository_1 = __importDefault(require("../../../db/repositories/CityRepository"));
const helpers_1 = require("../../helpers");
const seo_1 = require("../../../helpers/seo");
exports.getCity = (source, args, context, info) => {
    const fieldsRoot = helpers_1.rootField(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    return CityRepository_1.default.get(getBy, fieldsRoot).then((city) => {
        const dataCity = {
            _id: city._id,
            description: city.description,
            name: city.name,
            slug: city.slug,
            title: city.title,
            image: city.image,
            image_description: city.image_description,
            seo_title: city.seo_title ? city.seo_title : city.title,
            seo_description: city.seo_description ? city.seo_description : seo_1.seoDescription(city.description),
            focus_keyword: city.focus_keyword,
            created_at: city.created_at,
            updated_at: city.updated_at,
        };
        return dataCity;
    });
};
exports.getCitys = (source, args, context, info) => {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    return CityRepository_1.default.filter(filter, args.limit, args.page, infos.edges).then((citys) => __awaiter(void 0, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < citys.length; i++) {
            let city = {
                cursor: citys[i]._id,
                node: {
                    _id: citys[i]._id,
                    description: citys[i].description,
                    name: citys[i].name,
                    slug: citys[i].slug,
                    title: citys[i].title,
                    image: citys[i].image,
                    image_description: citys[i].image_description,
                    seo_title: citys[i].seo_title ? citys[i].seo_title : citys[i].title,
                    seo_description: citys[i].seo_description ? citys[i].seo_description : seo_1.seoDescription(citys[i].description),
                    focus_keyword: citys[i].focus_keyword,
                    created_at: citys[i].created_at,
                    updated_at: citys[i].updated_at,
                },
            };
            edges.push(city);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield CityRepository_1.default.count(filter) : 0;
        const dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: citys.length >= args.limit,
                hasPreviousPage: args.page > 1,
            } });
        return dataRet;
    }));
};
//# sourceMappingURL=get.js.map