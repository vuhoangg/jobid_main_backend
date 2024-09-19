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
exports.getWards = exports.getWard = void 0;
const WardRepository_1 = __importDefault(require("../../../db/repositories/WardRepository"));
const helpers_1 = require("../../helpers");
const seo_1 = require("../../../helpers/seo");
const getWard = (source, args, context, info) => {
    const fieldsRoot = (0, helpers_1.rootField)(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    return WardRepository_1.default.get(getBy, fieldsRoot).then((ward) => {
        const dataWard = {
            _id: ward._id,
            district: ward.district,
            description: ward.description,
            name: ward.name,
            slug: ward.slug,
            title: ward.title,
            image: ward.image,
            image_description: ward.image_description,
            seo_title: ward.seo_title ? ward.seo_title : ward.title,
            seo_description: ward.seo_description ? ward.seo_description : (0, seo_1.seoDescription)(ward.description),
            focus_keyword: ward.focus_keyword,
            created_at: ward.created_at,
            updated_at: ward.updated_at,
        };
        return dataWard;
    });
};
exports.getWard = getWard;
const getWards = (source, args, context, info) => {
    let infos = (0, helpers_1.rootInfo)(info);
    let filter = (0, helpers_1.filterObject)(args.filter);
    return WardRepository_1.default.filter(filter, args.limit, args.page, infos.edges).then((wards) => __awaiter(void 0, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < wards.length; i++) {
            let ward = {
                cursor: wards[i]._id,
                node: {
                    _id: wards[i]._id,
                    district: wards[i].district,
                    description: wards[i].description,
                    name: wards[i].name,
                    slug: wards[i].slug,
                    title: wards[i].title,
                    image: wards[i].image,
                    image_description: wards[i].image_description,
                    seo_title: wards[i].seo_title ? wards[i].seo_title : wards[i].title,
                    seo_description: wards[i].seo_description ? wards[i].seo_description : (0, seo_1.seoDescription)(wards[i].description),
                    focus_keyword: wards[i].focus_keyword,
                    created_at: wards[i].created_at,
                    updated_at: wards[i].updated_at,
                },
            };
            edges.push(ward);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield WardRepository_1.default.count(filter) : 0;
        const dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: wards.length >= args.limit,
                hasPreviousPage: args.page > 1,
            } });
        return dataRet;
    }));
};
exports.getWards = getWards;
//# sourceMappingURL=get.js.map