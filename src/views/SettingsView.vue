<template>
  <div class="settings">
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
        <el-button type="text" @click="goHome">
          <el-icon><House /></el-icon>
        </el-button>
      </div>
    </div>

    <div class="settings-container">
      <!-- 侧栏 -->
      <div class="sidebar">
        <div class="sidebar-header">
          <h3>Settings</h3>
        </div>
        <div class="sidebar-menu">
          <div
            v-for="item in menuItems"
            :key="item.id"
            class="menu-item"
            :class="{ active: activeMenu === item.id }"
            @click="activeMenu = item.id"
          >
            <el-icon class="menu-icon">
              <component :is="item.icon" />
            </el-icon>
            <span class="menu-text">{{ item.name }}</span>
          </div>
        </div>
      </div>

      <!-- 主内容区域 -->
      <div class="main-content">
        <div class="content-header">
          <h2>{{ getCurrentMenuName() }}</h2>
          <p>{{ getCurrentMenuDescription() }}</p>
        </div>

        <!-- 外观设置 -->
        <div v-if="activeMenu === 'appearance'" class="content-section">
          <el-card class="settings-card">
            <template #header>
              <h3>Theme</h3>
            </template>
            <div class="setting-item">
              <div class="setting-info">
                <h4>Switch themes automatically</h4>
                <p>Automatically switch between light and dark themes based on system time</p>
              </div>
              <el-switch v-model="settings.appearance.autoTheme" @change="handleSettingChange" />
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <h4>Animation Effects</h4>
                <p>Enable page transition and interaction animations</p>
              </div>
              <el-switch v-model="settings.appearance.animations" @change="handleSettingChange" />
            </div>
          </el-card>
        </div>

        <!-- 通知设置 -->
        <div v-if="activeMenu === 'notifications'" class="content-section">
          <el-card class="settings-card">
            <template #header>
              <h3>Notification</h3>
            </template>
            <div class="setting-item">
              <div class="setting-info">
                <h4>Desktop Notifications</h4>
                <p>Allow the app to send desktop notifications</p>
              </div>
              <el-switch
                v-model="settings.notifications.desktopNotifications"
                @change="handleSettingChange"
              />
            </div>
          </el-card>
        </div>

        <!-- 隐私设置 -->
        <div v-if="activeMenu === 'privacy'" class="content-section">
          <el-card class="settings-card">
            <template #header>
              <h3>Privacy</h3>
            </template>
            <div class="setting-item">
              <div class="setting-info">
                <h4>Data Collection</h4>
                <p>Allow data collection to improve the product</p>
              </div>
              <el-switch v-model="settings.privacy.dataCollection" @change="handleSettingChange" />
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <h4>Location Services</h4>
                <p>Allow the app to access location information</p>
              </div>
              <el-switch
                v-model="settings.privacy.locationServices"
                @change="handleSettingChange"
              />
            </div>
          </el-card>
        </div>

        <!-- 账户设置 -->
        <div v-if="activeMenu === 'account'" class="content-section">
          <el-card class="settings-card">
            <template #header>
              <h3>Account Information</h3>
            </template>
            <el-form :model="accountForm" label-width="100px">
              <el-form-item label="Username">
                <el-input v-model="accountForm.username" />
              </el-form-item>
              <el-form-item label="Email">
                <el-input v-model="accountForm.email" />
              </el-form-item>
              <el-form-item label="Language">
                <el-select v-model="accountForm.language">
                  <el-option label="中文" value="zh" />
                  <el-option label="English" value="en" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveAccountSettings">Save Changes</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>

        <!-- 关于 -->
        <div v-if="activeMenu === 'about'" class="content-section">
          <el-card class="settings-card">
            <template #header>
              <h3>About the App</h3>
            </template>
            <div class="about-content">
              <div class="app-info">
                <h4>As you've seen</h4>
                <p>Version beta 1.0.0</p>
                <p>A modern project management system</p>
              </div>
              <div class="links">
                <el-button type="text" @click="openHelp">Help Documentation</el-button>
                <el-button type="text" @click="openFeedback">Feedback</el-button>
                <el-button type="text" @click="openPrivacy">Privacy Policy</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
// The 'Back' have not been used
// import { Back, House } from '@element-plus/icons-vue'
import settingsData from '@/assets/setting/setting.json'

const router = useRouter()
const activeMenu = ref('appearance')

// 菜单项配置
const menuItems = [
  {
    id: 'appearance',
    name: 'Appearance',
    icon: 'Brush',
    description: 'Customize the app appearance and theme',
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: 'Bell',
    description: 'Manage notification settings',
  },
  {
    id: 'privacy',
    name: 'Privacy',
    icon: 'Lock',
    description: 'Privacy and security settings',
  },
  {
    id: 'account',
    name: 'Account',
    icon: 'User',
    description: 'Account information management',
  },
  {
    id: 'about',
    name: 'About',
    icon: 'InfoFilled',
    description: 'About the app and help',
  },
]

