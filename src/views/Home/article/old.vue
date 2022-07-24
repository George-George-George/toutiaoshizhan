<template>
  <div>
    <van-nav-bar
      class="nav_bar"
      title="黑马头条"
      left-arrow
      @click-left="onClickRight"
    />
    <h5>{{ title }}</h5>
    <div class="navtitle">
      <div class="left">
        <van-image v-if="msg.data" :src="msg.data.aut_photo"></van-image>
        <div style="display: flex; flex-direction: column">
          <span v-if="msg.data">{{ msg.data.aut_name }}</span>
          <span v-if="msg.data">{{ articleDesc }}</span>
        </div>
      </div>
      <van-button type="info" round class="van-button">+关注</van-button>
    </div>
    <!-- 文章内容 -->

    <!-- 文章底部 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" info="123" color="#777" />
      <van-icon color="#777" name="star-o" />
      <van-icon color="#777" name="good-job-o" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
  </div>
</template>
<script>
import dayjs from '@/utils/dayjs'
import { getConNew } from '@/apis'

export default {
  data() {
    return {
      msg: [],
      title: ''
    }
  },
  created() {
    this.getConNew()
  },
  computed: {
    articleDesc() {
      const relativeTime = dayjs(this.msg.data.pubdate).fromNow()
      return relativeTime
    }
  },
  methods: {
    onClickRight() {
      this.$router.back(-1)
    },
    async getConNew() {
      const { data } = await getConNew(this.$store.state.newsId)
      try {
        this.msg = data
        this.title = data.data.title
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="less" scoped>
:deep(.nav_bar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
h5 {
  font-size: 0.53333rem;
  padding: 0.66667rem 0.42667rem;
  margin: 0;
  color: #3a3a3a;
}
.navtitle {
  padding: 0.42667rem;

  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    span {
      font-size: 0.32rem;
      color: #3a3a3a;
    }
  }

  .van-button {
    width: 2.26667rem;
    height: 0.77333rem;
  }
  .van-image {
    position: relative;
    top: -5px;
    width: 0.93333rem;
    height: 0.93333rem;
    margin-right: 0.22667rem;
  }
}
.content {
  padding: 55px 32px;
  margin: 0;
  /deep/ p {
    text-align: justify;
  }
}
.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 88px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 282px;
    height: 46px;
    border: 2px solid #eeeeee;
    font-size: 30px;
    line-height: 46px;
    color: #a7a7a7;
  }
  .van-icon {
    font-size: 40px;
    .van-info {
      font-size: 16px;
      background-color: #e22829;
    }
  }
}
</style>
