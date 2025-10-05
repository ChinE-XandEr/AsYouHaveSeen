<template>
  <div class="timeline-view">
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

    <el-card class="timeline-card">
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in items"
          :key="index"
          :timestamp="item.time"
          :type="item.type"
          :hollow="item.hollow"
          :color="item.color"
        >
          <div class="timeline-item">
            <div class="item-title">{{ item.title }}</div>
            <div class="item-desc">{{ item.description }}</div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'TimelineView',
  setup() {
    const router = useRouter()

    const items = ref([
      {
        time: '2025-01-05 10:00',
        title: '系统启动',
        description: '应用服务器已成功启动',
        type: 'success',
      },
      {
        time: '2025-01-05 10:10',
        title: '加载数据',
        description: '从本地 JSON 加载项目与工具数据',
        type: 'info',
        hollow: true,
      },
      {
        time: '2025-01-05 10:20',
        title: '用户登录',
        description: 'Manager 通过桌面入口进入系统',
        type: 'primary',
      },
      {
        time: '2025-01-05 10:30',
        title: '访问项目详情',
        description: '跳转至 Projects Details 查看具体信息',
        type: 'warning',
      },
    ])

    const goBack = () => {
      router.push('/')
    }

    return {
      items,
      goBack,
    }
  },
}
</script>

<style scoped>
.timeline-view {
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(135deg, var(--background-left-color), var(--background-right-color));
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

.header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: var(--text-color);
}

.timeline-card {
  background: var(--header-color);
  border: 1px solid var(--border-color);
  margin-top: 80px;
}

.timeline-item .item-title {
  font-weight: 600;
  color: var(--text-color);
}

.timeline-item .item-desc {
  color: var(--secondary-color);
  margin-top: 4px;
}
</style>
