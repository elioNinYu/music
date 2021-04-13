<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel :interval="3000" type="card">
      <!-- 循环获取到的数据 -->
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" srcset="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title" @click="toPlaylists()">推荐歌单</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in playLists" :key="index">
          <div class="img-wrap" @click="toPlaylist(item.id)">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl + '?param=200y200'" alt="" />
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title" @click="toSongs()">最新音乐</h3>
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in songs"
          :key="index"
          @click="playMusic(item.id)"
        >
          <div class="img-wrap">
            <img :src="item.picUrl + '?param=130y130'" alt="" />
          </div>
          <div class="song-wrap">
            <div class="song-name">{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title" @click="toMVs()">推荐MV</h3>
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in mvs"
          :key="index"
          @click="toMv(item.id)"
        >
          <div class="img-wrap">
            <img :src="item.picUrl + '?param=250y150'" alt="" />

            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Discovery",
  data() {
    return {
      banners: [],
      playLists: [],
      songs: {},
      mvs: [],
    };
  },
  created() {
    //轮播图
    this.getBanner();
    //推荐歌单
    this.getPersonalizedPlaylist();
    // 最新音乐
    this.getPersonalizedNewsong();
    // 最新MV
    this.getPersonalizedMv();
  },
  methods: {
    //获取轮播图
    getBanner() {
      this.$http({
        method: "get",
        url: "banner",
      }).then((res) => (this.banners = res.data.banners));
    },
    //获取推荐歌单
    getPersonalizedPlaylist() {
      this.$http({
        method: "get",
        url: "personalized",
        params: {
          //默认30
          limit: 10,
        },
      }).then((res) => (this.playLists = res.data.result));
    },
    //获取最新音乐
    getPersonalizedNewsong() {
      this.$http({
        method: "get",
        url: "personalized/newsong",
        params: {},
      })
        // .then((res) => console.log(res));
        .then((res) => (this.songs = res.data.result));
    },
    //获取推荐MV
    getPersonalizedMv() {
      this.$http({
        method: "get",
        url: "personalized/mv",
      }).then((res) => (this.mvs = res.data.result));
    },

    //
    playMusic(id) {
      this.$http({
        method: "get",
        url: "https://autumnfish.cn/song/url",
        params: {
          id,
        },
      }).then((res) => (this.$parent.musicUrl = res.data.data[0].url));
    },
    toPlaylists() {
      this.$router.push({ name: "Playlists" });
    },
    toSongs() {
      this.$router.push({ name: "Songs" });
    },
    toMVs() {
      this.$router.push({ name: "MVs" });
    },
    toPlaylist(id) {
      this.$router.push(`/playlist?id=${id}`);
    },
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },
  },
};
</script>

<style scoped>
</style>