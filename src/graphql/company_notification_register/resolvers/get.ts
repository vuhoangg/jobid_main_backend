import CompanyNotificationRegisterService from "../../../db/repositories/CompanyNotificationRegisterRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";
import { authenticateUser } from "../../../middlewares/authenticate";

export const getCompanyNotificationRegister = async (source, args, context, info) => {
    const fields = rootField(info);

    let isAuthenticated = await authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        let getBy = {
            _id: args._id,
            user: loggedUser._id,
        }
        let companyNotificationRegister = await CompanyNotificationRegisterService.getBy(getBy, fields);
        let node = {
            _id: companyNotificationRegister._id,
            company: companyNotificationRegister.company,
            user: companyNotificationRegister.user,
            created_at: companyNotificationRegister.created_at,
            updated_at: companyNotificationRegister.updated_at,
        };
        return node;
    }
};

export const getCompanyNotificationRegisters = async (source, args, context, info) => {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    let page = args.page > 50 ? 10 : args.page;

    let isAuthenticated = await authenticateUser(context, context.res);
    if (isAuthenticated) {
        let loggedUser = context.res.locals.fullUser;
        filter = Object.assign(filter, { user: loggedUser._id });

        let companyNotificationRegisters = await CompanyNotificationRegisterService.filter(filter, args.limit, page, infos.edges);
        let edges = [];
        for (let i = 0; i < companyNotificationRegisters.length; i++) {
            let companyNotificationRegister = {
                cursor: companyNotificationRegisters[i]._id,
                node: {
                    _id: companyNotificationRegisters[i]._id,
                    company: companyNotificationRegisters[i].company,
                    user: companyNotificationRegisters[i].user,
                    created_at: companyNotificationRegisters[i].created_at,
                    updated_at: companyNotificationRegisters[i].updated_at,
                },
            };
            edges.push(companyNotificationRegister);
        }
        let countData = infos.pageInfo && infos.pageInfo.length ? await CompanyNotificationRegisterService.count(filter) : 0;
        let dataRet = {
            ...{ edges },
            pageInfo: {
                length: countData,
                hasNextPage: companyNotificationRegisters.length >= args.limit,
                hasPreviousPage: page > 1,
            },
        };
        return dataRet;
    }
}
