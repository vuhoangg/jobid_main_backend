import AdminService from "../../../db/repositories/AdminRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";
import { authenticateAdmin } from "../../../middlewares/authenticate";

export const getAdmin = async (source, args, context, info) => {
    const fields = rootField(info);
    let getBy = {
        _id: (await authenticateAdmin(context, context.res)) ? context.res.locals.fullAdmin._id : "",
    };
    if (args._id || args.email) {
        getBy = args;
    }
    return AdminService.getBy(getBy, fields).then(async (admin) => {
        let node = {
            _id: admin._id,
            email: admin.email,
            psid: admin.psid,
            first_name: admin.first_name,
            last_name: admin.last_name,
            birth_day: admin.birth_day,
            avatar: admin.avatar,
            gender: admin.gender,
            login_type: admin.login_type,
            spam: admin.spam,
            created_at: admin.created_at,
            updated_at: admin.updated_at,
        };
        return node;
    });
};

export const getAdmins = async (source, args, context, info) => {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    let limit = args.limit;
    return AdminService.filter(filter, limit, args.page, infos.edges).then(async (admins) => {
        let edges = [];
        // console.log(admins);

        for (let i = 0; i < admins.length; i++) {
            let admin = {
                cursor: admins[i]._id,
                node: {
                    _id: admins[i]._id,
                    email: admins[i].email,
                    psid: admins[i].psid,
                    first_name: admins[i].first_name,
                    last_name: admins[i].last_name,
                    birth_day: admins[i].birth_day,
                    avatar: admins[i].avatar,
                    gender: admins[i].gender,
                    login_type: admins[i].login_type,
                    spam: admins[i].spam,
                    created_at: admins[i].created_at,
                    updated_at: admins[i].updated_at,
                },
            };
            edges.push(admin);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? await AdminService.count(filter) : 0;
        let dataRet = {
            ...{ edges },
            pageInfo: {
                length: countData,
                hasNextPage: admins.length >= limit,
                hasPreviousPage: args.page > 1,
            },
        };
        return dataRet;
    });
};
