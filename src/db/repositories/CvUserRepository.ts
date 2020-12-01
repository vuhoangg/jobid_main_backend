import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";
import { CrudContract } from "../contracts/CrudContract";
import CvUser from "../schemas/CvUser";

interface ICvUserFilterType {

}

interface IGetCvUserType {
    _id?: string;
    slug?: string;
}

interface IGetBy {
    _id?: string;
}

const getCondition = (filter: ICvUserFilterType) => {
    let condition = {};

    return condition;
};

class CvUserRepository implements CrudContract {
    public create = (data: any) => {
        try {
            return CvUser.create(data);
        } catch (e) {
            errorLog(`CvUser::create ${e.message}`);
            return promiseNull();
        }
    };
    public delete = (_id: string) => {
        try {
            return CvUser.findByIdAndRemove(_id);
        } catch (e) {
            errorLog(`CvUser::delete ${e.message}`);
            return promiseNull();
        }
    };
    public get = (getBy: IGetCvUserType, projection = {}) => {
        try {
            if (getBy._id) {
                return CvUser.findById(getBy._id, projection);
            } else {
                return CvUser.findOne({ slug: getBy.slug }, projection);
            }
        } catch (e) {
            errorLog(`CvUser::find ${e.message}`);
            return promiseNull();
        }
    };
    public update = (data: any) => {
        try {
            return CvUser.findByIdAndUpdate(data._id, data, { new: true });
        } catch (e) {
            errorLog(`CvUser::update ${e.message}`);
            return promiseNull();
        }
    };

    public filter = (filter: ICvUserFilterType, limit: number, page: number, projection = {}) => {
        try {
            let condition = getCondition(filter);
            return CvUser.find(condition, projection)
                .sort({ name: "asc" })
                .skip(limit * (page - 1))
                .limit(limit);
        } catch (e) {
            errorLog(`CvUser::filter ${e.message}`);
            return promiseNull();
        }
    };

    public getBy(getBy: IGetBy, projection) {
        try {
            if (getBy._id) {
                return CvUser.findById(getBy._id, projection);
            } else {
                return promiseNull();
            }
        } catch (e) {
            errorLog(`CvUser::getBy ${e.message}`)
            return promiseNull();
        }
    }

    public count = (filter: ICvUserFilterType) => {
        try {
            let condition = getCondition(filter);
            return CvUser.countDocuments(condition);
        } catch (e) {
            errorLog(`CvUser::count ${e.message}`);
            return promiseNull();
        }
    };
}

const CvUserService = new CvUserRepository();
export default CvUserService;
