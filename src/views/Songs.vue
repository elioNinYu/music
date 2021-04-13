<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" :class="{ active: tag === 0 }" @click="tag = 0"
        >全部</span
      >
      <span class="item" :class="{ active: tag === 7 }" @click="tag = 7"
        >华语</span
      >
      <span class="item" :class="{ active: tag === 96 }" @click="tag = 96"
        >欧美</span
      >
      <span class="item" :class="{ active: tag === 8 }" @click="tag = 8"
        >日本</span
      >
      <span class="item" :class="{ active: tag === 16 }" @click="tag = 16"
        >韩国</span
      >
    </div>
    <table class="el-table playlist-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr class="er-table__row" v-for="(item, index) in songs" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap" @click="playMusic(item.id)">
              <img :src="item.album.picUrl" alt="" />
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span
                  class="iconfont icon-mv"
                  v-if="item.mvid !== 0"
                  @click="toMv(item.id)"
                ></span>
              </div>
            </div>
          </td>
          <td>{{ item.album.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration | playTimeFormat }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import this.$http from "axios";
export default {
  name: "songs",
  data() {
    return {
      songs: [],
      tag: "0",
    };
  },
  created() {
    this.getList();
  },
  watch: {
    tag() {
      this.getList();
    },
  },
  methods: {
    async getList() {
      await this.$http({
        method: "post",
        url: "top/song",
        params: {
          type: this.tag,
        },
      }).then((res) => {
        // console.log(res);
        this.songs = res.data.data.slice(0, 50);
      });
    },
    playMusic(id) {
      this.$http({
        method: "get",
        url: "song/url",
        data: {
          id,
        },
      }).then((res) => {
        this.$parent.musicUrl = res.data.data[0].url;
      });
    },
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },
  },
};
</script>

<style>
</style>