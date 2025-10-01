<template>
  <div class="timeline-view">
    <div class="header">
      <el-button type="text" @click="goBack">
        <el-icon><ArrowLeft /></el-icon>
        Back
      </el-button>
      <h2 class="title">
        <el-icon><Clock /></el-icon>
        Timeline
      </h2>
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
