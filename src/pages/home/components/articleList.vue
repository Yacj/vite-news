<template>
  <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh">
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <van-cell v-for="(item,index) in articleList" :key="index+1" class="article-item">
        <template #title>
          <div style="width: 90%">
            {{ item.title }}
          </div>
        </template>
        <template #label>
          <div class="cover-wrap" v-if="item.cover.type === 3">
            <div class="cover-wrap-item">
              <van-image
                  width="116"
                  height="73"
                  fit="cover"
                  v-for="(item,index) in item.cover.images"
                  :key="index"
                  :src="item"
              />
            </div>
          </div>
          <span class="article-item-label">评论:{{ item.comm_count }}</span>
          <span>发布时间:{{ timeStr(item.pubdate) }}</span>
        </template>
        <template v-if="item.cover.type === 1" #value>
          <van-image
              fit="cover"
              :src="item.cover.images[0]"
              class="cover-left-img"
          />
        </template>
      </van-cell>
    </van-list>
  </van-pull-refresh>
</template>

<script setup>
import {computed, reactive, ref} from "vue";
import {homeService} from "../../../request/home";
import {Toast} from "vant";

const articleList = reactive([]);
const loading = ref(false);
const finished = ref(false);
const isRefreshLoading = ref(false)
const timestamp = ref(null)
const refreshSuccessText = ref('')

const props = defineProps({
  channel_id: {
    type: Number || String,
    default: 1
  },
})

function onLoad() {
  const params = {
    channel_id: props.channel_id,
    timestamp: timestamp.value || Date.now(),
    with_top: 1
  }
  homeService.articles(params).then(res => {
    const {results, pre_timestamp} = res.data
    articleList.push(...results)
    loading.value = false
    if (results.length) {
      timestamp.value = pre_timestamp
    } else {
      finished.value = true
    }
  })
}

function onRefresh() {
  const params = {
    channel_id: props.channel_id,
    timestamp: timestamp.value || Date.now(),
    with_top: 1
  }
  homeService.articles(params).then(res => {
    const {results} = res.data
    articleList.unshift(...results)
    Toast.success(`更新了\n${results.length}条数据`)
    isRefreshLoading.value = false
    refreshSuccessText.value = `更新完成！`
  })
}

const timeStr = (str) => {
  return str.substr(0, 10)
}
</script>

<style scoped lang="scss">
::v-deep {
  .van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
}

.article-item-label {
  margin-right: 5px;
}

.cover-left-img {
  width: 116px;
  height: 73px;
}

.article-list {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}

.cover-wrap {
  margin-bottom: 5px;

  .cover-wrap-item {
    display: flex;

    .van-image {
      margin-right: 5px;

      img {
        border-radius: 3px;
      }
    }
  }
}
</style>