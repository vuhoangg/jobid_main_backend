import EmployerService from "../../../db/repositories/EmployerRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";
import { authenticateUser } from "../../../middlewares/authenticate";

export const getEmployer = async (source, args, context, info) => {
    const fields = rootField(info);
    let getBy = {
        _id: (await authenticateUser(context, context.res)) ? context.res.locals.fullEmployer._id : "",
    };
    if (args._id || args.email) {
        getBy = args;
    }
    return EmployerService.getBy(getBy, fields).then(async (employer) => {
        let node = {
            _id: employer._id,
            email: employer.email,
            psid: employer.psid,
            first_name: employer.first_name,
            last_name: employer.last_name,
            birth_day: employer.birth_day,
            avatar: employer.avatar,
            gender: employer.gender,
            login_type: employer.login_type,
            spam: employer.spam,
            created_at: employer.created_at,
            updated_at: employer.updated_at,
        };
        return node;
    });
};

export const getEmployers = async (source, args, context, info) => {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    return EmployerService.filter(filter, args.limit, args.page, infos.edges).then(async (employers) => {
        let edges = [];
        // console.log(employers);

        for (let i = 0; i < employers.length; i++) {
            let employer = {
                cursor: employers[i]._id,
                node: {
                    _id: employers[i]._id,
                    email: employers[i].email,
                    psid: employers[i].psid,
                    first_name: employers[i].first_name,
                    last_name: employers[i].last_name,
                    birth_day: employers[i].birth_day,
                    avatar: employers[i].avatar,
                    gender: employers[i].gender,
                    login_type: employers[i].login_type,
                    spam: employers[i].spam,
                    created_at: employers[i].created_at,
                    updated_at: employers[i].updated_at,
                },
            };
            edges.push(employer);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? await EmployerService.count(filter) : 0;
        let dataRet = {
            ...{ edges },
            pageInfo: {
                length: countData,
                hasNextPage: employers.length >= limit,
                hasPreviousPage: args.page > 1,
            },
        };
        return dataRet;
    });
};
