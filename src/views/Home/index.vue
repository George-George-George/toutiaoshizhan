<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round><van-icon name="search"></van-icon>搜索</van-button>
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" swipeable :border="false">
      <van-tab v-for="item in channelList" :key="item.id" :title="item.name"
        ><Article :id="item.id"></Article
      ></van-tab>
      <span class="toutiao toutiao-gengduo" @click="showPopup"></span>
    </van-tabs>
    <pop
      ref="showPop"
      :myChannel="channelList"
      @del-mychannel="delFn"
      @changechannel="changeFn"
      @addChannel="addChannelFn"
    ></pop>
  </div>
</template>
<script>
import Article from './article'
import pop from './article/pop.vue'
import {
  getChannel,
  getMyChannelByLocal,
  setMyChannelLocal,
  delMychannel,
  addMychannel
} from '@/apis'
export default {
  data() {
    return {
      active: '',
      channelList: []
    }
  },
  created() {
    this.getChannel()
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    async getChannel() {
      if (!this.isLogin) {
        const myChannel = getMyChannelByLocal()
        if (myChannel) {
          this.channelList = myChannel
        } else {
          const { data } = await getChannel()
          this.channelList = data.data.channels
        }
      } else {
        const { data } = await getChannel()
        this.channelList = data.data.channels
      }
    },
    showPopup() {
      this.$refs.showPop.showPopup = true
    },
    async delFn(id) {
      this.channelList = this.channelList.filter((item) => item.id !== id.id)
      if (!this.isLogin) {
        setMyChannelLocal(this.channelList)
      } else {
        try {
          await delMychannel()
        } catch (error) {
          this.$toast.fail('删除失败')
        }
      }
      this.$toast.fail('删除成功')
    },
    changeFn(id) {
      this.active = id
    },
    async addChannelFn(channel) {
      this.channelList.push(channel)
      if (!this.isLogin) {
        setMyChannelLocal(this.channelList)
      } else {
        try {
          await addMychannel(channel.id, this.channelList.length)
        } catch (error) {
          return this.$toast.fail('失败')
        }
      }
      this.$toast.fail('成功')
    }
  },
  components: {
    Article,
    pop
  }
}
</script>
<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
    font-size: 0.36rem;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0; /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    } /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
} /* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  z-index: 99;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    // background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}
:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
