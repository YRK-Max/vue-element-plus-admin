import service from "@/utils/request";

export const login = (params) => { return service.post('/login', params) };
export const getPermissionsByUser = (params) => { return service.post('/getPermissionsByUser', params) };
export const getUserInfo = (params) => { return service.post('/getUserInfo', params) };