<template>
  <van-tabbar v-model="props.active">
    <van-tabbar-item
        v-for="(item,index) in footerList"
        :icon="item.icon"
        :key="index"
        @click="footerNavigateTo(item.path)"
    >
      {{ item.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import {useRouter} from "vue-router";
const router = useRouter()
const footerList = [
  {
    index: 0,
    name: '首页',
    path: '/home',
    icon: 'wap-home-o'
  },
  {
    index: 1,
    name: '问答',
    path: '/find',
    icon: 'comment-o'
  },
  {
    index: 2,
    name: '视频',
    path: '/find',
    icon: 'video-o'
  },
  {
    index: 3,
    name: '我的',
    path: '/user',
    icon: 'manager-o',
    dot: false,
    info: ''
  }
]
const footerNavigateTo = (url) => {
  router.push(url)
}
const props = defineProps({
  active: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>

</style>