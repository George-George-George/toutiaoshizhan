import request from '@/utils/request'

export const getSearchSug = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

//  获取搜索结果

export const getSearchResults = (q, page) => {
  return request({
    url: '/v1_0/search',
    params: {
      q: q,
      page: page,
      per_page: 15
    }
  })
}