// 设置数据 - 从JSON文件初始化
const settings = reactive({
  appearance: {
    autoTheme: false,
    animations: true,
  },
  notifications: {
    desktopNotifications: true,
    emailNotifications: false,
    soundNotifications: true,
  },
  privacy: {
    dataCollection: true,
    locationServices: false,
  },
  account: {
    username: 'Manager',
    email: 'manager@example.com',
    language: 'zh',
  },
})

// 账户表单数据
const accountForm = reactive({
  username: 'Manager',
  email: 'manager@example.com',
  language: 'zh',
})

// 加载设置
const loadSettings = () => {
  try {
    if (settingsData && settingsData.settings) {
      // 合并JSON文件中的设置
      Object.assign(settings, settingsData.settings)

      // 同步账户表单数据
      Object.assign(accountForm, settings.account)

      console.log('Settings loaded from JSON:', settings)
    }
  } catch (error) {
    console.error('Error loading settings:', error)
    ElMessage.error('Failed to load settings')
  }
}

// 保存设置到JSON文件
const saveSettings = async () => {
  try {
    // 同步账户表单数据到设置对象
    Object.assign(settings.account, accountForm)

    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ settings }),
    })

    if (response.ok) {
      ElMessage.success('Settings saved successfully')
      console.log('Settings saved:', settings)
    } else {
      throw new Error('Failed to save settings')
    }
  } catch (error) {
    console.error('Error saving settings:', error)
    ElMessage.error('Failed to save settings')
  }
}

// 获取当前菜单名称
const getCurrentMenuName = () => {
  const menu = menuItems.find((item) => item.id === activeMenu.value)
  return menu ? menu.name : ''
}

// 获取当前菜单描述
const getCurrentMenuDescription = () => {
  const menu = menuItems.find((item) => item.id === activeMenu.value)
  return menu ? menu.description : ''
}

// 保存账户设置
const saveAccountSettings = () => {
  saveSettings()
}

// 监听设置变化并自动保存
const handleSettingChange = () => {
  // 延迟保存，避免频繁请求
  setTimeout(() => {
    saveSettings()
  }, 500)
}

// 打开帮助文档
const openHelp = () => {
  window.open('https://example.com/help', '_blank')
}

// 打开反馈页面
const openFeedback = () => {
  window.open('https://example.com/feedback', '_blank')
}

// 打开隐私政策
const openPrivacy = () => {
  window.open('https://example.com/privacy', '_blank')
}

// 打开个人资料
const openProfile = () => {
  router.push('/profile')
}

// 返回主页
const goHome = () => {
  router.push('/')
}

// 组件挂载时加载设置
onMounted(() => {
  loadSettings()
})
</script>

<style scoped>
.settings {
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

.settings-container {
  display: flex;
  margin: 80px 24px 32px;
  gap: 24px;
  min-height: calc(100vh - 120px);
}

/* 侧栏样式 */
.sidebar {
  width: 250px;
  background: var(--header-color);
  border-radius: 8px;
  box-shadow: 0 2px 12px var(--shadow-color);
  border: 1px solid var(--border-color);
  flex-shrink: 0;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-header h3 {
  margin: 0;
  color: var(--text-color);
  font-size: 18px;
  font-weight: bold;
}

.sidebar-menu {
  padding: 16px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-color);
}

.menu-item:hover {
  background-color: var(--hover-color);
}

.menu-item.active {
  background-color: var(--primary-color);
  color: #ffffff;
}

.menu-icon {
  font-size: 18px;
}

.menu-text {
  font-size: 14px;
  font-weight: 500;
}

/* 主内容区域样式 */
.main-content {
  flex: 1;
  background: var(--header-color);
  border-radius: 8px;
  box-shadow: 0 2px 12px var(--shadow-color);
  border: 1px solid var(--border-color);
  padding: 24px;
}

.content-header {
  margin-bottom: 24px;
}

.content-header h2 {
  margin: 0 0 8px 0;
  color: var(--text-color);
  font-size: 24px;
  font-weight: bold;
}

.content-header p {
  margin: 0;
  color: var(--secondary-color);
  font-size: 14px;
}

.content-section {
  margin-bottom: 24px;
}

.settings-card {
  background: var(--header-color);
  border: 1px solid var(--border-color);
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-color);
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-info h4 {
  margin: 0 0 4px 0;
  color: var(--text-color);
  font-size: 16px;
  font-weight: 500;
}

.setting-info p {
  margin: 0;
  color: var(--secondary-color);
  font-size: 14px;
}

.about-content {
  text-align: center;
}

.app-info h4 {
  margin: 0 0 8px 0;
  color: var(--text-color);
  font-size: 20px;
  font-weight: bold;
}

.app-info p {
  margin: 0 0 4px 0;
  color: var(--secondary-color);
  font-size: 14px;
}

.links {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
}
</style>
