import service from '@/utils/github-request'

export const getTrafficViews = () => { return service.get('/traffic/views') }
export const getTrafficClones = () => { return service.get('/traffic/clones') }
