<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title" :keywords="(keywords = $route.query.t)">
        {{ $route.query.t }}
      </h2>
      <span class="sub-title">找到{{ count }}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in songs"
              :key="index"
              @dblclick="playMusic(item.id)"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <span
                      v-if="item.mvid !== 0"
                      class="iconfont icon-mv"
                    ></span>
                  </div>
                  <span v-if="item.alias.length !== 0">{{
                    item.alias[0]
                  }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration | playTimeFormat }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in playlists"
            :key="index"
            @click="toPlaylist(item.id)"
          >
            <div class="img-wrap">
              <div class="num-wrap">
                播放量：
                <span class="num">{{ item.playCount | playNumFormat }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div
            class="item"
            v-for="(item, index) in mvs"
            :key="index"
            @click="toMV(item.id)"
          >
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
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
      </el-tab-pane>
    </el-tabs>
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
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 10,
      keywords: "",
      activeIndex: "songs",
      songs: [],
      count: 0,
      playlists: [],
      mvs: [],
      songId: 0,
      type: 1,
    };
  },
  watch: {
    // keywords() {
    //   this.toSearch();
    // },
    activeIndex() {
      switch (this.activeIndex) {
        case "songs":
          this.type = 1;
          this.pageNum = 1;
          break;
        case "lists":
          this.type = 1000;
          this.pageNum = 1;
          break;
        case "mv":
          this.type = 1004;
          this.pageNum = 1;
          break;
        default:
          break;
      }
      this.toSearch();
    },
  },
  created() {
    this.$http({
      method: "get",
      url: "search",
      params: {
        keywords: this.$route.query.t,
        type: 1,
        limit: 10,
      },
    }).then((res) => {
      // console.log(res);
      this.songs = res.data.result.songs;
      this.count = res.data.result.songCount;
    });
  },
  methods: {
    getMusicUrl(id) {},
    handleCurrentChange(val) {
      this.pageNum = val;
      // this.toSearch();
    },
    toSearch() {
      this.$http({
        method: "get",
        url: "search",
        params: {
          keywords: this.$route.query.t,
          type: this.type,
          limit: 10,
        },
      }).then((res) => {
        // console.log(res);
        if (this.type === 1) {
          this.songs = res.data.result.songs;
          this.count = res.data.result.songCount;
        } else if (this.type === 1000) {
          this.playlists = res.data.result.playlists;
          this.count = res.data.result.playlistCount;
        } else if (this.type === 1004) {
          this.mvs = res.data.result.mvs;
          this.count = res.data.result.mvCount;
        }
        this.total = this.count;
      });
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
    toPlaylist(id) {
      this.$router.push(`/playlist?id=${id}`);
    },
    toMV(id) {
      this.$router.push(`/mv?id=${id}`);
    },
  },
};
</script>

<style scoped>
</style>