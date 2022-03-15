import service from "@/utils/request";

export const login = (params) => { return service.post('/sys/login', params) };