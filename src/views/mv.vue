<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">MV详情</h3>
      <div class="video-wrap">
        <video :src="url" controls></video>
      </div>
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="icon" alt="" />
          </div>
          <span class="name">{{ mvInfo.artistName }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ mvInfo.name }}</h2>
          <span class="date">发布：{{ mvInfo.publishTime }}</span>
          <span class="number">播放： {{ mvInfo.playCount }}次</span>
          <p class="desc">{{ mvInfo.desc }}</p>
        </div>
      </div>
      <div
        class="comment-wrap"
        v-if="hotComments !== undefined && hotComments.length !== 0"
      >
        <p class="title">
          精彩评论<span class="number">({{ hotComments.length }})</span>
        </p>
        <div class="comments-wrap">
          <div class="item" v-for="(item, index) in hotComments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}</span>
                <span class="comment">:{{ item.content }}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length !== 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}</span>
                <span class="comment">:{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time | dateFormat }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="comment-wrap">
        <p class="title">
          最新评论<span class="number">({{ total }})</span>
        </p>
        <div class="comments-wrap">
          <div class="item" v-for="(item, index) in comments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}</span>
                <span class="commenr">:{{ item.content }}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length !== 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}</span>
                <span class="comment">:{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time | dateFormat }}</div>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="pageNum"
        :page-size="pageSize"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in simiMvs"
            :key="index"
            @click="toPlayMv(item.id)"
          >
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <div class="num-wrap">
                <div class="num">{{ item.playCount | playNumFormat }}</div>
              </div>
              <span class="time">{{ item.duration | playTimeFormat }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "mv",
  data() {
    return {
      id: "",
      total: 20,
      pageNum: 1,
      pageSize: 10,
      url: "",
      mvInfo: {},
      simiMvs: [],
      icon: "",
      hotComments: [],
      comments: [],
    };
  },
  created() {
    this.getMvUrl();
    this.getSimiMv();
    this.getMvDetail();
    this.getMvComments();
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getMvComments();
    },
    //获取歌手信息
    getArtistDetail() {
      this.$http({
        method: "get",
        url: "artists",
        params: {
          id: this.mvInfo.artists[0].id,
        },
      }).then((res) => (this.icon = res.data.artist.picUrl));
    },
    //获取mv播放地址
    getMvUrl() {
      this.$http({
        method: "get",
        url: "mv/url",
        params: {
          id: this.$route.query.id,
        },
      }).then((res) => (this.url = res.data.data.url));
    },
    //获取相关mv
    getSimiMv() {
      this.$http({
        method: "get",
        url: "simi/mv",
        params: {
          mvid: this.$route.query.id,
        },
      }).then((res) => (this.simiMvs = res.data.mvs));
    },
    //获取mv详情
    getMvDetail() {
      this.$http({
        method: "get",
        url: "mv/detail",
        params: {
          mvid: this.$route.query.id,
        },
      }).then((res) => {
        //   console.log(res);
        this.mvInfo = res.data.data;
        this.getArtistDetail();
      });
    },
    //获取mv评论（精选和普通）
    getMvComments() {
      this.$http({
        method: "get",
        url: "comment/mv",
        params: {
          id: this.$route.query.id,
          limit: 20,
          offset: (this.pageNum - 1) * this.pageSize,
        },
      }).then((res) => {
        this.hotComments = res.data.hotComments;
        this.total = res.data.total;
        this.comments = res.data.comments;
      });
    },
    toPlayMv(id) {
      this.pageNum = 1;
      this.id = id;
      this.getMvUrl();
      this.getMvDetail();
      this.getSimiMv();
      this.getMvComments();
    },
  },
};
</script>

<style>
</style>