<template>
  <div>
    <van-nav-bar
      class="nav_bar"
      title="标题"
      left-arrow
      @click-left="onClickLeft"
    />
    <input type="file" hidden ref="file" @change="FileFn" />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        class="avatar"
        width="30"
        height="30"
        fit="cover"
        round
        :src="userPhoto"
      />
    </van-cell>
    <!-- 头像弹框 -->
    <van-popup position="bottom" style="height: 100%" v-model="show"
      ><touxiang v-if="show" :img="img"></touxiang>
    </van-popup>
    <!-- 头像弹框 -->

    <van-cell title="昵称" is-link @click="nameFn">{{ username }} </van-cell>
    <!-- 昵称弹框 -->
    <van-popup v-model="nameshow" position="bottom" :style="{ height: '100%' }"
      ><namepop :username="username"></namepop>
    </van-popup>
    <!-- 昵称弹框 -->

    <van-cell title="性别" is-link @click="sexFn">{{ usersex }}</van-cell>
    <!-- 性别弹框 -->
    <van-popup v-model="sexshow" position="bottom" :style="{ height: '40%' }"
      ><gender :usersex="usersex"></gender>
    </van-popup>

    <!-- 性别弹框 -->

    <van-cell title="生日" is-link @click="birFn"
      >{{ birthday }}
      <van-popup
        v-model="birthdayshow"
        position="bottom"
        :style="{ height: '40%' }"
        ><birth :birthday="birthday"></birth>
      </van-popup>
    </van-cell>
  </div>
</template>
<script>
import namepop from './name'
import touxiang from './touxiang'
import gender from './gender'

import { getUserprofile } from '@/apis'
import birth from './birthday/index.vue'

export default {
  data() {
    return {
      show: false,
      userPhoto: '',
      username: '',
      usersex: '',
      birthday: '',
      img: '',
      nameshow: false,
      sexshow: false,
      birthdayshow: false
    }
  },
  created() {
    this.getUserprofile()
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    FileFn() {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)

      this.show = true
      // file-input 如果选了同一个文件不会触发 change 事件
      // 解决办法就是每次使用完毕，把它的 value 清空
      this.$refs.file.value = ''
    },
    async getUserprofile() {
      const { data } = await getUserprofile()
      console.log(data.data)
      this.userPhoto = data.data.photo
      this.username = data.data.name
      this.birthday = data.data.birthday
      if (data.data.gender === 1) {
        this.usersex = '女'
      } else {
        this.usersex = '男'
      }
    },
    nameFn() {
      this.nameshow = true
    },
    sexFn() {
      this.sexshow = true
    },
    birFn() {
      this.birthdayshow = true
    }
  },
  components: {
    touxiang,
    namepop,
    gender,
    birth
  }
}
</script>
<style lang="less" scoped>
.nav_bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
</style>
