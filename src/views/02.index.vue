<template>
  <div class="index-container">
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discovery">
            <span class="iconfont icon-music-list"
              ><i class="icon icon-bofangduilie"></i></span
            >发现音乐</router-link
          >
        </li>
        <li>
          <router-link to="/playlists">
            <span class="iconfont icon-music-list"
              ><i class="icon icon-bofangliebiao"></i></span
            >推荐歌单</router-link
          >
        </li>
        <li>
          <router-link to="/Songs">
            <span class="iconfont icon-music"
              ><i class="icon icon-yinleguan"></i></span
            >最新音乐</router-link
          >
        </li>
        <li>
          <router-link to="/MVs">
            <span class="iconfont icon-music-list"
              ><i class="icon icon-bofangMV"></i></span
            >最新MV</router-link
          >
        </li>
      </ul>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="player">
      <audio id="music" :src="musicUrl" autoplay controls></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      musicUrl: "",
    };
  },
};
</script>

<style scoped>
</style>