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
        CONNECTIONS:  "api/v1/user/connections",
        UNFOLLOW:  "api/v1/user/unfollow",
        ACCEPT:  "api/v1/user/accept",
        DISCOVER:  "api/v1/user/discover",
        FOLLOW:  "api/v1/user/follow",
        CONNECT:  "api/v1/user/connect",
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
    MESSAGES:{
        GET_MESSAGE: "api/v1/messages/get",
        SENT: "api/v1/messages/send",
    }
};