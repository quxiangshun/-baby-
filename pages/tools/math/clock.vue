<script setup>
import {ref} from 'vue';
import useMobile from "@/store/useMobile";
import {storeToRefs} from "pinia";

const mobileStore = useMobile();
const { activeIndex } = storeToRefs(mobileStore);

// 定义响应式数据
const questionCount = ref(9); // 题目总数
const difficulty = ref('easy'); // 难度级别: easy, medium, hard

const staticClocks = ref([]);
const questions = ref([]);

// 生成随机时间
const generateStaticClocks = () => {
  staticClocks.value = [];
  staticClocks.value = Array.from({length: questionCount.value}, () => ({
    time: {
      hours: Math.floor(Math.random() * 12),
      minutes: Math.floor(Math.random() * 60),
      seconds: Math.floor(Math.random() * 60)
    },
    backgroundColor: '#f0f0f0',
    hourHandColor: '#2c3e50',
    minuteHandColor: '#2c3e50',
    secondHandColor: '#e74c3c',
    showNumbers: false
  }));
};

const generateRandomTime = () => {
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.floor(Math.random() * 12) * 5; // 只生成0,5,10,15...55
  return { hours, minutes };
};

// 生成单个时钟题目
// 新增时钟表盘组件
const ClockFace = {
  template: `
    <div class="clock-face">
      <div class="clock-center"></div>
  </div>
      <div class="hour-hand" :style="hourHandStyle"></div>
      <div class="minute-hand" :style="minuteHandStyle"></div>
      <div class="numbers">
        <span v-for="n in 12" :key="n" :style="getNumberStyle(n)">{{ n }}</span>
      </div>
  `,
  props: ['hours', 'minutes'],
  computed: {
    hourHandStyle() {
      return {
        transform: `rotate(${this.hours * 30 + this.minutes * 0.5}deg)`
      };
    },
    minuteHandStyle() {
      return {
        transform: `rotate(${this.minutes * 6}deg)`
      };
    }
  },
  methods: {
    getNumberStyle(n) {
      const angle = n * 30;
      return {
        transform: `rotate(${-angle}deg) translateY(-100px) rotate(${angle}deg)`
      };
    }
  }
};

// 新增答题功能
const userAnswer = ref('');
const showAnswer = ref(false);
const showNumbers = ref(true);
const showSeconds = ref(false);
const currentClockTime = ref({ hours: 0, minutes: 0 });

const checkAnswer = () => {
  const [hours, minutes] = userAnswer.value.split(':').map(Number);
  showAnswer.value = true;
  return hours === currentClockTime.value.hours && 
         minutes === currentClockTime.value.minutes;
};

// 修改生成题目方法
const generateSingleQuestion = () => {
  const { hours, minutes } = generateRandomTime();
  currentClockTime.value = { hours, minutes };
  
  switch(difficulty.value) {
    case 'easy':
      return {
        type: 'draw',
        question: `请画出 ${hours}:${minutes.toString().padStart(2, '0')} 的时钟`,
        answer: `${hours}:${minutes.toString().padStart(2, '0')}`,
        showClock: true
      };
    case 'medium':
      return {
        type: 'read',
        question: `请写出时钟显示的时间`,
        answer: `${hours}:${minutes.toString().padStart(2, '0')}`,
        showClock: true
      };
    case 'hard':
      return {
        type: 'calculate',
        question: `现在是 ${hours}:${minutes.toString().padStart(2, '0')}，请问3小时后是几点几分？`,
        answer: `${(hours + 3) % 12}:${minutes.toString().padStart(2, '0')}`,
        showClock: true
      };
    default:
      return {
        type: 'read',
        question: `请写出时钟显示的时间`,
        answer: `${hours}:${minutes.toString().padStart(2, '0')}`,
        showClock: true
      };
  }
};

// 生成题目
const generateQuestions = () => {
  generateStaticClocks();
  questions.value = [];
  for (let i = 0; i < questionCount.value; i++) {
    questions.value.push(generateSingleQuestion());
  }
};

