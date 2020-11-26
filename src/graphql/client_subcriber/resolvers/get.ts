import ClientSubscriberService from "../../../db/repositories/ClientSubcriberRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export function getClientSubcriber(source, args, context, info) {
    const fields = rootField(info);
    return ClientSubscriberService.get(args._id, fields)
        .then(async (client) => {
            let node = {
                _id: client._id,
                clientId: client.clientId,
                location: client.location,
                browser: client.browser,
                created_at: client.created_at,
                updated_at: client.updated_at,
            };
            return node;
        });
}

export function getClientSubcribers(source, args, context, info) {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    let limit = args.limit > 1000 ? 10 : args.limit;
    let page = args.page;
    return ClientSubscriberService.filter(filter, limit, page, infos.edges)
        .then(async (clients) => {
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
            let countData = (infos.pageInfo && infos.pageInfo.length) ? await ClientSubscriberService.count(filter) : 0;
            let dataRet = {
                ...{ edges },
                pageInfo: {
                    length: countData,
                    hasNextPage: clients.length >= limit,
                    hasPreviousPage: page > 1
                }
            };
            return dataRet;
        });
}
