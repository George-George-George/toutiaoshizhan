import request from '@/utils/request'
/**
 *登录
 * @param {string} mobile 手机号
 * @param {string} code 验证码
 * @returns
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile: mobile, code: code }
  })
}
/**
 *
 * @param {string} mobile 手机号
 * @returns
 */
export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = (id) => {
  return request({
    url: '/v1_0/user',
    data: {
      target: id
    }
  })
}

// 编辑用户个人资料  /v1_0/user/profile

export const editUserMsg = (formData) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: formData
  })
}

// 编辑用户头像 /v1_0/user/photo

export const editUserPhoto = (data) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 获取用户资料 /v1_0/user/profile

export const getUserprofile = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
