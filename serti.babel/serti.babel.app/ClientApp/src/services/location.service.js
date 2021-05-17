import http from "../http-common";

const get = () => {
    return http.get("/Locations");
};

const create = data => {
    return http.post("/Locations", data);
};

const edit = data => {
    return http.post("/Locations", data);
};

const remove = id => {
    return http.post('/Locations/Delete', id)
};

export default {
    get,
    create,
    edit,
    remove
};
