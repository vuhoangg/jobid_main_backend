import {errorLog} from "../../helpers/log";
import {promiseNull} from "../../helpers/promise";
import {CrudContract} from "../contracts/CrudContract";
import City from "../schemas/City";

interface ICityFilterType {
  name?: string;
}

interface IGetCityType {
  _id?: string;
  slug?: string;
}

interface IGetBy {
  _id?: string;
}

const getCondition = (filter: ICityFilterType) => {
  let condition = {};
  if (filter.name) {
    condition = Object.assign(condition, { name: new RegExp(filter.name, "i") });
  }
  return condition;
};

class CityRepository implements CrudContract {
  public create = (data: any) => {
    try {
      return City.create(data);
    } catch (e) {
      errorLog(`City::create ${e.message}`);
      return promiseNull();
    }
  };
  public delete = (_id: string) => {
    try {
      return City.findByIdAndRemove(_id);
    } catch (e) {
      errorLog(`City::delete ${e.message}`);
      return promiseNull();
    }
  };
  public get = (getBy: IGetCityType, projection = {}) => {
    try {
      if (getBy._id) {
        return City.findById(getBy._id, projection);
      } else {
        return City.findOne({ slug: getBy.slug }, projection);
      }
    } catch (e) {
      errorLog(`City::find ${e.message}`);
      return promiseNull();
    }
  };
  public update = (data: any) => {
    try {
      return City.findByIdAndUpdate(data._id, data, { new: true });
    } catch (e) {
      errorLog(`City::update ${e.message}`);
      return promiseNull();
    }
  };

  public filter = (filter: ICityFilterType, limit: number, page: number, projection = {}) => {
    try {
      let condition = getCondition(filter);
      return City.find(condition, projection)
        .sort({ name: "asc" })
        .skip(limit * (page - 1))
        .limit(limit);
    } catch (e) {
      errorLog(`City::filter ${e.message}`);
      return promiseNull();
    }
  };

  public getBy(getBy: IGetBy, projection) {
    try {
      if (getBy._id) {
        return City.findById(getBy._id, projection);
      } else {
        return promiseNull();
      }
    } catch (e) {
      errorLog(`City::getBy ${e.message}`)
      return promiseNull();
    }
  }

  public count = (filter: ICityFilterType) => {
    try {
      let condition = getCondition(filter);
      return City.countDocuments(condition);
    } catch (e) {
      errorLog(`City::count ${e.message}`);
      return promiseNull();
    }
  };
}

const CityService = new CityRepository();
export default CityService;
