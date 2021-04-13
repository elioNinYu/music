<template>
  <div class="playlists-container">
    <div class="top-card">
      <div class="icon-wrap">
        <img :src="topPlaylists.coverImgUrl + '?param=200y200'" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">最受欢迎歌单Top</div>
        <div class="title">{{ topPlaylists.name }}</div>
        <div class="info">
          {{ topPlaylists.description }}
        </div>
      </div>
      <img :src="topPlaylists.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <div class="tab-bar">
        <span
          class="item"
          @click="tag = '全部'"
          :class="{ active: tag === '全部' }"
          >全部</span
        >
        <span
          class="item"
          @click="tag = '欧美'"
          :class="{ active: tag === '欧美' }"
          >欧美</span
        >
        <span
          class="item"
          @click="tag = '华语'"
          :class="{ active: tag === '华语' }"
          >华语</span
        >
        <span
          class="item"
          @click="tag = '流行'"
          :class="{ active: tag === '流行' }"
          >流行</span
        >
        <span
          class="item"
          @click="tag = '说唱'"
          :class="{ active: tag === '说唱' }"
          >说唱</span
        >
        <span
          class="item"
          @click="tag = '摇滚'"
          :class="{ active: tag === '摇滚' }"
          >摇滚</span
        >
        <span
          class="item"
          @click="tag = '民谣'"
          :class="{ active: tag === '民谣' }"
          >民谣</span
        >
        <span
          class="item"
          @click="tag = '电子'"
          :class="{ active: tag === '电子' }"
          >电子</span
        >
        <span
          class="item"
          @click="tag = '轻音乐'"
          :class="{ active: tag === '轻音乐' }"
          >轻音乐</span
        >
        <span
          class="item"
          @click="tag = '影视原声'"
          :class="{ active: tag === '影视原声' }"
          >影视原声</span
        >
        <span
          class="item"
          @click="tag = 'ACG'"
          :class="{ active: tag === 'ACG' }"
          >ACG</span
        >
        <span
          class="item"
          @click="tag = '怀旧'"
          :class="{ active: tag === '怀旧' }"
          >怀旧</span
        >
        <span
          class="item"
          @click="tag = '治愈'"
          :class="{ active: tag === '治愈' }"
          >治愈</span
        >
        <span
          class="item"
          @click="tag = '旅行'"
          :class="{ active: tag === '旅行' }"
          >旅行</span
        >
      </div>
      <div class="tab-content">
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in playlists"
            :key="index"
            @click="toPlaylist(item.id)"
          >
            <div class="img-wrap">
              <div class="num-wrap">
                播放量：<span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl + '?param=200y200'" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="10"
    >
    </el-pagination>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "recommend",
  data() {
    return {
      total: 0,
      page: 1,
      topPlaylists: {},
      playlists: [],
      //当前选择的类，默认为全部
      tag: "全部",
    };
  },

  watch: {
    // 监听tag，当改变时同时改变整个页面
    tag() {
      // 获取顶部最受欢迎歌单
      this.topData();
      //歌单列表
      this.listData();
      this.page = 1; //当切换cat时使页面重新回到第一页
    },
  },
  created() {
    this.topData();
    this.listData();
  },
  methods: {
    // 获取顶部最受欢迎歌单
    topData() {
      this.$http({
        method: "get",
        url: "top/playlist/highquality",
        params: {
          limit: 10,
          cat: this.tag,
        },
      }).then((res) => (this.topPlaylists = res.data.playlists[0]));
    },
    //歌单列表
    listData() {
      this.$http({
        method: "get",
        url: "top/playlist",
        params: {
          limit: 10,
          offset: (this.page - 1) * 10, //获取当前页面
          cat: this.tag,
        },
      }).then((res) => {
        // console.log(res);
        this.total = res.data.total;
        this.playlists = res.data.playlists;
      });
    },
    // 页码改变事件
    handleCurrentChange(val) {
      this.page = val;
      this.listData();
    },
    toPlaylist(id) {
      this.$router.push(`/playlist?id=${id}`);
    },
  },
};
</script>

<style>
</style>