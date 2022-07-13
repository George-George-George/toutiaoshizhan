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
