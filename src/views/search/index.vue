<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        class="search"
        @keydown.enter="searchResultFn"
        @focus="visibleSug"
      />
    </form>
    <!-- <searchHistory></searchHistory>
    <searchList></searchList>
    <searchResult></searchResult> -->
    <component
      :is="componentName"
      :value="value"
      @returnResult="returnResultFn"
    ></component>
  </div>
</template>
<script>
import searchHistory from './componets/searchHistory.vue'
import searchsug from './componets/searchsug.vue'
import searchResult from './componets/searchResult.vue'

export default {
  name: 'searchindex',
  data() {
    return {
      value: '',
      isShowList: false
    }
  },
  created() {},
  computed: {
    componentName() {
      if (this.value.trim() === '') {
        return searchHistory
      }
      if (this.isShowList === true) {
        return searchsug
      }
      return searchResult
    }
  },
  watch: {
    value() {
      if (this.value === '') {
        this.$router.go(0)
      }
    }
  },
  methods: {
    onCancel() {
      this.$router.go(-1)
    },
    onSearch() {
      this.$store.commit('setHistory', this.value)
    },
    searchResultFn() {
      this.isShowList = false
    },
    visibleSug() {
      this.isShowList = true
    },
    returnResultFn(info) {
      this.value = info
      this.searchResultFn(info)
      this.$store.commit('setHistory', info)
    }
  },
  components: {
    searchHistory,
    searchsug,
    searchResult
  }
}
</script>
<style lang="less" scoped>
.search {
  background-color: blue;

  [role='button'] {
    color: #fff;
  }
}
</style>
