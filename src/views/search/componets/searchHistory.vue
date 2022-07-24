<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell title="搜索历史">
        <van-icon v-if="isDel" @click="isDel = false" name="delete-o" />
        <div v-else>
          <span @click="clearToken">全部删除 </span>
          <span @click="isDel = true">完成</span>
        </div>
      </van-cell>

      <van-cell
        @click="returnItem(item)"
        v-for="(item, index) in historyList"
        :key="index"
        :title="item"
      >
        <van-icon v-if="!isDel" @click="listDel(item)" name="delete-o" />
      </van-cell>
    </van-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      historyList: [],
      loading: false,
      finished: false,
      isDel: true
    }
  },
  created() {
    this.historyList = this.$store.state.history
  },
  watch: {},
  computed: {},
  methods: {
    onLoad() {
      console.log(123)
    },
    clearToken() {
      this.$store.commit('removeHistory')
      this.$router.go(0)
    },
    listDel(item) {
      this.$store.state.history.forEach((p, index) => {
        if (p === item) {
          const idx = index
          this.$store.state.history.splice(idx, 1)
        }
      })
    },
    returnItem(item) {
      console.log(item)
      const rR = item
      this.$emit('returnResult', rR)
    }
  }
}
</script>
<style lang="scss" scoped></style>
