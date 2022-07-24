<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      @click-left="onClickLeft"
      left-arrow
      title="黑马头条"
      z-index="1"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载完成-文章详情 -->
      <div class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title" v-if="msg.data">{{ msg.data.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            v-if="msg.data"
            :src="msg.data.aut_photo"
          />
          <div slot="title" class="user-name" v-if="msg.data">
            {{ msg.data.aut_name }}
          </div>
          <div slot="label" class="publish-date" v-if="msg.data">
            {{ articleDesc }}
          </div>
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="getUserInfo(msg.data.aut_id)"
            >{{ follow }}</van-button
          >
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content article-content markdown-body"
          v-if="msg.data"
          v-html="msg.data.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
          offset="1"
        >
          <van-cell v-for="(item, index) in commentMsg" :key="index">
            <van-image
              slot="icon"
              round
              width="30"
              height="30"
              style="margin-right: 10px"
              :src="item.aut_photo"
            />
            <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
            <div slot="label">
              <p style="color: #363636">{{ item.content }}</p>
              <p>
                <span style="margin-right: 10px">{{ commentDesc }}</span>
                <van-button
                  size="mini"
                  type="default"
                  @click="userComment(item)"
                  >回复{{ item.reply_count }}</van-button
                >
              </p>
            </div>
            <van-icon slot="right-icon" name="like-o" />
          </van-cell>
        </van-list>
      </div>
      <!-- /加载完成-文章详情 -->
    </div>
    <!-- 对用户的评论进行评论 -->

    <!-- 对用户的评论进行评论 -->

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="writeComment"
        >写评论</van-button
      >
      <van-icon name="comment-o" info="123" color="#777" />
      <van-icon
        color="#777"
        name="star-o"
        :class="{ star: isCollected }"
        @click="collectArticles(msg.data.art_id)"
      />
      <van-icon
        color="#777"
        name="good-job-o"
        @click="thumbsUpArticle(msg.data.art_id)"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- 评论区的弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '30%' }"
      width="100%"
    >
      <van-field
        v-model="message"
        rows="2"
        size="small"
        width="70%"
        type="textarea"
        maxlength="30"
        placeholder="请输入留言"
        show-word-limit
        autofocus
      /><van-button @click="puton(msg.data.art_id)">发布</van-button>
    </van-popup>
    <!-- 针对用户评论的弹出层 -->
    <van-popup
      v-model="popshow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
      z-index="99"
    >
      <van-nav-bar
        class="page-nav-bar"
        @click-left="this.popshow = false"
        left-arrow
        title="暂无回复"
        z-index="1"
      ></van-nav-bar>

      <van-cell>
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="userInfo.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ userInfo.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ userInfo.content }}</p>
          <p>
            <span style="margin-right: 10px">{{ commentDesc }}</span>
            <van-button size="mini" type="default"
              >回复{{ userInfo.reply_count }}</van-button
            >
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
      <van-cell>全部回复</van-cell>
      <van-cell v-for="(item, index) in userInfoComment.results" :key="index">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">{{ commentDesc }}</span>
          </p>
        </div>
        <van-icon
          slot="right-icon"
          name="like-o"
          @click="thumbsUpComment(item.com_id)"
        />
      </van-cell>
      <van-button @click="TouserComment" type="warning" round class="cbtn"
        >发布评论</van-button
      >
      <!-- 二级回复层 -->
      <van-popup
        v-model="showpop2"
        position="bottom"
        :style="{ height: '30%' }"
        closeable
        close-icon-position="top-left"
        ><van-field
          v-model="message2"
          rows="2"
          autosize
          label="留言"
          type="textarea"
          maxlength="30"
          placeholder="请输入留言"
          show-word-limit
        />
        <button @click="putonchild()">发布</button>
      </van-popup>
    </van-popup>

    <!-- /底部区域 -->
  </div>
</template>

<script>
import './github-markdown.css'
import dayjs from '@/utils/dayjs'
import {
  getConNew,
  cancelFollow,
  comment,
  collectArticles,
  concellcollectArticles,
  thumbsUpArticle,
  cancelthumbsUpArticle,
  getUserComments,
  thumbsUpComment,
  followAuthor
} from '@/apis'

