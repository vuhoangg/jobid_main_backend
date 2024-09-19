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
exports.getDistricts = exports.getDistrict = void 0;
const DistrictRepository_1 = __importDefault(require("../../../db/repositories/DistrictRepository"));
const helpers_1 = require("../../helpers");
const seo_1 = require("../../../helpers/seo");
const getDistrict = (source, args, context, info) => {
    const fieldsRoot = (0, helpers_1.rootField)(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    return DistrictRepository_1.default.get(getBy, fieldsRoot).then((district) => {
        const dataDistrict = {
            _id: district._id,
            city: district.city,
            description: district.description,
            name: district.name,
            slug: district.slug,
            title: district.title,
            image: district.image,
            image_description: district.image_description,
            seo_title: district.seo_title ? district.seo_title : district.title,
            seo_description: district.seo_description ? district.seo_description : (0, seo_1.seoDescription)(district.description),
            focus_keyword: district.focus_keyword,
            created_at: district.created_at,
            updated_at: district.updated_at,
        };
        return dataDistrict;
    });
};
exports.getDistrict = getDistrict;
const getDistricts = (source, args, context, info) => {
    let infos = (0, helpers_1.rootInfo)(info);
    let filter = (0, helpers_1.filterObject)(args.filter);
    return DistrictRepository_1.default.filter(filter, args.limit, args.page, infos.edges).then((districts) => __awaiter(void 0, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < districts.length; i++) {
            let district = {
                cursor: districts[i]._id,
                node: {
                    _id: districts[i]._id,
                    city: districts[i].city,
                    description: districts[i].description,
                    name: districts[i].name,
                    slug: districts[i].slug,
                    title: districts[i].title,
                    image: districts[i].image,
                    image_description: districts[i].image_description,
                    seo_title: districts[i].seo_title ? districts[i].seo_title : districts[i].title,
                    seo_description: districts[i].seo_description ? districts[i].seo_description : (0, seo_1.seoDescription)(districts[i].description),
                    focus_keyword: districts[i].focus_keyword,
                    created_at: districts[i].created_at,
                    updated_at: districts[i].updated_at,
                },
            };
            edges.push(district);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield DistrictRepository_1.default.count(filter) : 0;
        const dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: districts.length >= args.limit,
                hasPreviousPage: args.page > 1,
            } });
        return dataRet;
    }));
};
exports.getDistricts = getDistricts;
//# sourceMappingURL=get.js.map