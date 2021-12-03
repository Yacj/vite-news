<template>
  <van-nav-bar
      :border="false"
      :title="props.title"
      :left-text="props.leftText"
      left-arrow
      @click-left="onClickLeft"
  />
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  leftText: {
    type: String,
    default: '返回'
  }
})
const onClickLeft = () => history.back();

</script>

<style>
.van-nav-bar {
  background: #009eff;
}

.van-nav-bar .van-icon {
  color: #fff;
}

.van-nav-bar__title {
  color: #fff;
}

</style>