<template>
  <div class="my">
    <header>
      <div v-if="isLogin" class="user_info banner">
        <van-row></van-row>
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.73rem"
                height="1.73rem"
                :src="userInfo.photo"
              />
              <span class="mobile" style="font-size: 15px">{{
                userInfo.name
              }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button class="code-btn" size="mini" round @click="spaceUser"
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="收藏">
              <template #icon> {{ userInfo.art_count }} </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon> {{ userInfo.fans_count }} </template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon> {{ userInfo.follow_count }} </template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon> {{ userInfo.like_count }} </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div v-else class="login-register banner">
        <div class="login-small" @click="$router.push('/login')">
          <img src="@/styles/images/mobile.png" alt="" />
          <span>登录 / 注册</span>
        </div>
      </div>
    </header>
    <main>
      <van-grid :column-num="2" class="grid" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小志同学" is-link />
      </div>
    </main>
    <van-button v-if="isLogin" block class="login-btn" @click="Logout"
      >退出</van-button
    >
  </div>
</template>
<script>
import { getUserInfo } from '@/apis'
export default {
  name: 'my',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    Logout() {
      this.$dialog
        .confirm({ title: '黑马头条', message: '是否退出当前账号' })
        .then(() => {
          this.$store.commit('setUser', {})
        })
        .catch(() => {})
    },
    async getUserInfo() {
      if (this.isLogin) {
        const {
          data: { data }
        } = await getUserInfo()
        this.userInfo = data
      }
    },
    spaceUser() {
      this.$router.push('/user')
    }
  }
}
</script>
<style lang="less" scoped>
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.banner {
  width: 100%;
  height: 400px;
  background: url(@/styles/images/banner.png) no-repeat 0 0 / cover;
}
.login-register {
  display: flex;
  justify-content: center;
  img {
    width: 25%;
    margin-bottom: 8px;
  }
  .login-small {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 29px;
    color: #fff;
  }
}

.user_info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
    .mobile {
      font-size: 40px;
      color: #fff;
    }
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }
  .code-row {
    height: 100%;
  }
  .grid {
    font-size: 30px;
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}
main {
  .grid {
    color: #646566; // 字体图标 .toutiao { font-size: 0.6rem;
    :deep(.toutiao-lishi) {
      font-size: 50px;
      color: #ffb31d;
    }
    :deep(.toutiao-shoucang) {
      font-size: 50px;

      color: #ed5253;
    }
  }
  .link {
    margin: 10px 0 10px 0;
  }
}
.login-btn {
  color: red;
}
</style>
