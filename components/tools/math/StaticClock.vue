<template>
    <div class="static-clock">
      <svg :viewBox="viewBox" :width="size" :height="size" xmlns="http://www.w3.org/2000/svg">
        <!-- 时钟背景 -->
        <circle cx="50%" cy="50%" :r="radius" :fill="backgroundColor" :stroke="borderColor" :stroke-width="borderWidth" />
        
        <!-- 时钟刻度 -->
        <g v-for="i in 60" :key="i">
          <line
            :x1="centerX + (radius - 10) * Math.cos((i * 6 - 90) * Math.PI / 180)"
            :y1="centerY + (radius - 10) * Math.sin((i * 6 - 90) * Math.PI / 180)"
            :x2="centerX + radius * Math.cos((i * 6 - 90) * Math.PI / 180)"
            :y2="centerY + radius * Math.sin((i * 6 - 90) * Math.PI / 180)"
            :stroke="i % 5 === 0 ? hourMarkerColor : minuteMarkerColor"
            :stroke-width="i % 5 === 0 ? 2 : 1"
          />
        </g>
        
        <!-- 时针 -->
        <line
          :x1="centerX"
          :y1="centerY"
          :x2="centerX + hourHandLength * Math.cos(hourAngle * Math.PI / 180)"
          :y2="centerY + hourHandLength * Math.sin(hourAngle * Math.PI / 180)"
          :stroke="hourHandColor"
          :stroke-width="hourHandWidth"
          :stroke-linecap="'round'"
        />
        
        <!-- 分针 -->
        <line
          :x1="centerX"
          :y1="centerY"
          :x2="centerX + minuteHandLength * Math.cos(minuteAngle * Math.PI / 180)"
          :y2="centerY + minuteHandLength * Math.sin(minuteAngle * Math.PI / 180)"
          :stroke="minuteHandColor"
          :stroke-width="minuteHandWidth"
          :stroke-linecap="'round'"
        />
        
        <!-- 秒针 -->
        <line
          v-if="showSeconds"
          :x1="centerX"
          :y1="centerY"
          :x2="centerX + secondHandLength * Math.cos(secondAngle * Math.PI / 180)"
          :y2="centerY + secondHandLength * Math.sin(secondAngle * Math.PI / 180)"
          :stroke="secondHandColor"
          :stroke-width="secondHandWidth"
          :stroke-linecap="'round'"
        />
        
        <!-- 中心圆点 -->
        <circle cx="50%" cy="50%" :r="centerDotRadius" :fill="centerDotColor" />
        
        <!-- 可选的时钟数字 -->
        <g v-if="showNumbers">
          <text
            v-for="i in 12"
            :key="i"
            :x="centerX + (radius - 25) * Math.cos((i * 30 - 90) * Math.PI / 180)"
            :y="centerY + (radius - 25) * Math.sin((i * 30 - 90) * Math.PI / 180) + 8"
            :text-anchor="'middle'"
            :fill="textColor"
            :font-size="fontSize"
            :font-family="fontFamily"
          >{{ i }}</text>
        </g>
      </svg>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'StaticClock'
  });
  </script>
  
  <script setup lang="ts">
  import { computed, defineProps } from 'vue';
  import type { PropType } from 'vue';
  
  interface Time {
    hours: number;
    minutes: number;
    seconds?: number;
  }
  
  interface Props {
    time: Time;
    size?: number;
    showSeconds?: boolean;
    showNumbers?: boolean;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    hourHandColor?: string;
    minuteHandColor?: string;
    secondHandColor?: string;
    hourHandWidth?: number;
    minuteHandWidth?: number;
    secondHandWidth?: number;
    hourMarkerColor?: string;
    minuteMarkerColor?: string;
    centerDotColor?: string;
    centerDotRadius?: number;
    textColor?: string;
    fontFamily?: string;
    fontSize?: number;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    size: 200,
    showSeconds: true,
    showNumbers: true,
    backgroundColor: '#ffffff',
    borderColor: '#333333',
    borderWidth: 2,
    hourHandColor: '#333333',
    minuteHandColor: '#333333',
    secondHandColor: '#ff0000',
    hourHandWidth: 5,
    minuteHandWidth: 3,
    secondHandWidth: 2,
    hourMarkerColor: '#333333',
    minuteMarkerColor: '#cccccc',
    centerDotColor: '#333333',
    centerDotRadius: 5,
    textColor: '#333333',
    fontFamily: 'Arial, sans-serif',
    fontSize: 16,
  });
  
  const centerX = computed(() => props.size / 2);
  const centerY = computed(() => props.size / 2);
  const radius = computed(() => props.size / 2 - props.borderWidth);
  const viewBox = computed(() => `0 0 ${props.size} ${props.size}`);
  
  // 计算时针角度 (0-360度)
  const hourAngle = computed(() => {
    const hours = props.time.hours % 12;
    const minutes = props.time.minutes;
    return 30 * hours + 0.5 * minutes - 90; // 每个小时30度，每分钟0.5度
  });
  
  // 计算分针角度 (0-360度)
  const minuteAngle = computed(() => {
    const minutes = props.time.minutes;
    const seconds = props.time.seconds || 0;
    return 6 * minutes + 0.1 * seconds - 90; // 每分钟6度，每秒0.1度
  });
  
  // 计算秒针角度 (0-360度)
  const secondAngle = computed(() => {
    const seconds = props.time.seconds || 0;
    return 6 * seconds - 90; // 每秒6度
  });
  
  // 计算指针长度
  const hourHandLength = computed(() => radius.value * 0.5);
  const minuteHandLength = computed(() => radius.value * 0.7);
  const secondHandLength = computed(() => radius.value * 0.8);
  </script>
  
  <style scoped>
  .static-clock {
    display: inline-block;
    margin: 10px;
  }
  </style>