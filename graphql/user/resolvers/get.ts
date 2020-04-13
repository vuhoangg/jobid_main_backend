import UserService from "../../../db/repository/UserRepository";
import {filterObject, rootField, rootInfo} from "../../helpers";

export function getUser(source, args, context, info) {
    const fields = rootField(info);
    let _id = args._id ? args._id : context.user._id;
    return UserService.get(_id, fields)
        .then(async (user) => {
            let node = {
                _id: user._id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                birth_day: user.birth_day,
                avatar: user.avatar,
                gender: user.gender,
                login_type: user.login_type,
                spam: user.spam,
                created_at: user.created_at,
                updated_at: user.updated_at,
            };
            return node;
        });
}

export function getUsers(source, args, context, info) {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    return UserService.filter(filter, args.limit, args.page, infos.edges)
        .then(async (users) => {
            let edges = [];
            for (let i = 0; i < users.length; i++) {
                let user = {
                    cursor: users[i]._id,
                    node: {
                        _id: users[i]._id,
                        email: users[i].email,
                        first_name: users[i].first_name,
                        last_name: users[i].last_name,
                        birth_day: users[i].birth_day,
                        avatar: users[i].avatar,
                        gender: users[i].gender,
                        login_type: users[i].login_type,
                        spam: users[i].spam,
                        created_at: users[i].created_at,
                        updated_at: users[i].updated_at,
                    }
                };
                edges.push(user);
            }
            let countData = (infos.pageInfo && infos.pageInfo.length) ? await UserService.count(filter) : 0;
            let dataRet = {
                ...{edges},
                pageInfo: {
                    length: countData,
                    hasNextPage: users.length >= args.limit,
                    hasPreviousPage: args.page > 1
                }
            };
            return dataRet;
        });
}