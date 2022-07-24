<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightData"
      :key="index"
      @click="returnResult(index)"
    >
      <template #icon><van-icon class="icon-spc" name="search" /> </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>
<script>
import { getSearchSug } from '@/apis'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestion: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler() {
        this.getSearchSug()
      }
    }
  },
  created() {},
  computed: {
    highlightData() {
      const reg = new RegExp(this.value, 'gi')
      return this.suggestion.map((str) =>
        str.replace(reg, (match) => `<span style="color: blue">${match}</span>`)
      )
    }
  },
  methods: {
    async getSearchSug() {
      const res = await getSearchSug(this.value)
      if (res.data.data.options.length === 0) {
        this.$toast.fail('shibai')
      }
      // console.log(res)
      this.suggestion = res.data.data.options.filter(Boolean)
    },
    returnResult(idx) {
      const rR = this.suggestion[idx]
      this.$emit('returnResult', rR)
    }
  }
}
</script>
<style lang="less" scoped>
.icon-spc {
  position: relative;
  top: 5px;
}
</style>
