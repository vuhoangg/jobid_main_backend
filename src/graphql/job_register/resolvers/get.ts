import JobRegisterService from "../../../db/repositories/JobRegisterRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export function getJobRegister(source, args, context, info) {
    const fields = rootField(info);
    let getBy = args._id ? { _id: args._id } : { slug: args.slug };
    return JobRegisterService.getBy(getBy, fields)
        .then(async (jobRegister) => {
            let node = {
                _id: jobRegister._id,
                contact_name: jobRegister.contact_name,
                job_title: jobRegister.job_title,
                job_location: jobRegister.job_location,
                contact_phone: jobRegister.contact_phone,
                contact_email: jobRegister.contact_email,
                created_at: jobRegister.created_at,
                updated_at: jobRegister.updated_at,
            };
            return node;
        });
}

export function getJobRegisters(source, args, context, info) {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    let limit = args.limit > 50 ? 10 : args.limit;
    return JobRegisterService.filter(filter, limit, args.page, infos.edges)
        .then(async (jobRegisters) => {
            let edges = [];
            for (let i = 0; i < jobRegisters.length; i++) {
                let jobRegister = {
                    cursor: jobRegisters[i]._id,
                    node: {
                        _id: jobRegisters[i]._id,
                        contact_name: jobRegisters[i].contact_name,
                        job_title: jobRegisters[i].job_title,
                        job_location: jobRegisters[i].job_location,
                        contact_phone: jobRegisters[i].contact_phone,
                        contact_email: jobRegisters[i].contact_email,
                        created_at: jobRegisters[i].created_at,
                        updated_at: jobRegisters[i].updated_at,
                    }
                };
                edges.push(jobRegister);
            }
            let countData = (infos.pageInfo && infos.pageInfo.length) ? await JobRegisterService.count(filter) : 0;
            let dataRet = {
                ...{ edges },
                pageInfo: {
                    length: countData,
                    hasNextPage: jobRegisters.length >= limit,
                    hasPreviousPage: args.page > 1
                }
            };
            return dataRet;
        });
}
