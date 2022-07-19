<template>
  <div>
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
    />
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      />
    </van-cell>
    <van-cell v-if="articleInfo.cover.type === 3" :title="articleInfo.title">
      <template #label>
        <div>
          <van-image
            v-for="(item, index) in articleInfo.cover.images"
            :key="index"
            :src="item"
            width="3rem"
            height="2rem"
          ></van-image>
        </div>
        <span>{{ articleDesc }}</span></template
      ></van-cell
    >
  </div>
</template>
<script>
import dayjs from '@/utils/dayjs'
export default {
  name: 'articleList',
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {},
  computed: {
    articleDesc() {
      const art = this.articleInfo
      const relativeTime = dayjs(art.pubdate).fromNow()
      return `${art.aut_name} ${art.comm_count}评论 ${relativeTime} `
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped></style>
