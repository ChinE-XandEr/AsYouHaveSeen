<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div class="home">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>我的第一个 Vue 应用</span>
        </div>
      </template>
      <el-button type="primary" @click="handleClick">
        <el-icon><Plus /></el-icon>
        点击我
      </el-button>
      <p>{{ message }}</p>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'HomeView',
  setup() {
    const message = ref('Hello Vue + Element Plus!')

    const handleClick = () => {
      message.value = '按钮被点击了！'
    }

    return {
      message,
      handleClick
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}
.box-card {
  max-width: 480px;
  margin: 0 auto;
}
</style>
