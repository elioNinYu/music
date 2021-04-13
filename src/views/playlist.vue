<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title">{{ playlist.name }}</p>
        <!-- v-if中的内容不能少否则报错 -->
        <!-- 之前都是写在img元素中后来发现nickname也需要v-if语句于是直接放在父元素里 -->
        <div class="author-wrap" v-if="playlist.creator !== undefined">
          <img :src="playlist.creator.avatarUrl" alt="" class="avatar" />
          <span class="name">{{ playlist.creator.nickname }}</span>
          <span class="time">{{ playlist.createTime | dateFormat }}创建</span>
        </div>
        <div class="play-wrap" @click="playAll()">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签：</span>
          <ul>
            <li v-for="(item, index) in playlist.tags" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介：</span>
          <span class="desc">{{ playlist.description }}</span>
        </div>
      </div>
    </div>
    <!-- <el-tabs v-model="activeIndex"> -->
    <el-tabs>
      <el-tab-pane label="歌曲列表">
        <table class="el-table playlist-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in playlist.tracks"
              :key="index"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="img-wrap" @click="playMusic(item.id)">
                  <img :src="item.al.picUrl" alt="" />
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <span
                      v-if="item.mv !== 0"
                      class="iconfont icon-mv"
                      @click="toMV(item.mv)"
                    ></span>
                  </div>
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt | playTimeFormat }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane :label="`评论(${total})`">
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
                  <span class="comment">：{{ item.content }}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length !== 0">
                  <span class="name">{{
                    item.beReplied[0].user.nickname
                  }}</span>
                  <span class="comment">：{{ item.beReplied[0].content }}</span>
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
                  <span class="comment">：{{ item.content }}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length !== 0">
                  <span class="name">{{
                    item.beReplied[0].user.nickname
                  }}</span>
                  <span class="comment">：{{ item.beReplied[0].content }}</span>
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
            

<script>
// import axios from "axios";
export default {
  name: "playlist",
  data() {
    return {
      id: "",
      activeIndex: "1",
      // 总条数
      total: 0,
      // 页码
      pageNum: 1,
      pageSize: 10,

      playlist: {},
      hotComments: [],
      comments: [],
    };
  },
  created() {
    this.$http({
      method: "get",
      url: "playlist/detail",
      params: {
        id: this.$route.query.id,
      },
    }).then((res) => (this.playlist = res.data.playlist));
    this.$http({
      method: "get",
      url: "comment/hot",
      params: {
        id: this.$route.query.id,
        type: 2,
      },
    }).then((res) => {
      this.hotComments = res.data.hotComments;
      this.total = res.data.total;
    });
    this.$http({
      method: "get",
      url: "comment/playlist",
      params: {
        id: this.$route.query.id,
        limit: this.pageSize,
        offset: (this.pageNum - 1) * this.pageSize,
      },
    }).then((res) => {
      this.total = res.data.total;
      this.comments = res.data.comments;
    });
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNum = val;
    },
    playMusic(id) {
      this.$http({
        method: "get",
        url: "song/url",
        params: {
          id,
        },
      }).then((res) => (this.$parent.musicUrl = res.data.data[0].url));
    },
    playAll() {},
    toMV(id) {
      this.$router.push(`/mv?id=${id}`);
    },
  },
};
</script>

<style>
</style>