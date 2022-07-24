<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="currentDate"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>
<script>
import dayjs from '@/utils/dayjs'
import { editUserMsg } from '@/apis'
export default {
  data() {
    return {
      minDate: new Date(1919, 0, 1),
      currentDate: new Date(),
      nowday: ''
    }
  },
  methods: {
    onConfirm(value, index) {
      this.nowday = dayjs(value).format('YYYY-MM-DD')
      this.editUserMsg()
      console.log(this.nowday)
      this.$router.go(0)
    },
    onCancel() {
      this.$router.go(0)
    },
    async editUserMsg() {
      await editUserMsg({
        birthday: this.nowday
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
