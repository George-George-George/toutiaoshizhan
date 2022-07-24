import str from '@/utils/localset'
import request from '@/utils/request'

export const getChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

export const getAllChannel = () => {
  return request({
    url: '/v1_0/channels'
  })
}

export const delMychannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

export const addMychannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

const HEIMA_TOUTIAO_CHANNEL = 'HEIMA_TOUTIAO_CHANNEL'
export const getMyChannelByLocal = () => str.get(HEIMA_TOUTIAO_CHANNEL)

export const setMyChannelLocal = (channel) =>
  str.set(HEIMA_TOUTIAO_CHANNEL, channel)
