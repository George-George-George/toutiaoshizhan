<template>
  <div>
    <van-picker
      title="更改性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      ref="sex"
    />
  </div>
</template>
<script>
import { editUserMsg } from '@/apis'

export default {
  props: {
    usersex: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      sex: ''
    }
  },
  created() {},
  computed: {},
  methods: {
    onCancel() {
      this.$router.go(0)
    },
    onConfirm(value, index) {
      console.log(value)
      this.sex = index.toString()
      console.log(this.sex)
      this.editUserMsg()
      this.$router.go(0)
    },
    async editUserMsg() {
      await editUserMsg({
        gender: this.sex
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
