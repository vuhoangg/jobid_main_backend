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
exports.getSuggestions = exports.getSuggestion = void 0;
const SuggestionRepository_1 = __importDefault(require("../../../db/repositories/SuggestionRepository"));
const helpers_1 = require("../../helpers");
function getSuggestion(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    return SuggestionRepository_1.default.get(args._id, fields)
        .then((suggestion) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: suggestion._id,
            title: suggestion.title,
            slug: suggestion.slug,
            seo_title: suggestion.seo_title,
            seo_description: suggestion.seo_description,
            created_at: suggestion.created_at,
            updated_at: suggestion.updated_at,
        };
        return node;
    }));
}
exports.getSuggestion = getSuggestion;
function getSuggestions(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    return SuggestionRepository_1.default.filter(filter, args.limit, args.page, infos.edges)
        .then((suggestions) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < suggestions.length; i++) {
            let suggestion = {
                cursor: suggestions[i]._id,
                node: {
                    _id: suggestions[i]._id,
                    title: suggestions[i].title,
                    slug: suggestions[i].slug,
                    seo_title: suggestions[i].seo_title,
                    seo_description: suggestions[i].seo_description,
                    created_at: suggestions[i].created_at,
                    updated_at: suggestions[i].updated_at,
                }
            };
            edges.push(suggestion);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield SuggestionRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: suggestions.length >= args.limit,
                hasPreviousPage: args.page > 1
            } });
        return dataRet;
    }));
}
exports.getSuggestions = getSuggestions;
//# sourceMappingURL=get.js.map