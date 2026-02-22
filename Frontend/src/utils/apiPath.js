export const BACKEND_URL = "http://localhost:4000";

export const API_PATHS = {
    AUTH: {
        LOGIN: "api/v1/auth/login",
        REGISTER: "api/v1/auth/register",
        GET_USER_INFO: "api/v1/auth/getUser",
    },
    USER: {
        PROFILE: "api/v1/user/profiles",
        UPDATE:  "api/v1/user/update",
    },
    POST: {
        ADD: "api/v1/post/add",
        FEED: "api/v1/post/feed",
        LIKE: "api/v1/post/like",
    },
    STORY: {
       CREATE: "api/v1/story/create",
       GET_STORY: "api/v1/story/get",
    },
};