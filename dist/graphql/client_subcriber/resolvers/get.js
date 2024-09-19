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
exports.getClientSubcriber = getClientSubcriber;
exports.getClientSubcribers = getClientSubcribers;
const ClientSubcriberRepository_1 = __importDefault(require("../../../db/repositories/ClientSubcriberRepository"));
const helpers_1 = require("../../helpers");
function getClientSubcriber(source, args, context, info) {
    const fields = (0, helpers_1.rootField)(info);
    return ClientSubcriberRepository_1.default.get(args._id, fields)
        .then((client) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: client._id,
            clientId: client.clientId,
            location: client.location,
            browser: client.browser,
            created_at: client.created_at,
            updated_at: client.updated_at,
        };
        return node;
    }));
}
function getClientSubcribers(source, args, context, info) {
    let infos = (0, helpers_1.rootInfo)(info);
    let filter = (0, helpers_1.filterObject)(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    return ClientSubcriberRepository_1.default.filter(filter, limit, page, infos.edges)
        .then((clients) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < clients.length; i++) {
            let client = {
                cursor: clients[i]._id,
                node: {
                    _id: clients[i]._id,
                    clientId: clients[i].clientId,
                    location: clients[i].location,
                    browser: clients[i].browser,
                    created_at: clients[i].created_at,
                    updated_at: clients[i].updated_at,
                }
            };
            edges.push(client);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield ClientSubcriberRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: clients.length >= limit,
                hasPreviousPage: page > 1
            } });
        return dataRet;
    }));
}
//# sourceMappingURL=get.js.map