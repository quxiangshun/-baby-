<script setup>
import { ref } from 'vue';
import useMobile from "@/store/useMobile";
import { storeToRefs } from "pinia";

const mobileStore = useMobile();
const { activeIndex } = storeToRefs(mobileStore);

// 定义响应式数据
const maxNumber = ref(20); // 题目中出现的最大数字
const questionCount = ref(30); // 题目总数
const operationType = ref('plus'); // plus, minus, both, split_combine, compare
const allowNegative = ref(false); // 是否允许负数结果

const questions = ref([]);
const splitCombineQuestions = ref([]);
const compareQuestions = ref([]);

// 生成随机数
const getRandomNumber = (max) => Math.floor(Math.random() * max) + 1;

// 生成单个题目
const generateSingleQuestion = (ot) => {
  let a, b, c;
  let question = '';
  
  switch(ot) {
    case 'plus': // 加法 (a + b ≤ maxNumber)
      a = getRandomNumber(maxNumber.value - 1);
      b = getRandomNumber(maxNumber.value - a);
      question = `${a} + ${b} = `;
      break;
    case 'minus': // 减法 (a > b 除非允许负数)
      a = getRandomNumber(maxNumber.value);
      b = allowNegative.value ? getRandomNumber(maxNumber.value) : getRandomNumber(a - 1);
      question = `${a} - ${b} = `;
      break;
      
    case 'both': // 加减法 (随机选择加法或减法)
      if (Math.random() > 0.5) {
        a = getRandomNumber(maxNumber.value - 1);
        b = getRandomNumber(maxNumber.value - a);
        question = `${a} + ${b} = `;
      } else {
        a = getRandomNumber(maxNumber.value);
        b = allowNegative.value ? getRandomNumber(maxNumber.value) : getRandomNumber(a - 1);
        question = `${a} - ${b} = `;
      }
      break;
      
    case 'consecutive_minus': // 连减运算 (a > b + c)
      a = Math.random() > 0.5 ? 5 : 4;
      b = Math.random() > 0.5 ? 5 : 4;
      c = Math.random() > 0.5 ? 5 : 4;
      if (a <= b + c) {
        a = b + c + 1; // 确保a > b + c
      }
      question = `${a} - ${b} - ${c} = `;
      break;
      
    case 'consecutive_plus': // 连加运算 (a + b + c ≤ maxNumber)
      a = Math.random() > 0.5 ? 5 : 4;
      b = Math.random() > 0.5 ? 5 : 4;
      c = Math.random() > 0.5 ? 5 : 4;
      if (a + b + c > maxNumber.value) {
        // 如果总和超过maxNumber，重新选择c
        c = maxNumber.value - a - b;
      }
      question = `${a} + ${b} + ${c} = `;
      break;
      
    case 'mixed': // 加减混合运算 (a + b - c 或 a - b + c)
      if (Math.random() > 0.5) {
        a = getRandomNumber(maxNumber.value - 1);
        b = getRandomNumber(maxNumber.value - a);
        c = getRandomNumber(a + b - 1);
        question = `${a} + ${b} - ${c} = `;
      } else {
        a = getRandomNumber(maxNumber.value);
        b = allowNegative.value ? getRandomNumber(maxNumber.value) : getRandomNumber(a - 1);
        c = getRandomNumber(maxNumber.value - (a - b));
        question = `${a} - ${b} + ${c} = `;
      }
      break;
      
    case 'consecutive_both': // 连加和连减运算 (随机选择连加或连减)
      if (Math.random() > 0.5) {
        a = getRandomNumber(maxNumber.value - 2);
        b = getRandomNumber(maxNumber.value - a - 1);
        c = getRandomNumber(maxNumber.value - a - b);
        question = `${a} + ${b} + ${c} = `;
      } else {
        a = getRandomNumber(maxNumber.value);
        b = getRandomNumber(a - 1);
        c = getRandomNumber(a - b - 1);
        question = `${a} - ${b} - ${c} = `;
      }
      break;
      
    case 'random_mix': // 梭哈 (生成包含多种运算类型的题目)
      const randomType = ['plus', 'minus', 'consecutive_minus', 'consecutive_plus', 'mixed'][Math.floor(Math.random() * 5)];
      generateSingleQuestion(randomType);
      return;
      
    default:
      a = getRandomNumber(maxNumber.value);
      b = getRandomNumber(maxNumber.value);
      question = `${a} + ${b} = `;
  }
  questions.value.push(question);
};

