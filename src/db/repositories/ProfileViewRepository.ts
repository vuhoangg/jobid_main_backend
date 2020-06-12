import {CrudContract} from "../contracts/CrudContract";
import ProfileView from "../schemas/ProfileView";
import {errorLog} from "../../helpers/log";
import {promiseNull} from "../../helpers/promise";

interface ISort {
  created?: "newest" | "oldest",
  updated?: "newest" | "oldest",
}

interface IFilter {
  sort_by?: ISort;
  user_hunter?: string;
  user_profile?: string;
}

interface IGetBy {
  _id?: string;
}

function getCondition(filter: IFilter) {
  let condition = {};
  if (filter.user_hunter) {
    condition = Object.assign(condition, {user_hunter: filter.user_hunter});
  }
  if (filter.user_profile) {
    condition = Object.assign(condition, {user_profile: filter.user_profile});
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

class ProfileViewRepository implements CrudContract {
  count(filter: IFilter) {
    try {
      let condition = getCondition(filter);
      return ProfileView.countDocuments(condition);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  create(data) {
    try {
      return ProfileView.create(data);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  delete(id) {
    try {
      return ProfileView.findByIdAndRemove(id);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  get(id, projection) {
    try {
      return ProfileView.findById(id, projection).populate('user_hunter').populate('user_profile');
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  filter(filter: IFilter, limit, page, projection) {
    try {
      let condition = getCondition(filter);
      let sort = filter.sort_by ? getSort(filter.sort_by) : {_id: "desc"};
      return ProfileView.find(condition, projection).populate('user_hunter').populate('user_profile').sort(sort).skip(limit * (page - 1)).limit(limit);
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  getBy(getBy: IGetBy, projection) {
    try {
      if (getBy._id) {
        return ProfileView.findById(getBy._id, projection);
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
      return ProfileView.findByIdAndUpdate(data._id, data, {new: true});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }

  profileView(data) {
    
    try {
      let updateData = Object.assign(data, {$inc: {view_count: 1}});
      return ProfileView.findOneAndUpdate({user_hunter: data.user_hunter, user_profile: data.user_profile}, updateData, {new: true, upsert: true});
    } catch (e) {
      errorLog(e);
      return promiseNull();
    }
  }
}

const ProfileViewService = new ProfileViewRepository();
export default ProfileViewService;
