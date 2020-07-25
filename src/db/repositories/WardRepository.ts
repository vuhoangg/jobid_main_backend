import {errorLog} from "../../helpers/log";
import {promiseNull} from "../../helpers/promise";
import {CrudContract} from "../contracts/CrudContract";
import Ward from "../schemas/Ward";

interface IWardFilterType {
  name?: string;
  district?: string;
}

interface IGetWardType {
  _id?: string;
  slug?: string;
}

interface IGetBy {
  _id?: string;
}

const getCondition = (filter: IWardFilterType) => {
  let condition = {};
  if (filter.name) {
    condition = Object.assign(condition, {name: new RegExp(filter.name, "i")});
  }
  if (filter.district) {
    condition = Object.assign(condition, {district: filter.district});
  }

  return condition;
};

class WardRepository implements CrudContract {
  public create = (data: any) => {
    try {
      return Ward.create(data);
    } catch (e) {
      errorLog(`Ward::create ${e.message}`);
      return promiseNull();
    }
  };
  public delete = (_id: string) => {
    try {
      return Ward.findByIdAndRemove(_id);
    } catch (e) {
      errorLog(`Ward::delete ${e.message}`);
      return promiseNull();
    }
  };
  public get = (getBy: IGetWardType, projection = {}) => {
    try {
      if (getBy._id) {
        return Ward.findById(getBy._id, projection);
      } else {
        return Ward.findOne({slug: getBy.slug}, projection);
      }
    } catch (e) {
      errorLog(`Ward::find ${e.message}`);
      return promiseNull();
    }
  };
  public update = (data: any) => {
    try {
      return Ward.findByIdAndUpdate(data._id, data, {new: true});
    } catch (e) {
      errorLog(`Ward::update ${e.message}`);
      return promiseNull();
    }
  };

  public filter = (filter: IWardFilterType, limit: number, page: number, projection = {}) => {
    try {
      let condition = getCondition(filter);
      return Ward.find(condition, projection)
        .sort({name: "asc"})
        .skip(limit * (page - 1))
        .limit(limit);
    } catch (e) {
      errorLog(`Ward::filter ${e.message}`);
      return promiseNull();
    }
  };

  public getBy(getBy: IGetBy, projection) {
    try {
      if (getBy._id) {
        return Ward.findById(getBy._id, projection);
      } else {
        return promiseNull();
      }
    } catch (e) {
      errorLog(`Ward::getBy ${e.message}`)
      return promiseNull();
    }
  }

  public count = (filter: IWardFilterType) => {
    try {
      let condition = getCondition(filter);
      return Ward.countDocuments(condition);
    } catch (e) {
      errorLog(`Ward::count ${e.message}`);
      return promiseNull();
    }
  };
}

const WardService = new WardRepository();
export default WardService;
