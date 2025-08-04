# 设置系统说明

## 概述

设置系统允许用户自定义应用的各种选项，并将这些设置保存到 `setting.json` 文件中。

## 文件结构

```
src/assets/setting/
├── setting.json    # 设置配置文件
└── README.md       # 说明文档
```

## 设置项说明

### 外观设置 (Appearance)

- `autoTheme`: 是否自动切换主题
- `animations`: 是否启用动画效果

### 通知设置 (Notifications)

- `desktopNotifications`: 是否允许桌面通知
- `emailNotifications`: 是否接收邮件通知
- `soundNotifications`: 是否播放通知声音

### 隐私设置 (Privacy)

- `dataCollection`: 是否允许数据收集
- `locationServices`: 是否允许位置服务

### 账户设置 (Account)

- `username`: 用户名
- `email`: 邮箱地址
- `language`: 语言设置

## 数据流程

1. **加载设置**: 页面加载时从 `setting.json` 读取默认设置
2. **用户操作**: 用户修改设置选项
3. **自动保存**: 设置变化后自动保存到 `setting.json`
4. **持久化**: 设置保存在服务器端，重启应用后仍然有效

## API 端点

- **POST** `/api/settings` - 保存设置到 JSON 文件

### 请求格式

```json
{
  "settings": {
    "appearance": {
      "autoTheme": false,
      "animations": true
    },
    "notifications": {
      "desktopNotifications": true,
      "emailNotifications": false,
      "soundNotifications": true
    },
    "privacy": {
      "dataCollection": true,
      "locationServices": false
    },
    "account": {
      "username": "Manager",
      "email": "manager@example.com",
      "language": "zh"
    }
  }
}
```

### 响应格式

```json
{
  "success": true,
  "message": "Settings saved successfully"
}
```

## 使用方法

1. 在 SettingsView 中修改设置
2. 设置会自动保存到 `setting.json` 文件
3. 重启应用后设置仍然有效

## 注意事项

- 设置文件会自动创建，无需手动创建
- 所有设置都有默认值，确保应用正常运行
- 设置保存失败时会显示错误消息
- 支持实时保存，无需手动点击保存按钮
