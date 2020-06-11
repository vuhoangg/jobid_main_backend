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
exports.getUsers = exports.getUser = void 0;
const UserRepository_1 = __importDefault(require("../../../db/repositories/UserRepository"));
const helpers_1 = require("../../helpers");
function getUser(source, args, context, info) {
    const fields = helpers_1.rootField(info);
    let _id = args._id ? args._id : context.user._id;
    return UserRepository_1.default.get(_id, fields)
        .then((user) => __awaiter(this, void 0, void 0, function* () {
        let node = {
            _id: user._id,
            email: user.email,
            psid: user.psid,
            first_name: user.first_name,
            last_name: user.last_name,
            birth_day: user.birth_day,
            avatar: user.avatar,
            gender: user.gender,
            login_type: user.login_type,
            spam: user.spam,
            customize_info: user.customize_info,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
        return node;
    }));
}
exports.getUser = getUser;
function getUsers(source, args, context, info) {
    let infos = helpers_1.rootInfo(info);
    let filter = helpers_1.filterObject(args.filter);
    return UserRepository_1.default.filter(filter, args.limit, args.page, infos.edges)
        .then((users) => __awaiter(this, void 0, void 0, function* () {
        let edges = [];
        for (let i = 0; i < users.length; i++) {
            let user = {
                cursor: users[i]._id,
                node: {
                    _id: users[i]._id,
                    email: users[i].email,
                    psid: users[i].psid,
                    first_name: users[i].first_name,
                    last_name: users[i].last_name,
                    birth_day: users[i].birth_day,
                    avatar: users[i].avatar,
                    gender: users[i].gender,
                    login_type: users[i].login_type,
                    spam: users[i].spam,
                    customize_info: users[i].customize_info,
                    created_at: users[i].created_at,
                    updated_at: users[i].updated_at,
                }
            };
            edges.push(user);
        }
        let countData = (infos.pageInfo && infos.pageInfo.length) ? yield UserRepository_1.default.count(filter) : 0;
        let dataRet = Object.assign({ edges }, { pageInfo: {
                length: countData,
                hasNextPage: users.length >= args.limit,
                hasPreviousPage: args.page > 1
            } });
        return dataRet;
    }));
}
exports.getUsers = getUsers;
//# sourceMappingURL=get.js.map