// 打印题目
const printQuestions = () => {
  const printAreas = Array.from(document.querySelectorAll('.print-area'));
  const printContents = printAreas.map(el => el.innerHTML).join('');
  const originalContents = document.body.innerHTML;

  // 添加打印专用样式
  const printStyle = document.createElement('style');
  printStyle.innerHTML = `
    @media print {
      body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 1cm;
        box-sizing: border-box;
      }

      .grid {
        display: grid !important;
        grid-gap: 1rem !important;
      }

      /* 明确设置三列布局 */
      .md\\:grid-cols-3 {
        grid-template-columns: repeat(3, 1fr) !important;
      }

      .clock-container {
        transform: scale(0.7);
        margin: 0 auto;
      }

      /* 确保时钟元素适合打印 */
      .clock-face {
        width: 150px !important;
        height: 150px !important;
      }

      .hour-hand {
        width: 40px !important;
      }

      .minute-hand {
        width: 60px !important;
      }

      @page {
        size: A4;
        margin: 1cm;
      }
    }
  `;

  const printWindow = window.open('', '_blank');
  printWindow.document.open();
  printWindow.document.write(`
    <html>
      <head>
        <title>栾媛时钟练习题</title>
        ${printStyle.outerHTML}
      </head>
      <body>
        ${printContents}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};

onMounted(() => {
  activeIndex.value = "23";
});
</script>

<template>
  <div class="p-4">
    <el-form>
      <el-row :gutter="10"> 
        <el-col :xs="12" :sm="8" :md="6" :lg="4"> 
           <el-form-item>
             <div>生成题目数量：</div>
             <el-input v-model.number="questionCount" type="number" min="1" max="100" placeholder="如：20（表示生成20道题）" /> 
           </el-form-item> 
         </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="4">
           <el-form-item>
             <div>难度级别：</div>
             <el-select v-model="difficulty"> 
               <el-option label="简单" value="easy" /> 
               <el-option label="中等" value="medium" /> 
               <el-option label="困难" value="hard" /> 
             </el-select> 
           </el-form-item> 
         </el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="4">
          <el-form-item>
            <el-checkbox v-model="showNumbers" class="pr-5">显示数字</el-checkbox>
            <el-checkbox v-model="showSeconds" class="pr-5">显示秒</el-checkbox>
          </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="12" :lg="6"> 
           <el-button type="primary" @click="generateQuestions">生成题目</el-button> 
           <el-button type="success" @click="printQuestions">打印题目</el-button> 
         </el-col> 
       </el-row>
    </el-form>
    <div class="print-area">
      <div v-if="staticClocks.length > 0" class="mb-4">
        <h3 class="text-lg font-bold mb-2">静态时钟：</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            v-for="(clock, index) in staticClocks" 
            :key="index"
            class="border p-4"
          >
            <div class="clock-container">
              <StaticClock 
                :time="clock.time" 
                :backgroundColor="clock.backgroundColor" 
                :hourHandColor="clock.hourHandColor"
                :minuteHandColor="clock.minuteHandColor"
                :secondHandColor="clock.secondHandColor"
                minuteHandColor="#2c3e50" 
                secondHandColor="#e74c3c" 
                :showNumbers="showNumbers"
                :showSeconds="showSeconds"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="print-area">
      <div v-if="questions.length > 0" class="mb-4">
        <h3 class="text-lg font-bold mb-2">时钟训练题：</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            v-for="(question, index) in questions" 
            :key="index"
            class="border p-4"
          >
            <div v-if="question.showClock" class="clock-container mb-4">
              <ClockFace :hours="currentClockTime.hours" :minutes="currentClockTime.minutes" />
            </div>
            <div class="mb-2">{{ question.question }}</div>
            
            <div v-if="question.type === 'read' || question.type === 'calculate'" class="answer-input">
              <el-input v-model="userAnswer" placeholder="请输入时间 (格式如: 3:15)" />
              <el-button @click="checkAnswer">提交答案</el-button>
              <div v-if="showAnswer" class="mt-2">
                正确答案: {{ question.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clock-face {
  position: relative;
  width: 200px;
  height: 200px;
  border: 2px solid #333;
  border-radius: 50%;
  margin: 0 auto;
}

.clock-center {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #333;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.hour-hand, .minute-hand {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: left center;
  background: #333;
}

.hour-hand {
  width: 50px;
  height: 6px;
  margin-top: -3px;
}

.minute-hand {
  width: 70px;
  height: 4px;
  margin-top: -2px;
}

.numbers {
  position: absolute;
  width: 100%;
  height: 100%;
}

.numbers span {
  position: absolute;
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  transform-origin: center;
  left: calc(50% - 10px);
  top: 10px;
}
</style>