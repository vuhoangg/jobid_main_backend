import {CrudContract} from "../contracts/CrudContract";
import {errorLog} from "../../helpers/log";
import {promiseNull} from "../../helpers/promise";
import Notification from "../schemas/Notification";
import {processDataUpdate} from "../../helpers/flattenNestedObject";
import User from "../schemas/User";

interface ISort {
  created?: "newest" | "oldest",
  updated?: "newest" | "oldest",
}

interface IFilter {
  sort_by?: ISort;
  type?: string;
  subject?: string;
  target_object_type?: string;
  target_ref?: string;
  read?: boolean;
}

interface IGetBy {
  _id: string;
}

function getCondition(filter: IFilter) {
  let condition = {};
  if (filter.type) {
    condition = Object.assign(condition, {type: filter.type});
  }
  if (filter.subject) {
    condition = Object.assign(condition, {subject: filter.subject});
  }
  if (filter.target_object_type) {
    condition = Object.assign(condition, {"target.object_type": filter.target_object_type});
  }
  if (filter.target_ref) {
    condition = Object.assign(condition, {"target.ref": filter.target_ref});
  }
  if (filter.read) {
    condition = Object.assign(condition, {read: filter.read});
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

class NotificationRepository implements CrudContract {
  count(filter: IFilter) {
    try {
      let condition = getCondition(filter);
      return Notification.countDocuments(condition);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  create(data) {
    try {
      return Notification.create(data);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  delete(id) {
    try {
      return Notification.findByIdAndRemove(id);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  filter(filter: IFilter, limit, page, projection) {
    try {
      let condition = getCondition(filter);
      let sort = filter.sort_by ? getSort(filter.sort_by) : {_id: "desc"};
      return Notification.find(condition, projection).sort(sort).skip(limit * (page - 1)).limit(limit);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  get(id, projection) {
    try {
      return Notification.findById(id, projection);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  getBy(getBy: IGetBy, projection) {
    try {
      if (getBy._id) {
        return Notification.findById(getBy._id, projection);
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
      return Notification.findByIdAndUpdate(data._id, data, {new: true});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  readNotification(data) {
    try {
      return Notification.findOneAndUpdate({_id: data._id, target: data.target, read: false}, {read: true}, {new: true});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  readAllNotification(data) {
    try {
      return Notification.updateMany({target: data.target, read: false}, {read: true}, {new: true});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }
}

const NotificationService = new NotificationRepository();
export default NotificationService;
