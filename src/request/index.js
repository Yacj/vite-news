import axios from "axios";
import {Toast} from "vant";

const service = axios.create({
    baseURL: 'http://toutiao.itheima.net/v1_0/',
    timeout: 3 * 1000
})
service.interceptors.request.use(
    options => {
        if (options.data) {
            if (options.uploadFile) {
                const data = new FormData();

                for (let key in options.data) {
                    data.append(key, options.data[key]);
                }

                options.data = data;
                options.headers = {
                    'Content-Type': 'multipart/form-data'
                };

                delete options.uploadFile;
            } else {
                options.data = JSON.stringify(options.data);
                options.headers = {
                    'Content-Type': 'application/json'
                };
            }
        }
        return options;
    },
    error => {
        Promise.reject(error);
    }
);
service.interceptors.response.use(
    response => {
        return response.data
        // const {code, data} = response.data
        // if (code === 0) {
        //     return data
        // } else {
        //     Toast.fail(response.data.message);
        //     return Promise.reject(data);
        // }
    },
    error => {
        return Promise.reject(error.response);
    }
);

const request = function ({url, method, data, params, uploadFile}) {
    const options = {
        url,
        method
    };

    if (data) {
        options.data = data;
    }

    if (params) {
        options.params = params;
    }

    options.uploadFile = !!uploadFile;

    return service(options);
};

request.get = function (url, params) {
    return request({
        url,
        params,
        method: 'get'
    });
};

request.post = function (url, data) {
    return request({
        url,
        data,
        method: 'post'
    });
};

request.put = function (url, data) {
    return request({
        url,
        data,
        method: 'put'
    });
};

request.patch = function (url, data) {
    return request({
        url,
        data,
        method: 'patch'
    });
};

request.delete = function (url, data) {
    return request({
        url,
        data,
        method: 'delete'
    });
};

export default request;