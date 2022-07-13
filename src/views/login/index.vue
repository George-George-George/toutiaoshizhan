<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      class="nav_bar"
      title="登录"
      left-text="返回"
      @click="onClickLeft"
    >
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 注册 -->
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="mobile"
        name="用户名"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写用户名' }]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"> </span> </template
      ></van-field>
      <van-field
        v-model="code"
        type="text"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写密码' }]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"> </span>
        </template>
        <template #right-icon>
          <van-button class="code-btn" size="mini" round>发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { login } from '@/apis/user'
export default {
  data() {
    return {
      code: '',
      mobile: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async onSubmit() {
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>
<style lang="less" scoped>
.nav_bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.form {
  :deep(.van-cell__value) {
    flex: 20;
  }

  :deep(.van-cell__title) {
    flex: 1;
  }
  :deep(.toutiao) {
    font-size: 0.5rem;
  }
  .van-button--info {
    background-color: #6db4fb;
    border: none;
  }
  .code-btn {
    background-color: #eee;
    padding: 0 10px;
    color: #666;
  }
}
</style>
