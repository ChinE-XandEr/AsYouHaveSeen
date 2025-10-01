<template>
  <div class="projects-details">
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
      <el-card class="project-card">
        <template #header>
          <h2>Project Details</h2>
        </template>

        <!-- 加载状态 -->
        <div v-if="loading" style="text-align: center; padding: 20px">
          <el-icon class="is-loading"><Loading /></el-icon>
          <p>Loading project data...</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" style="text-align: center; padding: 20px; color: #f56c6c">
          <p>{{ error }}</p>
          <el-button @click="retryLoad">Retry</el-button>
        </div>

        <!-- 项目详情 -->
        <div v-else-if="currentProject" style="padding: 20px">
          <div class="project-header">
            <h3>{{ currentProject.name }}</h3>
            <el-tag :type="getStatusType(currentProject.status)" style="margin-left: 16px">
              {{ currentProject.status }}
            </el-tag>
          </div>
          <el-descriptions :column="2" style="margin-top: 20px">
            <el-descriptions-item label="Project ID">{{ currentProject.id }}</el-descriptions-item>
            <el-descriptions-item label="Status">{{ currentProject.status }}</el-descriptions-item>
            <el-descriptions-item label="Created At">{{
              currentProject.created_at || 'N/A'
            }}</el-descriptions-item>
            <el-descriptions-item label="Updated At">{{
              currentProject.updated_at || 'N/A'
            }}</el-descriptions-item>
            <el-descriptions-item label="Description" :span="2">{{
              currentProject.description
            }}</el-descriptions-item>
            <el-descriptions-item label="Project URL" :span="2">
              <a
                :href="currentProject.URL"
                target="_blank"
                style="color: var(--primary-color); text-decoration: none"
              >
                {{ currentProject.URL }}
              </a>
            </el-descriptions-item>
          </el-descriptions>

          <div style="margin-top: 20px; text-align: center">
            <el-button type="primary" @click="openProject" style="margin-right: 16px">
              Open Project
            </el-button>
            <el-button @click="$router.push('/')"> Back to Desktop </el-button>
          </div>
        </div>

        <!-- 未找到项目 -->
        <div v-else style="text-align: center; padding: 20px; color: #909399">
          <p>Project not found</p>
          <el-button @click="$router.push('/')">Back to Desktop</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import projectsDetailsData from '@/assets/data/projectsdetails.json'
import { Monitor, ArrowDown, Setting, Loading } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const error = ref(null)
const projectsDetails = ref([])

// 获取当前项目ID
const projectId = computed(() => route.params.projectId)

// 获取当前项目信息
const currentProject = computed(() => {
  if (!projectId.value || !projectsDetails.value.length) return null
  return projectsDetails.value.find((project) => project.id === projectId.value)
})

// 获取状态类型
const getStatusType = (status) => {
  switch (status?.toLowerCase()) {
    case 'done':
    case 'completed':
      return 'success'
    case 'in progress':
    case 'working':
      return 'warning'
    case 'pending':
      return 'info'
    default:
      return 'info'
  }
}

// 打开项目
const openProject = () => {
  if (currentProject.value?.URL) {
    window.open(currentProject.value.URL, '_blank')
  }
}

// 打开个人资料
const openProfile = () => {
  router.push('/profile')
}

// 打开设置
const openSettings = () => {
  router.push('/settings')
}

// 重试加载
const retryLoad = () => {
  loadData()
}

// 加载数据
const loadData = async () => {
  try {
    loading.value = true
    error.value = null

    console.log('Loading projects details data...')
    console.log('Project ID:', projectId.value)

    if (projectsDetailsData && projectsDetailsData.projectsdetails) {
      projectsDetails.value = projectsDetailsData.projectsdetails
      console.log('Projects details loaded:', projectsDetails.value)
      console.log('Current project:', currentProject.value)
    } else {
      error.value = 'No projects data found'
      console.error('No projects data found in:', projectsDetailsData)
    }
  } catch (err) {
    error.value = 'Failed to load projects data: ' + err.message
    console.error('Error loading projects data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.projects-details {
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
  margin: 0 24px 32px;
  padding: 20px;
}

.project-card {
  background: var(--header-color);
  border-radius: 8px;
  box-shadow: 0 4px 16px var(--shadow-color);
  border: 1px solid var(--border-color);
}

.project-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.project-header h3 {
  margin: 0;
  color: var(--text-color);
  font-size: 24px;
  font-weight: bold;
}
</style>
