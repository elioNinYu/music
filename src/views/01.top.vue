<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span class="iconfont icon-home" @click="toHomeClick()"
          ><i class="iconfont icon-home-selected"></i
        ></span>
        <span
          class="iconfont icon-full-screen"
          @click="getFullCreeen(btnStatus)"
          ><i class="iconfont icon-quanping1"></i
        ></span>
      </div>
    </div>
    <!-- 搜索框 -->
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <div class="top">
          <input
            class="el-input__inner"
            type="text"
            autocomplete="off"
            placeholder="搜索"
            v-model="inputValue"
            @keyup.enter="toSearch"
            clearable
          />
          <span class="el-input__prefix">
            <i class="el-input__icon el-icon-search"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "name",
  data() {
    return {
      query: "",
      inputValue: "",
      n: 0,
      btnStatus: 0,
    };
  },
  methods: {
    toHomeClick() {
      if ("/discovery" === this.$route.path) {
        return;
      }
      this.$router.push(`/discovery`);
    },
    toSearch() {
      if (this.inputValue == "") {
        this.$message.warning("请输入内容");
      } else {
        //携带数据搜索
        this.$router.push(`/result?t=${this.inputValue}`);
      }
    },
    getFullCreeen(btnStatus) {
      this.btnStatus = this.btnStatus === 0 ? 1 : 0;
      this.n++;
      this.n % 2 == 0
        ? this.outFullCreeen(document)
        : this.inFullCreeen(document.documentElement);
    },

    inFullCreeen(element) {
      let el = element;
      let rfs =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;
      if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
      } else if (typeof window.ActiveXObject != "undefined") {
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
    outFullCreeen(element) {
      let el = element;
      let cfs =
        el.cancelFullScreen ||
        el.webkitCancelFullScreen ||
        el.mozCancelFullScreen ||
        el.exitFullScreen;
      if (typeof cfs != "undefined" && cfs) {
        cfs.call(el);
      } else if (typeof window.ActiveXObject != "undefined") {
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
  },
};
</script>

<style scoped>
</style>