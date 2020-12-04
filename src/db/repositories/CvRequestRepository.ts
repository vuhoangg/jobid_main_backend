import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";
import { CrudContract } from "../contracts/CrudContract";
import CvRequest from "../schemas/CvRequest";

interface ICvRequestFilterType {

}

interface IGetBy {
    _id?: string;
    cv_user?: string;
    status?: string;
}

const getCondition = (filter: ICvRequestFilterType) => {
    let condition = {};

    return condition;
};

class CvRequestRepository implements CrudContract {
    public create = (data: any) => {
        try {
            return CvRequest.create(data);
        } catch (e) {
            errorLog(`CvRequest::create ${e.message}`);
            return promiseNull();
        }
    };
    public delete = (_id: string) => {
        try {
            return CvRequest.findByIdAndRemove(_id);
        } catch (e) {
            errorLog(`CvRequest::delete ${e.message}`);
            return promiseNull();
        }
    };
    public get = (_id, projection = {}) => {
        try {
            return CvRequest.findById(_id, projection);
        } catch (e) {
            errorLog(`CvRequest::find ${e.message}`);
            return promiseNull();
        }
    };
    public update = (data: any) => {
        try {
            return CvRequest.findByIdAndUpdate(data._id, data, { new: true });
        } catch (e) {
            errorLog(`CvRequest::update ${e.message}`);
            return promiseNull();
        }
    };

    public filter = (filter: ICvRequestFilterType, limit: number, page: number, projection = {}) => {
        try {
            let condition = getCondition(filter);
            return CvRequest.find(condition, projection)
                .sort({ name: "asc" })
                .skip(limit * (page - 1))
                .limit(limit);
        } catch (e) {
            errorLog(`CvRequest::filter ${e.message}`);
            return promiseNull();
        }
    };

    public getBy(getBy: IGetBy, projection) {
        try {
            return CvRequest.findOne(getBy, projection);
        } catch (e) {
            errorLog(`CvRequest::getBy ${e.message}`)
            return promiseNull();
        }
    }

    public count = (filter: ICvRequestFilterType) => {
        try {
            let condition = getCondition(filter);
            return CvRequest.countDocuments(condition);
        } catch (e) {
            errorLog(`CvRequest::count ${e.message}`);
            return promiseNull();
        }
    };
}

const CvRequestService = new CvRequestRepository();
export default CvRequestService;
