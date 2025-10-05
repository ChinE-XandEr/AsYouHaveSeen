<template>
  <div class="users">
    <!-- 系统标题栏 -->
    <div class="desktop-header">
      <div class="system-title">
        <el-icon :size="24" color="#409EFF">
          <Monitor />
        </el-icon>
        <span class="title-text">As you've seen</span>
      </div>
      <div class="user-info">
        <el-avatar
          :size="32"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="username">Manager</span>
        <el-dropdown>
          <el-button type="text">
            <el-icon><ArrowDown /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="openProfile">Profile</el-dropdown-item>
              <el-dropdown-item divided>Log out</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button type="text" @click="openSettings">
          <el-icon><Setting /></el-icon>
        </el-button>
      </div>
    </div>

    <div class="content-container">
      <el-card class="users-card">
        <template #header>
          <h2>User Management</h2>
        </template>

        <div style="padding: 20px; text-align: center; color: var(--secondary-color)">
          <p>Users page is under construction.</p>
          <el-button @click="$router.push('/')">Back to Desktop</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const openProfile = () => {
  router.push('/profile')
}

const openSettings = () => {
  router.push('/settings')
}
</script>

<style scoped>
.users {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, var(--background-left-color), var(--background-right-color));
  padding: 0;
  overflow-y: auto;
}

.desktop-header {
  background: var(--header-color);
  padding: 16px 24px;
  box-shadow: 0 2px 8px var(--shadow-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.system-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-text {
  font-size: 20px;
  font-weight: bold;
  color: var(--text-color);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.username {
  font-weight: 500;
  color: var(--secondary-color);
}

.content-container {
  margin: 80px 24px 32px;
  padding: 20px;
}

.users-card {
  background: var(--header-color);
  border-radius: 8px;
  box-shadow: 0 4px 16px var(--shadow-color);
  border: 1px solid var(--border-color);
}
</style>
