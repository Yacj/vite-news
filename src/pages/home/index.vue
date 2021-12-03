<template>
  <div class="home">
    <div class="nav-bar">
      <van-button
          class="search-btn"
          round
          type="primary"
          size="small"
          icon="search"
          @click="$router.push('/search')"
      >搜索
      </van-button>
    </div>
    <van-tabs v-model:active="tab.active" animated :swipeable="true" :sticky="true" @click-tab="clickTab"
              @change="changeTab">
      <van-tab v-for="item in tab.list" :title="item.name" :key="item.id">
        <article-list :channel_id="channelId"/>
      </van-tab>
    </van-tabs>
  </div>
  <tabbar :active="0"/>
</template>

<script setup>
import Tabbar from "../../components/Tabbar/Tabbar.vue";
import {onActivated, reactive, ref} from "vue";
import {homeService} from "../../request/home";
import ArticleList from "./components/articleList.vue";

const isLoading = ref(false);

const tab = reactive({
  active: 0,
  list: []
})
const channelId = ref(1)

onActivated(() => {
  console.log("keepalive")
})

function getHomeData() {
  homeService.channels().then((res) => {
    const {channels} = res.data
    tab.list = channels
    channelId.value = channels[0].id
  })
}

function clickTab(val) {
  const {title} = val
  const {id} = tab.list.find((val) => {
    return val.name === title
  })
  channelId.value = id
}

function changeTab(val) {
  const {id} = tab.list.find((item, index, arr) => {
    return val === index
  })
  channelId.value = id
}

getHomeData()
</script>

<style scoped lang="scss">
::v-deep {
  .van-tabs__line {
    bottom: 20px;
    width: 15px !important;
    height: 3px;
    background: #3296fa;
  }
}

.home {
  height: 100vh;

  .nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    width: 100%;
    height: 56px;
    background-color: #3196fa;
    z-index: 1;

    .search-btn {
      background-color: #5babfb;
      width: 50%;
    }
  }
}
</style>