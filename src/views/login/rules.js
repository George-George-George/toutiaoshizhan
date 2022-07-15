export const mobileRules = [
  {
    required: true,
    pattern:
      /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
    message: '请输入正确的手机号'
  }
]
export const msgRules = [
  { required: true, message: '请输入正确的验证码', pattern: /^\d{6}$/ }
]