const generateSingleSplitCombineQuestions = () => {
  let a, b, c;
  let question = '';
  
  const types = ['a + (    ) = c', 'a - (    ) = c', '(    ) + b = c', '(    ) - b = c', 'a + b = (    )', 'a - b = (    )'];
  const type = types[Math.floor(Math.random() * types.length)];
    
  a = getRandomNumber(maxNumber.value - 1);
  b = getRandomNumber(maxNumber.value - a);
  c = a + b;
  
  switch(type) {
    case 'a + (    ) = c':
      question = `${a} + (    ) = ${c}`;
      break;
    case 'a - (    ) = c':
      question = `${a} - (    ) = ${c}`;
      break;
    case '(    ) + b = c':
      question = `(    ) + ${b} = ${c}`;
      break;
    case '(    ) - b = c':
      question = `(    ) - ${b} = ${c}`;
      break;
    case 'a + b = (    )':
      question = `${a} + ${b} = (    )`;
      break;
    case 'a - b = (    )':
      question = `${a} - ${b} = (    )`;
      break;
  }
  splitCombineQuestions.value.push(question);
};

const generateSingleCompareQuestions = () => {
  let a, b, c;
  let question = '';
  if (Math.random() > 0.5) {
    a = getRandomNumber(maxNumber.value - 1);
    b = getRandomNumber(maxNumber.value - a);
    c = getRandomNumber(maxNumber.value);
    question = `${a} + ${b} O ${c}`;
  } else {
    a = getRandomNumber(maxNumber.value);
    b = allowNegative.value ? getRandomNumber(maxNumber.value) : getRandomNumber(a - 1);
    c = getRandomNumber(maxNumber.value);
    question = `${a} - ${b} O ${c}`;
  }
  compareQuestions.value.push(question);
};
// 生成题目
const generateQuestions = () => {
  questions.value = [];
  splitCombineQuestions.value = [];
  compareQuestions.value = [];
  for (let i = 0; i < questionCount.value; i++) {
    generateSingleQuestion(operationType.value);
    generateSingleSplitCombineQuestions();
    generateSingleCompareQuestions();
  }
};

