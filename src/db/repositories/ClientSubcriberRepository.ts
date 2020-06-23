import {CrudContract} from "../contracts/CrudContract";
import ClientSubscriber from "../schemas/ClientSubscriber";
import {errorLog} from "../../helpers/log";
import {promiseNull} from "../../helpers/promise";

interface ISort {
  created?: "newest" | "oldest",
  updated?: "newest" | "oldest",
}

interface IFilter {
  sort_by?: ISort;
  clientId: string;
  location?: string;
}

interface IGetBy {
  _id?: string;
}

function getCondition(filter: IFilter) {
  let condition = {};
  if (filter.clientId) {
    condition = Object.assign(condition, {location: filter.clientId});
  }
  if (filter.location) {
    condition = Object.assign(condition, {location: filter.location});
  }
  return condition;
}

function getSort(sortBy: ISort) {
  let sort = {};
  if (sortBy.created) {
    sort = Object.assign(sort, {_id: (sortBy.created === "newest" ? "desc" : "asc")})
  }
  if (sortBy.updated) {
    sort = Object.assign(sort, {updated_at: (sortBy.updated === "newest" ? "desc" : "asc")})
  }
  return sort;
}

class ClientSubscriberRepository implements CrudContract {
  count(filter: IFilter) {
    try {
      let condition = getCondition(filter);
      return ClientSubscriber.countDocuments(condition);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  create(data) {
    try {
      return ClientSubscriber.create(data);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  delete(id) {
    try {
      return ClientSubscriber.findByIdAndRemove(id);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  get(id, projection) {
    try {
      return ClientSubscriber.findById(id, projection);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  filter(filter: IFilter, limit, page, projection) {
    try {
      let condition = getCondition(filter);
      let sort = filter.sort_by ? getSort(filter.sort_by) : {_id: "desc"};
      return ClientSubscriber.find(condition, projection).sort(sort).skip(limit * (page - 1)).limit(limit);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  getBy(getBy: IGetBy, projection) {
    try {
      if (getBy._id) {
        return ClientSubscriber.findById(getBy._id, projection);
      } else {
        return promiseNull();
      }
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  update(data) {
    try {
      return ClientSubscriber.findByIdAndUpdate(data._id, data, {new: true});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }
}

const ClientSubscriberService = new ClientSubscriberRepository();
export default ClientSubscriberService;
