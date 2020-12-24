import {errorLog} from "../../helpers/log";
import {promiseNull} from "../../helpers/promise";
import {CrudContract} from "../contracts/CrudContract";
import CvRequest from "../schemas/CvRequest";

interface ICvRequestFilterType {
  cv_user?: string;
}

interface IGetBy {
  _id?: string;
  cv_user?: string;
  status?: string;
}

const getCondition = (filter: ICvRequestFilterType) => {
  let condition = {};
  if (filter.cv_user) {
    condition = Object.assign(condition, {cv_user: filter.cv_user});
  }
  return condition;
};

class CvRequestRepository implements CrudContract {
  public create = (data: any) => {
    try {
      return CvRequest.create(data);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  };
  public delete = (_id: string) => {
    try {
      return CvRequest.findByIdAndRemove(_id);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  };
  public get = (_id, projection = {}) => {
    try {
      return CvRequest.findById(_id, projection);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  };
  public update = (data: any) => {
    try {
      return CvRequest.findByIdAndUpdate(data._id, data, {new: true});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  };

  public filter = (filter: ICvRequestFilterType, page: number, limit: number, projection = {}) => {
    try {
      let condition = getCondition(filter);
      return CvRequest.find(condition, projection)
        .sort({_id: "desc"})
        .skip(limit * (page - 1))
        .limit(limit);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  };

  public getBy(getBy: IGetBy, projection) {
    try {
      return CvRequest.findOne(getBy, projection);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  public count = (filter: ICvRequestFilterType) => {
    try {
      let condition = getCondition(filter);
      return CvRequest.countDocuments(condition);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  };
}

const CvRequestService = new CvRequestRepository();
export default CvRequestService;
