<template>
  <van-popup
    v-model="showPopup"
    closeable
    position="bottom"
    close-icon-position="top-left"
    :style="{ height: '100%' }"
  >
    <div class="main">
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button
            round
            size="small"
            class="ch-btn"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            v-for="(item, index) in myChannel"
            :key="item.id"
            :class="{ 'active-channel': item.name === '推荐' }"
            @click="delchannel(item, index)"
          >
            <template #icon>
              <van-icon
                name="cross"
                v-show="isEdit && item.name !== '推荐'"
              ></van-icon>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="recommend-channel">
        <van-cell title="推荐频道"></van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            :text="item.name"
            icon="plus"
            v-for="item in recommendChannels"
            :key="item.id"
            @click="addChannel(item)"
          ></van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>
<script>
import { getAllChannel } from '@/apis'

export default {
  props: {
    myChannel: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      showPopup: false,
      allChannel: [],
      isEdit: false
    }
  },
  created() {
    this.getAllChannel()
  },
  computed: {
    recommendChannels() {
      return this.allChannel.filter(
        (item) => !this.myChannel.find((i) => i.id === item.id)
      )
    }
  },
  methods: {
    async getAllChannel() {
      const { data } = await getAllChannel()
      //   console.log(data)
      this.allChannel = data.data.channels
    },
    delchannel(item, index) {
      if (this.isEdit === true && item.name !== '推荐') {
        this.$emit('del-mychannel', item)
      }
      if (!this.isEdit) {
        this.showPopup = false
        this.$emit('changechannel', index)
      }
    },
    addChannel(item) {
      this.$emit('addChannel', { ...item })
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  padding-top: 100px;
  :deep(.ch-btn) {
    padding: 0 30px;
    height: 48px;
    border: 0.02667rem solid red;
    color: red;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
          font-size: 12px;
        }
      }
    }
    .active-channel {
      :deep(.van-grid-item__text) {
        color: red;
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
  // 推荐频道的样式 .recommend-channel { // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;
    .van-grid-item__icon {
      font-size: 0.5rem;
    }
    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
