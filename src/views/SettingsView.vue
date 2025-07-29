<template>
  <div class="users">
    <el-card>
      <template #header>
        <h2>系统设置</h2>
      </template>
      <p>系统设置功能正在开发中...</p>
      <el-button type="primary" @click="$router.push('/')">
        返回桌面
      </el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SettingsView'
}
</script>

<style scoped>
.users {
  padding: 20px;
}
</style>
