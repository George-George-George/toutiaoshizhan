<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="loadNextList">
      <van-list
        @load="loadNextList"
        offset="0"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="出错了"
      >
        <ArticleItem
          v-for="item in newList"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import ArticleItem from './articleItem.vue'
import { getNewList1 } from '@/apis'
export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      newList: [],
      pre_timestamp: '',
      finished: false,
      error: false,
      isLoading: false

      // loading: false
    }
  },
  created() {
    this.getNewList1()
  },
  computed: {},
  methods: {
    async getNewList1() {
      try {
        const { data } = await getNewList1(this.id, +new Date())
        this.newList = data.data.results
        // console.log(this.newList)
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('请求失败，请刷新')
        }
      }
    },
    async loadNextList() {
      try {
        const { data } = await getNewList1(this.id, this.pre_timestamp)

        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.isLoading) {
          this.newList.unshift(...data.data.results)
        } else {
          this.newList.push(...data.data.results)
        }

        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.isLoading = false
      }
    },
    addChannelFn(channel) {
      this.newList.push(channel)
    }
  },
  components: {
    ArticleItem
  }
}
</script>
<style lang="scss" scoped></style>
