import request from '@/util/request'

export const fetchBlindBoxesCategory = () => {
  const response = request({
    url: '/api/goodsCategory/blindBox/list',
    method: 'get'
  })
  return response
}

export const fetchBlindBoxes = (params) => {
  const response = request({
    url: '/api/blindBox/newPage',
    method: 'get',
    params
  })
  return response
}

export const fetchSingleGoodsPage = (params) => {
  const response = request({
    url: '/api/goods/singleGoodsPage',
    method: 'get',
    params
  })
  return response
}

export const fetchBoxesDetail = (id) => {
  const response = request({
    url: '/api/blindBox/getById',
    method: 'get',
    params: {
      id
    }
  })
  return response
}

export const fetchPersonalBlindBoxes = (params) => {
  const response = request({
    url: '/api/blindBox/personalBlindBoxList',
    method: 'get',
    params
  })
  return response
}

export const fetchWaitCount = () => {
  const response = request({
    url: '/api/order/wait/send/count',
    method: 'get'
  })
  return response
}

export const drawBoxes = (orderNos) => {
  const response = request({
    url: '/api/order/draw',
    method: 'post',
    data: {
      orderNos
    }
  })
  return response
}
