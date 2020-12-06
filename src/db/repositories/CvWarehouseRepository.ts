import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";
import { CrudContract } from "../contracts/CrudContract";
import CvWarehouse from "../schemas/CvWarehouse";


interface ICvWarehouseFilterType {
    employer?: string;
    status?: string;
    public?: string;
}

interface IGetBy {
    _id?: string;
    employer?: string;
}

const getCondition = (filter: ICvWarehouseFilterType) => {
    let condition = {};
    if (filter.employer) {
        condition = Object.assign(condition, { employer: filter.employer });
    }
    if (filter.public) {
        condition = Object.assign(condition, { public: filter.public });
    }
    if (filter.status) {
        condition = Object.assign(condition, { status: filter.status });
    }
    return condition;
};

class CvWarehouseRepository implements CrudContract {
    public create = (data: any) => {
        try {
            return CvWarehouse.create(data);
        } catch (e) {
            errorLog(`CvWarehouse::create ${e.message}`);
            return promiseNull();
        }
    };
    public delete = (_id: string) => {
        try {
            return CvWarehouse.findByIdAndRemove(_id);
        } catch (e) {
            errorLog(`CvWarehouse::delete ${e.message}`);
            return promiseNull();
        }
    };
    public get = (_id, projection = {}) => {
        try {
            return CvWarehouse.findById(_id, projection);
        } catch (e) {
            errorLog(`CvWarehouse::find ${e.message}`);
            return promiseNull();
        }
    };
    public update = (data: any) => {
        try {
            return CvWarehouse.findByIdAndUpdate(data._id, data, { new: true });
        } catch (e) {
            errorLog(`CvWarehouse::update ${e.message}`);
            return promiseNull();
        }
    };

    public filter = (filter: ICvWarehouseFilterType, page: number, limit: number, projection = {}) => {
        try {
            let condition = getCondition(filter);
            return CvWarehouse.find(condition, projection)
                .sort({ main_cv: "desc" })
                .skip(limit * (page - 1))
                .limit(limit);
        } catch (e) {
            errorLog(`CvWarehouse::filter ${e.message}`);
            return promiseNull();
        }
    };

    public getBy(getBy: IGetBy, projection) {
        try {
            return CvWarehouse.findOne(getBy, projection);
        } catch (e) {
            errorLog(`CvWarehouse::getBy ${e.message}`)
            return promiseNull();
        }
    }
    public all = (filter: ICvWarehouseFilterType) => {
        try {
            return CvWarehouse.find(filter);
        } catch (e) {
            errorLog(`CvWarehouse::getBy ${e.message}`)
            return promiseNull();
        }
    }

    public count = (filter: ICvWarehouseFilterType) => {
        try {
            let condition = getCondition(filter);
            return CvWarehouse.countDocuments(condition);
        } catch (e) {
            errorLog(`CvWarehouse::count ${e.message}`);
            return promiseNull();
        }
    };
}

const CvWarehouseService = new CvWarehouseRepository();
export default CvWarehouseService;
