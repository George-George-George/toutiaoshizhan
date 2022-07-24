<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-field
      v-model="usermessage"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      :placeholder="username"
      show-word-limit
    />
  </div>
</template>
<script>
import { editUserMsg } from '@/apis'
export default {
  props: {
    username: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      usermessage: ''
    }
  },
  created() {},
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(0)
    },
    onClickRight() {
      this.editUserMsg()
    },
    async editUserMsg() {
      const data = await editUserMsg({
        name: this.usermessage
      })
      console.log(data)
      this.$router.go(0)
    }
  }
}
</script>
<style lang="scss" scoped></style>
