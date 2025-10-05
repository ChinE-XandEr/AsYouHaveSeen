<template>
  <div class="theme-switcher">
    <el-button
      class="theme-toggle-button"
      type="primary"
      circle
      @click="showThemeDialog = true"
      :style="{ backgroundColor: currentTheme?.primaryColor || '#409EFF' }"
    >
      <el-icon :size="20">
        <Brush />
      </el-icon>
    </el-button>

    <!-- 主题选择对话框 -->
    <el-dialog
      v-model="showThemeDialog"
      title="Select Theme"
      width="400px"
      :close-on-click-modal="false"
    >
      <div class="theme-list">
        <div
          v-for="theme in availableThemes"
          :key="theme.id"
          class="theme-item"
          :class="{ active: currentThemeId === theme.id }"
          :data-theme="theme.id"
          @click="switchTheme(theme.id)"
        >
          <div class="theme-preview" :style="getThemePreviewStyle(theme)">
            <div class="preview-header"></div>
            <div class="preview-content"></div>
          </div>
          <div class="theme-info">
            <h4>{{ theme.name }}</h4>
            <p>{{ theme.description }}</p>
          </div>
          <el-icon v-if="currentThemeId === theme.id" class="active-icon">
            <Check />
          </el-icon>
        </div>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showThemeDialog = false"> Cancel </el-button>
          <el-button type="primary" @click="showThemeDialog = false"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Brush, Check } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const showThemeDialog = ref(false)
const currentThemeId = ref('light')
const availableThemes = ref([])

// 获取当前主题
const currentTheme = computed(() => {
  return availableThemes.value.find((theme) => theme.id === currentThemeId.value)
})

// 动态导入主题文件
const loadThemes = async () => {
  try {
    const themeModules = import.meta.glob('@/assets/theme/*.json')
    const themes = []

    for (const path in themeModules) {
      const module = await themeModules[path]()
      if (module.default && module.default.themes) {
        themes.push(...module.default.themes)
      }
    }

    availableThemes.value = themes
    console.log('Loaded themes:', themes)
  } catch (error) {
    console.error('Error loading themes:', error)
    ElMessage.error('加载主题失败')
  }
}

// 切换主题
const switchTheme = (themeId, showMessage = true) => {
  const theme = availableThemes.value.find((t) => t.id === themeId)
  if (!theme) return

  currentThemeId.value = themeId

  // 应用CSS变量
  const root = document.documentElement
  Object.entries(theme.variables).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })

  // 保存到本地存储
  localStorage.setItem('selectedTheme', themeId)

  // 只在用户主动切换时显示提示
  if (showMessage) {
    ElMessage.success(`have been switched to ${theme.name}`)
  }
}

// 获取主题预览样式
const getThemePreviewStyle = (theme) => {
  return {
    '--preview-bg-left': theme.variables['--background-left-color'],
    '--preview-bg-right': theme.variables['--background-right-color'],
    '--preview-header': theme.variables['--header-color'],
    '--preview-text': theme.variables['--text-color'],
  }
}

// 初始化主题
const initTheme = () => {
  const savedTheme = localStorage.getItem('selectedTheme')
  if (savedTheme && availableThemes.value.find((t) => t.id === savedTheme)) {
    switchTheme(savedTheme, false) // 初始化时不显示提示
  } else {
    switchTheme('light', false) // 默认主题，初始化时不显示提示
  }
}

onMounted(async () => {
  await loadThemes()
  initTheme()
})
</script>

<style scoped>
.theme-switcher {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.theme-toggle-button {
  width: 32px;
  height: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.theme-toggle-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.theme-list {
  max-height: 400px;
  overflow-y: auto;
}

.theme-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background-color: var(--header-color);
  color: var(--text-color);
}

.theme-item:hover {
  border-color: var(--primary-color);
  background-color: var(--hover-color);
}

.theme-item.active {
  border-color: var(--primary-color);
  background-color: var(--primary-color);
  color: #ffffff;
}

/* 针对蓝色主题的特殊处理 */
.theme-item.active[data-theme='blue'] {
  background-color: rgba(30, 64, 175, 0.8);
  border-color: rgba(30, 64, 175, 0.8);
}

/* 针对紫色主题的特殊处理 */
.theme-item.active[data-theme='purple'] {
  background-color: rgba(139, 92, 246, 0.8);
  border-color: rgba(139, 92, 246, 0.8);
}

.theme-preview {
  width: 60px;
  height: 40px;
  border-radius: 6px;
  margin-right: 12px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, var(--preview-bg-left), var(--preview-bg-right));
}

.preview-header {
  height: 8px;
  background-color: var(--preview-header);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.preview-content {
  height: 32px;
  background-color: transparent;
}

.theme-info {
  flex: 1;
}

.theme-info h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
}

.theme-info p {
  margin: 0;
  font-size: 12px;
  color: var(--secondary-color);
  line-height: 1.4;
}

.active-icon {
  color: var(--primary-color);
  font-size: 18px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
