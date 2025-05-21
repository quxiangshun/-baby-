<template>
  <LyHome />
  <el-row v-if="isJsonRootPage" :gutter="16">
    <el-col
        v-for="(tool, index) in toolList"
        :key="index"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="4"
    >
      <el-card class="mb-5 cursor-pointer" @click="navigateToTool(tool.url)">
        <div>{{ tool.name }}</div>
      </el-card>
    </el-col>
  </el-row>
  <NuxtPage/>
</template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router' // 引入路由钩子
  import { useHead } from "#app";

  const route = useRoute() // 获取当前路由对象
  const router = useRouter() // 获取路由实例

  // 计算属性：判断是否为主页（路径为 '/'）
  const isJsonRootPage = computed(() => {
    return route.path === '/format'
  })

  // 定义页面数据
  const toolList = ref([
    { name: "JS压缩、格式化", icon: "", url: "/json/analyze" },
    { name: "JS混淆加密", icon: "", url: "" },
    { name: "CSS压缩、格式化", icon: "", url: "" }
  ])

  // 导航函数
  const navigateToTool = url => {
    if (url) {
      router.push(url) // 使用路由方法跳转
    }
  }

  // 使用useHead配置头部
  useHead({
    // 基础元信息
    title: "JSON在线解析 | 栾媛",
    htmlAttrs: {
      lang: "zh-CN", // 设置语言属性（必填）
      dir: "ltr", // 文字方向（默认左到右）
    },
    meta: [
      // 视口设置（保留原始配置）
      {
        hid: "viewport",
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0",
      },
      // 关键词优化（合并重复项，使用英文逗号分隔）
      {
        hid: "keywords",
        name: "keywords",
        content: "JSON在线解析,JSON格式化,JSON验证,JSON压缩,JSON工具,JSON与XML转换",
      },
      // 描述优化（突出服务价值，控制在160字符内）
      {
        hid: "description",
        name: "description",
        content: "JSON中文网提供专业JSON在线解析、格式化、验证、压缩服务，支持JSON与XML相互转换，助力开发者高效处理数据，提升开发效率。",
      },
      // 其他SEO标签（可选）
      { name: "author", content: "屈想顺" },
      { name: "robots", content: "index, follow" }, // 搜索引擎抓取策略
      { httpEquiv: "Cache-Control", content: "no-cache, no-store, must-revalidate" }, // 缓存控制
    ],
    link: [
      // Favicon（建议使用静态资源路径，假设/favicon.ico位于public目录）
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico", // 保持原路径结构或调整至public
      }
    ],
    script: [
      // 百度统计（异步加载，避免阻塞渲染）
      {
        src: "https://hm.baidu.com/hm.js?1d6c34c1bc067f5746a5fca18d1c24ab",
        async: true,
        type: "text/javascript",
      },
      // Google Analytics（使用gtag.js，建议通过Nuxt插件配置）
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-TP0T64WC2D",
        async: true,
        body: true, // 插入到body底部
        onload: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag("js", new Date()); gtag("config", "G-TP0T64WC2D");`,
      },
      // 广告脚本（异步加载）
      {
        src: "https://cdn.wwads.cn/js/makemoney.js",
        async: true,
        type: "text/javascript",
      },
    ],
    style: [
      // JSON语法高亮样式
      {
        hid: "json-styles",
        type: "text/css",
        children: `
          .json_key{ color: #92278f;font-weight:bold; }
          .json_null{ color: #f1592a;font-weight:bold; }
          .json_string{ color: #3ab54a;font-weight:bold; }
          .json_number{ color: #25aae2;font-weight:bold; }
          .json_boolean{ color: #f98280;font-weight:bold; }
          .json_link{ color: #61D2D6;font-weight:bold; }
          .json_nbsp{ letter-spacing: 4px; }
          .json_array_brackets{}
        `,
      }
    ],
  });
  </script>
  
  <style scoped>
  /* 添加鼠标指针样式 */
  .cursor-pointer {
    cursor: pointer;
  }
  </style>