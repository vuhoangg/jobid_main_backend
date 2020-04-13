export interface CrudContract {
    create(data);
    get(id, projection);
    update(data);
    delete(id);
    getBy(getBy, projection);
    filter(filter, limit, page, projection);
    count(filter);
}