export default {
  data() {
    return {
      msg: {},
      title: '',
      follow: '',
      isFollow: true,
      show: false,
      message: '',
      isCollected: false,
      isThumbed: false,
      a: 'a',
      b: 'b',
      loading: false,
      finished: false,
      commentMsg: [],
      lastId: null,
      endId: [],
      popshow: false,
      userInfo: [],
      userInfoComment: [],
      nowComId: '',
      showpop2: false,
      message2: ''
    }
  },
  created() {
    this.getConNew()
  },
  mounted() {},
  computed: {
    articleDesc() {
      const relativeTime = dayjs(this.msg.data.pubdate).fromNow()
      return relativeTime
    },
    commentDesc() {
      const relativeTime = dayjs(this.commentMsg.pubdate).fromNow()
      return relativeTime
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    async getConNew() {
      const { data } = await getConNew(this.$route.params.id)
      console.log(data)
      try {
        this.msg = data
        this.title = data.data.title
        this.follwstate()
      } catch (error) {
        console.log(error)
      }
    },
    async getUserInfo(id) {
      if (!this.msg.data.is_followed) {
        try {
          const res = await followAuthor(id)
          console.log(res)
          this.$toast.success('关注成功')
          this.follow = '已关注'
          this.isFollow = false
        } catch (error) {
          this.$toast.fail('关注失败，重试')
        }
      } else {
        this.cancelFollow(id)
      }
    },
    async cancelFollow(id) {
      try {
        await cancelFollow(id)
        this.$toast.success('取消关注成功')
        this.follow = '关注'
        this.isFollow = true
      } catch (error) {
        this.$toast.fail('取消关注失败')
      }
    },
    writeComment() {
      this.show = true
    },
    async puton(target) {
      try {
        const { data } = await comment(target, this.message)
        console.log(data)
        this.$toast.success('评论成功')
        this.show = false
        console.log(this.commentMsg)
        this.commentMsg.unshift(data.data.new_obj)
        // this.commentMsg
      } catch (error) {
        this.$toast.success('评论失败，重试')
      }
    },
    async collectArticles(id) {
      if (!this.isCollected) {
        try {
          const res = await collectArticles(id)
          if (res.status === 201) {
            this.$toast.success('收藏成功')
            this.isCollected = true
          }
        } catch (error) {
          this.$toast.fail('收藏失败')
        }
      } else {
        this.concellcollectArticles(id)
      }
    },
    async concellcollectArticles(id) {
      try {
        await concellcollectArticles(id)
        this.$toast.success('取消收藏成功')
        this.isCollected = false
      } catch (error) {
        this.$toast.success('取消收藏失败')
      }
    },
    async thumbsUpArticle(id) {
      if (this.isThumbed === false) {
        try {
          await thumbsUpArticle(id)
          this.$toast.success('点赞成功')
          this.isThumbed = true
        } catch (error) {
          this.$toast.success('点赞失败')
        }
      } else {
        this.cancelthumbsUpArticle(id)
      }
    },
    async cancelthumbsUpArticle(id) {
      try {
        await cancelthumbsUpArticle(id)
        this.$toast.success('取消点赞成功')
        this.isThumbed = false
      } catch (error) {
        this.$toast.success('取消点赞失败')
      }
    },
    async onLoad() {
      try {
        const { data } = await getUserComments({
          type: this.a,
          source: this.msg.data.art_id,
          offset: this.listId,
          limit: 10
        })
        this.commentMsg.push(...data.data.results)
        this.loading = false
        console.log(data.data.results)
        if (data.data.results.length) {
          this.listId = data.data.last_id.toString()
        } else {
          this.finished = true
        }
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    },
    async userComment(info) {
      this.popshow = true
      console.log(info)
      this.userInfo = info
      this.nowComId = info.com_id

      const { data } = await getUserComments({
        type: 'c',
        source: info.com_id,
        limit: 100
      })
      // console.log(res)
      // const userInfoComment = res
      this.userInfoComment = data.data
      console.log(this.userInfoComment)
    },
    TouserComment() {
      this.showpop2 = true

      //       const res = await comment(this.nowComId,
      // )
    },
    async putonchild() {
      const { data } = await comment(
        this.nowComId,
        this.message2,
        this.msg.data.art_id
      )
      console.log(data)
      this.userInfoComment.results.unshift(data.data.new_obj)

      this.showpop2 = false
    },
    async thumbsUpComment() {
      await thumbsUpComment()
    },
    follwstate() {
      if (this.msg.data) {
        if (this.msg.data.is_followed) {
          this.follow = '已关注'
        } else {
          this.follow = '关注'
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
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
    :deep(.star) {
      background-color: red;
    }

    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
.cbtn {
  width: 100%;
  position: absolute;
  bottom: 0;
}
</style>
