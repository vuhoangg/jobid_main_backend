import BannerService from "../../../db/repositories/BannerRepository";
import { filterObject, rootField, rootInfo } from "../../helpers";

export function getBanner(source, args, context, info) {
    const fields = rootField(info);
    return BannerService.get(args._id, fields)
        .then(async (banner) => {
            let node = {
                _id: banner._id,
                name: banner.name,
                image: banner.image,
                href: banner.href,
                status: banner.status,
                created_at: banner.created_at,
                updated_at: banner.updated_at,
            };
            return node;
        });
}

export function getBanners(source, args, context, info) {
    let infos = rootInfo(info);
    let filter = filterObject(args.filter);
    let page = args.page > 4000 ? 10 : args.page;
    return BannerService.filter(filter, args.limit, page, infos.edges)
        .then(async (banners) => {
            let edges = [];
            for (let i = 0; i < banners.length; i++) {
                let banner = {
                    cursor: banners[i]._id,
                    node: {
                        _id: banners[i]._id,
                        name: banners[i].name,
                        image: banners[i].image,
                        href: banners[i].href,
                        status: banners[i].status,
                        created_at: banners[i].created_at,
                        updated_at: banners[i].updated_at,
                    }
                };
                edges.push(banner);
            }
            let countData = (infos.pageInfo && infos.pageInfo.length) ? await BannerService.count(filter) : 0;
            let dataRet = {
                ...{ edges },
                pageInfo: {
                    length: countData,
                    hasNextPage: banners.length >= args.limit,
                    hasPreviousPage: page > 1
                }
            };
            return dataRet;
        });
}
