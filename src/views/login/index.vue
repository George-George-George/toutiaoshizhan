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
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"> </span> </template
      ></van-field>
      <van-field
        v-model="code"
        type="text"
        placeholder="请输入验证码"
        :rules="msgRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"> </span>
        </template>

        <template #right-icon>
          <van-count-down
            v-if="isShowCountDown"
            :time="10 * 1000"
            @finish="isShowCountDown = false"
          >
          </van-count-down>

          <van-button
            v-else
            class="code-btn"
            size="mini"
            round
            @click="sendCode"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { login, sendCode } from '@/apis/user'
import { mobileRules, msgRules } from './rules'
export default {
  data() {
    return {
      code: '',
      mobile: '',
      mobileRules,
      msgRules,
      isShowCountDown: false
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async onSubmit() {
      this.$toast.loading({ message: '加载中...', forbidClick: true })
      try {
        const res = await login(this.mobile, this.code)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        this.$router.push('/profile')
      } catch (error) {
        const status = error.response.status
        let message = '登录失败，请刷新'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)

        // switch (status) {
        //   case 400:
        //     this.$toast.fail(error.response.data.message)
        //     break
        //   case 507:
        //     this.$toast.fail('登录失败，刷新')
        //     break
        //   default:
        //     this.$toast.fail('登录失败，刷新')
        //     break
        // }
      }
    },
    async sendCode() {
      try {
        await this.$refs.form.validate('mobile')
        await sendCode(this.mobile)
        this.isShowCountDown = true
      } catch (error) {
        if (error.response) {
          this.$toast.fail('手机号格式不正确')
          console.log(123)
        } else {
          const status = error.response.status
          if (status === 400 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
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
