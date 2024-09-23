import request from '@/util/request'

export const fetchMallCategory = (params) => {
  const response = request({
    url: '/api/goodsCategory/list',
    method: 'get',
    params
  })
  return response
}

export const fetchGoodsList = (params) => {
  const response = request({
    url: '/api/goods/page',
    method: 'get',
    params
  })
  return response
}

export const fetchGoodsDetail = (params) => {
  const response = request({
    url: '/api/goods/getById',
    method: 'get',
    params
  })
  return response
}
