import request from '@/utils/request'
/**
  *获取品牌
  */
export const findBrand = (limit) => {
  return request('/home/brand', 'get', { limit })
}

/**
 * 获取广告图
 */
export const findBanner = () => {
  return request('/home/banner', 'get')
}