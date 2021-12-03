import request from "../index";

export const homeService = {
    channels(params) {
        return request.get('channels', params)
    },
    articles(params) {
        return request.get('articles', params)
    }
}