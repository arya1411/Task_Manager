export const BASE_URL = 'http://localhost:8000';

export const API_PATH =  {
    AUTH : {
        REGISTER : '/api/auth/register',
        LOGIN : '/api/auth/login',
        GET_PROFILE : '/api/auth/profile',
        UPDATE_PROFILE : '/api/auth/profile',
    } ,
    USERS : {
        GET_ALL_USERS : "/api/users",
        GET_USER_BY_ID : (userId) => `/api/users/${userId}`,
        CREATE_USER : "/api/users",
        UPDATE_USER : (userId) => `/api/users/${userId}`,
        DELETE_USER : (userId) => `/api/users/${userId}`,
    },

    TASKS : {
        GET_DASHBOARD_DATA : '/api/tasks/dashboard-data',
        GET_USER_DASHBOARD_DATA : '/api/tasks/user-dashboard-data',
        GET_ALL_TASKS : '/api/tasks',
        GET_TASK_BY_ID : (taskId) => `/api/tasks/${taskId}`,
        CREATE_TASK : '/api/tasks' ,
        UPDATE_TASK :(taskId) => `/api/tasks/${taskId}`,
        DELETE_TASK : (taskId) => `/api/tasks/${taskId}`,

        UPDATE_TASK_STATUS : (taskId) => `/api/tasks/${taskId}/status`,
        UPDATE_TODO_CHEKCLIST : (taskId) => `/api/tasks/${taskId}/todo`,

        GET_COMMENTS: (taskId) => `/api/tasks/${taskId}/comments`,
        ADD_COMMENT: (taskId) => `/api/tasks/${taskId}/comments`,
    },

    REPORTS : {
        EXPORT_TASKS : '/api/reports/exports/tasks',
        EXPORT_USERS : '/api/reports/exports/users',
        EXPORT_TASKS_PDF : '/api/reports/exports/tasks/pdf',
        EXPORT_USERS_PDF : '/api/reports/exports/users/pdf',
    } ,

    IMAGE :{
        UPLOAD_IMAGE : '/api/auth/upload-image',
    }
}