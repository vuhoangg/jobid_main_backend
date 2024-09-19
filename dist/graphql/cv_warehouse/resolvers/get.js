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
exports.getCvWarehouses = exports.getCvWarehouse = void 0;
const CvWarehouseRepository_1 = __importDefault(require("../../../db/repositories/CvWarehouseRepository"));
const helpers_1 = require("../../helpers");
const getCvWarehouse = (source, args, context, info) => {
    const fieldsRoot = (0, helpers_1.rootField)(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    return CvWarehouseRepository_1.default.get(getBy, fieldsRoot).then((cvWarehouse) => {
        const dataCvWarehouse = {
            _id: cvWarehouse._id,
            employer: cvWarehouse.employer,
            thumnail: cvWarehouse.thumnail,
            title: cvWarehouse.title,
            description: cvWarehouse.description,
            access: cvWarehouse.access,
            status: cvWarehouse.status,
            created_at: cvWarehouse.created_at,
            updated_at: cvWarehouse.updated_at,
        };
        return dataCvWarehouse;
    });
};
exports.getCvWarehouse = getCvWarehouse;
const getCvWarehouses = (source, args, context, info) => {
    let infos = (0, helpers_1.rootInfo)(info);
    let filter = (0, helpers_1.filterObject)(args.filter);
    return CvWarehouseRepository_1.default.filter(filter, args.page, args.limit, infos.edges).then((cvWarehouses) => __awaiter(void 0, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < cvWarehouses.length; i++) {
            let cvWarehouse = {
                cursor: cvWarehouses[i]._id,
                node: {
                    _id: cvWarehouses[i]._id,
                    employer: cvWarehouses[i].employer,
                    thumnail: cvWarehouses[i].thumnail,
                    title: cvWarehouses[i].title,
                    description: cvWarehouses[i].description,
                    access: cvWarehouses[i].access,
                    status: cvWarehouses[i].status,
                    created_at: cvWarehouses[i].created_at,
                    updated_at: cvWarehouses[i].updated_at,
                },
            };
            edges.push(cvWarehouse);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? yield CvWarehouseRepository_1.default.count(filter) : 0;
        const dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: cvWarehouses.length >= args.limit,
                hasPreviousPage: args.page > 1,
            } });
        return dataRet;
    }));
};
exports.getCvWarehouses = getCvWarehouses;
//# sourceMappingURL=get.js.map