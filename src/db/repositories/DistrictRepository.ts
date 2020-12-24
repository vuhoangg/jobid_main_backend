import {errorLog} from "../../helpers/log";
import {promiseNull} from "../../helpers/promise";
import {CrudContract} from "../contracts/CrudContract";
import District from "../schemas/District";

interface IDistrictFilterType {
  name?: string;
  city?: string;
}

interface IGetDistrictType {
  _id?: string;
  slug?: string;
}

interface IGetBy {
  _id?: string;
}

const getCondition = (filter: IDistrictFilterType) => {
  let condition = {};
  if (filter.name) {
    condition = Object.assign(condition, {name: new RegExp(filter.name, "i")});
  }
  if (filter.city) {
    condition = Object.assign(condition, {city: filter.city});
  }

  return condition;
};

class DistrictRepository implements CrudContract {
  public create = (data: any) => {
    try {
      return District.create(data);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  };
  public delete = (_id: string) => {
    try {
      return District.findByIdAndRemove(_id);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  };
  public get = (getBy: IGetDistrictType, projection = {}) => {
    try {
      if (getBy._id) {
        return District.findById(getBy._id, projection);
      } else {
        return District.findOne({slug: getBy.slug}, projection);
      }
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  };
  public update = (data: any) => {
    try {
      return District.findByIdAndUpdate(data._id, data, {new: true});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  };

  public filter = (filter: IDistrictFilterType, limit: number, page: number, projection = {}) => {
    try {
      let condition = getCondition(filter);
      return District.find(condition, projection)
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
        return District.findById(getBy._id, projection);
      } else {
        return promiseNull();
      }
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  public count = (filter: IDistrictFilterType) => {
    try {
      let condition = getCondition(filter);
      return District.countDocuments(condition);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  };
}

const DistrictService = new DistrictRepository();
export default DistrictService;
