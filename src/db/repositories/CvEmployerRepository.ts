import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";
import { CrudContract } from "../contracts/CrudContract";
import CvEmployer from "../schemas/CvEmployer";


interface ICvEmployerFilterType {
    cv_warehouse?: string;
    status?: string;
    public?: string;
}

interface IGetBy {
    _id?: string;
    employer?: string;
}

const getCondition = (filter: ICvEmployerFilterType) => {
    let condition = {};
    if (filter.cv_warehouse) {
        condition = Object.assign(condition, { cv_warehouse: filter.cv_warehouse });
    }
    if (filter.public) {
        condition = Object.assign(condition, { public: filter.public });
    }
    if (filter.status) {
        condition = Object.assign(condition, { status: filter.status });
    }
    return condition;
};

class CvEmployerRepository implements CrudContract {
    public create = (data: any) => {
        try {
            return CvEmployer.create(data);
        } catch (e) {
            errorLog(`CvEmployer::create ${e.message}`);
            return promiseNull();
        }
    };
    public delete = (_id: string) => {
        try {
            return CvEmployer.findByIdAndRemove(_id);
        } catch (e) {
            errorLog(`CvEmployer::delete ${e.message}`);
            return promiseNull();
        }
    };
    public get = (_id, projection = {}) => {
        try {
            return CvEmployer.findById(_id, projection);
        } catch (e) {
            errorLog(`CvEmployer::find ${e.message}`);
            return promiseNull();
        }
    };
    public update = (data: any) => {
        try {
            return CvEmployer.findByIdAndUpdate(data._id, data, { new: true });
        } catch (e) {
            errorLog(`CvEmployer::update ${e.message}`);
            return promiseNull();
        }
    };

    public filter = (filter: ICvEmployerFilterType, page: number, limit: number, projection = {}) => {
        try {
            let condition = getCondition(filter);
            return CvEmployer.find(condition, projection)
                .sort({ main_cv: "desc" })
                .skip(limit * (page - 1))
                .limit(limit);
        } catch (e) {
            errorLog(`CvEmployer::filter ${e.message}`);
            return promiseNull();
        }
    };

    public getBy(getBy: IGetBy, projection) {
        try {
            return CvEmployer.findOne(getBy, projection);
        } catch (e) {
            errorLog(`CvEmployer::getBy ${e.message}`)
            return promiseNull();
        }
    }
    public all = (filter: ICvEmployerFilterType) => {
        try {
            return CvEmployer.find(filter);
        } catch (e) {
            errorLog(`CvEmployer::getBy ${e.message}`)
            return promiseNull();
        }
    }

    public count = (filter: ICvEmployerFilterType) => {
        try {
            let condition = getCondition(filter);
            return CvEmployer.countDocuments(condition);
        } catch (e) {
            errorLog(`CvEmployer::count ${e.message}`);
            return promiseNull();
        }
    };
}

const CvEmployerService = new CvEmployerRepository();
export default CvEmployerService;
