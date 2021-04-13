<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="section-wrap">
        <span class="section-type">地区：</span>
        <ul class="tabs-type">
          <li class="tab">
            <span
              class="title"
              @click="area = '全部'"
              :class="{ active: area === '全部' }"
              >全部</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="area = '内地'"
              :class="{ active: area === '内地' }"
              >内地</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="area = '港台'"
              :class="{ active: area === '港台' }"
              >港台</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="area = '欧美'"
              :class="{ active: area === '欧美' }"
              >欧美</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="area = '日本'"
              :class="{ active: area === '日本' }"
              >日本</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="area = '韩国'"
              :class="{ active: area === '韩国' }"
              >韩国</span
            >
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型：</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              @click="type = '全部'"
              :class="{ active: type === '全部' }"
              >全部</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="type = '官方版'"
              :class="{ active: type === '官方版' }"
              >官方版</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="type = '原声'"
              :class="{ active: type === '原声' }"
              >原声</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="type = '现场版'"
              :class="{ active: type === '现场版' }"
              >现场版</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="type = '网易出品'"
              :class="{ active: type === '网易出品' }"
              >网易出品</span
            >
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-wrap">排序：</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              @click="order = '上升最快'"
              :class="{ active: order === '上升最快' }"
              >上升最快</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="order = '最热'"
              :class="{ active: order === '最热' }"
              >最热</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              @click="order = '最新'"
              :class="{ active: order === '最新' }"
              >最新</span
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <div class="mvs">
      <div class="items">
        <div
          class="item"
          @click="toMV(item.id)"
          v-for="(item, index) in mvs"
          :key="index"
        >
          <div class="img-wrap">
            <img :src="item.cover" alt="" />
            <div class="num-wrap">
              <div class="icon icon-play"></div>
              <div class="num">{{ item.playCount | playNumFormat }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="5"
        :limit="limit"
      >
      </el-pagination>
    </div>
  </div>
</template>
            

<script>
// import axios from "axios";
export default {
  name: "MVs",
  data() {
    return {
      total: 20,
      page: 1,
      area: "全部", //地区
      type: "全部", //类型
      order: "上升最快", //排序
      limit: 8, //取出数量
      offset: 0, //偏移量
      mvs: [],
    };
  },
  watch: {
    area() {
      this.page = 1;
      this.getmvs();
    },
    type() {
      this.page = 1;
      this.getmvs();
    },
    order() {
      this.page = 1;
      this.getmvs();
    },
  },
  created() {
    this.getmvs();
  },
  methods: {
    getmvs() {
      this.$http({
        method: "get",
        url: "mv/all",
        params: {
          area: this.area,
          type: this.type,
          order: this.order,
          limit: this.limit,
          offset: (this.page - 1) * this.limit,
        },
      }).then((res) => {
        // console.log(res);
        this.mvs = res.data.data;
        // 获取页码
        if (res.data.count) {
          this.total = res.data.count;
        }
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getmvs();
    },
    toMV(id) {
      this.$router.push(`/mv?id=${id}`);
    },
  },
};
</script>

<style>
</style>