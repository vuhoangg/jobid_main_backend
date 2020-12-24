import {errorLog} from "../../helpers/log";
import {promiseNull} from "../../helpers/promise";
import {CrudContract} from "../contracts/CrudContract";
import FacebookJob from "../schemas/FacebookJob";

interface IFacebookJobFilterType {
  keyword?: string;
}

interface IGetFacebookJobType {
  _id?: string;
}

interface IGetBy {
  _id?: string;
}

const getCondition = (filter: IFacebookJobFilterType) => {
  let condition = {};
  if (filter.keyword) {
    condition = Object.assign(condition, {long_description: new RegExp(filter.keyword, "i")});
  }

  return condition;
};

class FacebookJobRepository implements CrudContract {
  public create = (data: any) => {
    try {
      return FacebookJob.create(data);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  };
  public delete = (_id: string) => {
    try {
      return FacebookJob.findByIdAndRemove(_id);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  };
  public get = (getBy: IGetFacebookJobType, projection = {}) => {
    try {
      if (getBy._id) {
        return FacebookJob.findById(getBy._id, projection);
      } else {
        return promiseNull();
      }
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  };
  public update = (data: any) => {
    try {
      return FacebookJob.findByIdAndUpdate(data._id, data, {new: true});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  };

  public filter = (filter: IFacebookJobFilterType, limit: number, page: number, projection = {}) => {
    try {
      let condition = getCondition(filter);
      return FacebookJob.find(condition, projection)
        .sort({name: "asc"})
        .skip(limit * (page - 1))
        .limit(limit);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  };

  public getBy(getBy: IGetBy, projection) {
    try {
      if (getBy._id) {
        return FacebookJob.findById(getBy._id, projection);
      } else {
        return promiseNull();
      }
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  public count = (filter: IFacebookJobFilterType) => {
    try {
      let condition = getCondition(filter);
      return FacebookJob.countDocuments(condition);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  };
}

const FacebookJobService = new FacebookJobRepository();
export default FacebookJobService;
