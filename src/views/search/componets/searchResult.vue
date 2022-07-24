<template>
  <div>
    <van-list
      v-model="loading"
      offset="0"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadNextPage"
      :immediate-check="false"
    >
      <van-cell
        v-for="item in searchResultList"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>
<script>
import { getSearchResults } from '@/apis'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchResultList: [],
      loading: false,
      finished: false,
      nowPage: 1
    }
  },
  created() {
    this.getSearchResults()
  },
  computed: {},
  methods: {
    async getSearchResults() {
      const { data } = await getSearchResults(this.value, this.nowPage)
      this.searchResultList = data.data.results
    },
    async loadNextPage() {
      this.nowPage++
      try {
        const { data } = await getSearchResults(this.value, this.nowPage)
        this.loading = false
        if (data.data.results.length === 0) {
          return (this.finished = true)
        }

        this.searchResultList.push(...data.data.results)
      } catch (error) {
        this.$toast.fail('发生错误')
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
