<template>
  <div>
    <!--  积分和宝箱兑换说明  -->
    <Points2TreasureChest />
    <!-- 计算轮次 -->
    <CalculationRounds />
    <!-- 目标轮次规划 -->
    <TargetRounds />
    <!-- 页脚 -->
    <footer class="text-center text-gray-500 text-sm">
      <p>咸鱼之王宝箱计算器 | 数据仅供参考</p>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { useHead } from "#app";

// 使用useHead配置头部
useHead({
  // 基础元信息
  title: "咸鱼之王宝箱计算器 | 栾媛",
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
      content: "咸鱼之王宝箱计算器,咸鱼之王宝箱计算,咸鱼之王计算器,咸鱼宝箱计算,咸鱼宝箱计算器,JSON与XML转换",
    },
    // 描述优化（突出服务价值，控制在160字符内）
    {
      hid: "description",
      name: "description",
      content: "咸鱼之王宝箱计算器根据实际数量计算宝箱活动轮数，宝箱周可以做几轮宝箱",
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
});
</script>