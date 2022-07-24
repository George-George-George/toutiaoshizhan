import request from '@/utils/request'
// 获取新闻详情

export const getConNew = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}

// 关注文章作者

export const followAuthor = (id) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: id
    }
  })
}

//  取消关注文章作者

export const cancelFollow = (id) => {
  return request({
    url: `/v1_0/user/followings/${id}`,
    method: 'DELETE'
  })
}

// 对文章评论或对评论进行评论 /v1_0/comments

export const comment = (target, content, id) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: id
    }
  })
}

// 收藏文章

export const collectArticles = (id) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: id
    }
  })
}

// 取消收藏文章 /v1_0/article/collections/:target

export const concellcollectArticles = (id) => {
  return request({
    url: `/v1_0/article/collections/${id}`,
    method: 'DELETE'
  })
}

//  对文章点赞 v1_0/article/likings

export const thumbsUpArticle = (id) => {
  return request({
    url: 'v1_0/article/likings',
    method: 'POST',
    data: {
      target: id
    }
  })
}

// 取消对文章点赞  /v1_0/article/likings/:target

export const cancelthumbsUpArticle = (id) => {
  return request({
    url: `/v1_0/article/likings/${id}`,
    method: 'DELETE'
  })
}

// 获取评论列表 // 回复用户评论

export const getUserComments = (params) => {
  return request({
    url: '/v1_0/comments',
    params
  })
}

// 对评论点赞 /v1_0/comment/likings

export const thumbsUpComment = (id) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      id
    }
  })
}