// 打印题目
const printQuestions = () => {
  const printContent = `
    <html>
      <head>
        <title>栾媛数学练习题</title>
        <style>
          body { font-family: Arial; font-size: 18px; padding: 20px; }
          .questions-grid { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-top: 15px;
          }
          .question { 
            border: 1px solid #ddd;
            padding: 5px;
          }
          .decomposition {
            margin-top: 30px;
            page-break-before: always;
          }
          .decomposition-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>

        <h2>数学练习题</h2>
        <div class="questions-grid">
          ${questions.value.map(q => `<div class="question">${q.replace(/\(\s+\)/g, '(        )')}</div>`).join('')}
          ${Array((3 - (questions.value.length % 3)) % 3).fill('<div class="question"></div>').join('')}
        </div>

        <h2>分与合练习题</h2>
        <div class="questions-grid">
          ${splitCombineQuestions.value.map(q => `<div class="question">${q.replace(/\(\s+\)/g, '(        )')}</div>`).join('')}
          ${Array((3 - (splitCombineQuestions.value.length % 3)) % 3).fill('<div class="question"></div>').join('')}
        </div>

        <h2>比一比练习题</h2>
        <div class="questions-grid">
          ${compareQuestions.value.map(q => `<div class="question">${q.replace(/\(\s+\)/g, '(        )')}</div>`).join('')}
          ${Array((3 - (compareQuestions.value.length % 3)) % 3).fill('<div class="question"></div>').join('')}
        </div>
      </body>
    </html>
  `;
  
  const printWindow = window.open('', '', 'width=800,height=600');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // 使用setTimeout确保内容加载完成后再打印
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      // 不再立即关闭窗口，让用户决定何时关闭
    }, 500);
  } else {
    alert('无法打开打印窗口，请检查浏览器设置是否允许弹出窗口');
  }
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
             <div>题目中最大数字：</div>
             <el-input v-model.number="maxNumber" type="number" min="1" max="100" placeholder="如：10（表示题目中数字不超过10）" /> 
           </el-form-item> 
         </el-col> 
         <el-col :xs="12" :sm="8" :md="6" :lg="4"> 
           <el-form-item>
             <div>生成题目数量：</div>
             <el-input v-model.number="questionCount" type="number" min="1" max="100" placeholder="如：20（表示生成20道题）" /> 
           </el-form-item> 
         </el-col> 
         <el-col :xs="12" :sm="8" :md="6" :lg="4"> 
           <el-form-item>
             <div>计算方式：</div>
             <el-select v-model="operationType"> 
               <el-option label="加法" value="plus" /> 
               <el-option label="减法" value="minus" /> 
               <el-option label="加减法" value="both" /> 
               <el-option label="连减运算" value="consecutive_minus" /> 
               <el-option label="连加运算" value="consecutive_plus" /> 
               <el-option label="加减混合运算" value="mixed" /> 
               <el-option label="连加和连减运算" value="consecutive_both" /> 
               <el-option label="梭哈" value="random_mix" />
             </el-select> 
           </el-form-item> 
         </el-col> 
         <el-col :xs="24" :sm="24" :md="12" :lg="6"> 
           <!-- <el-checkbox v-model="allowNegative" class="pr-5">允许出现负数</el-checkbox> --> 
           <el-button type="primary" @click="generateQuestions">生成题目</el-button> 
           <el-button type="success" @click="printQuestions">打印题目</el-button> 
         </el-col> 
       </el-row>
    </el-form>
    
    <div v-if="questions.length > 0" class="mb-4">
      <h3 class="text-lg font-bold mb-2">题目：</h3>
      <div class="grid grid-cols-3 gap-4">
        <div 
          v-for="(question, index) in questions" 
          :key="index"
          class="border p-2 min-h-[50px]"
        >
          {{ question }}
        </div>
        <!-- 填充空白格子 -->
        <div 
          v-for="i in (3 - (questions.length % 3)) % 3" 
          :key="'empty-' + i"
          class="border p-2 min-h-[50px]"
        ></div>
      </div>
    </div>
    <div v-if="splitCombineQuestions.length > 0" class="mb-4">
      <h3 class="text-lg font-bold mb-2">分与合：</h3>
      <div class="grid grid-cols-3 gap-4">
        <div
            v-for="(question, index) in splitCombineQuestions"
            :key="index"
            class="border p-2 min-h-[50px]"
        >
          {{ question }}
        </div>
        <!-- 填充空白格子 -->
        <div
            v-for="i in (3 - (questions.length % 3)) % 3"
            :key="'empty-' + i"
            class="border p-2 min-h-[50px]"
        ></div>
      </div>
    </div>
    <div v-if="compareQuestions.length > 0" class="mb-4">
      <h3 class="text-lg font-bold mb-2">比一比：</h3>
      <div class="grid grid-cols-3 gap-4">
        <div
            v-for="(question, index) in compareQuestions"
            :key="index"
            class="border p-2 min-h-[50px]"
        >
          {{ question }}
        </div>
        <!-- 填充空白格子 -->
        <div
            v-for="i in (3 - (questions.length % 3)) % 3"
            :key="'empty-' + i"
            class="border p-2 min-h-[50px]"
        ></div>
      </div>
    </div>
  </div>
</template>