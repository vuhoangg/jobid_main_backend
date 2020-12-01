import { errorLog } from "../../helpers/log";
import { promiseNull } from "../../helpers/promise";
import { CrudContract } from "../contracts/CrudContract";
import CvTheme from "../schemas/CvTheme";

interface ICvThemeFilterType {
    created_by?: string;
    status?: string;
}

interface IGetCvThemeType {
    _id?: string;
    slug?: string;
}

interface IGetBy {
    _id?: string;
}

const getCondition = (filter: ICvThemeFilterType) => {
    let condition = {};
    if (filter.created_by) {
        condition = Object.assign(condition, { created_by: filter.created_by });
    }
    if (filter.status) {
        condition = Object.assign(condition, { status: filter.status });
    }
    return condition;
};

class CvThemeRepository implements CrudContract {
    public create = (data: any) => {
        try {
            return CvTheme.create(data);
        } catch (e) {
            errorLog(`CvTheme::create ${e.message}`);
            return promiseNull();
        }
    };
    public delete = (_id: string) => {
        try {
            return CvTheme.findByIdAndRemove(_id);
        } catch (e) {
            errorLog(`CvTheme::delete ${e.message}`);
            return promiseNull();
        }
    };
    public get = (_id: string, projection = {}) => {
        try {
            return CvTheme.findById(_id, projection);
        } catch (e) {
            errorLog(`CvTheme::find ${e.message}`);
            return promiseNull();
        }
    };
    public update = (data: any) => {
        try {
            return CvTheme.findByIdAndUpdate(data._id, data, { new: true });
        } catch (e) {
            errorLog(`CvTheme::update ${e.message}`);
            return promiseNull();
        }
    };

    public filter = (filter: ICvThemeFilterType, page: number, limit: number, projection = {}) => {
        try {
            let condition = getCondition(filter);
            return CvTheme.find(condition, projection)
                .sort({ title: "asc" })
                .skip(limit * (page - 1))
                .limit(limit);
        } catch (e) {
            errorLog(`CvTheme::filter ${e.message}`);
            return promiseNull();
        }
    };

    public getBy(getBy: IGetBy, projection) {
        try {
            if (getBy._id) {
                return CvTheme.findById(getBy._id, projection);
            } else {
                return promiseNull();
            }
        } catch (e) {
            errorLog(`CvTheme::getBy ${e.message}`)
            return promiseNull();
        }
    }

    public count = (filter: ICvThemeFilterType) => {
        try {
            let condition = getCondition(filter);
            return CvTheme.countDocuments(condition);
        } catch (e) {
            errorLog(`CvTheme::count ${e.message}`);
            return promiseNull();
        }
    };
}

const CvThemeService = new CvThemeRepository();
export default CvThemeService;
