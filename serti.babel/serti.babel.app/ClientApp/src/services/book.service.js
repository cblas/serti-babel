import http from "../http-common";

const get = () => {
    return http.get("/Books");
};

const create = data => {
    return http.post("/Books", data);
};

const edit = data => {
    return http.post("/Books", data);
};

const remove = id => {
    return http.post('/Books/Delete', id)
};

export default {
    get,
    create,
    edit,
    remove
};
