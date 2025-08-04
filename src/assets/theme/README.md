# 主题配置说明

## 如何添加新主题

1. 在 `src/assets/theme/` 目录下创建一个新的 `.json` 文件
2. 文件命名建议使用主题名称，如 `green.json`、`purple.json` 等
3. 按照以下格式配置主题：

```json
{
  "themes": [
    {
      "id": "your-theme-id",
      "name": "Your Theme Name",
      "description": "Theme description",
      "primaryColor": "#your-primary-color",
      "variables": {
        "--header-color": "#header-background-color",
        "--background-left-color": "#gradient-left-color",
        "--background-right-color": "#gradient-right-color",
        "--text-color": "#main-text-color",
        "--border-color": "#border-color",
        "--primary-color": "#primary-color",
        "--secondary-color": "#secondary-color",
        "--hover-color": "#hover-background-color",
        "--shadow-color": "rgba(0, 0, 0, 0.1)"
      }
    }
  ]
}
```

## CSS变量说明

- `--header-color`: 页面头部背景色
- `--background-left-color`: 页面背景渐变的左侧颜色
- `--background-right-color`: 页面背景渐变的右侧颜色
- `--text-color`: 主要文字颜色
- `--border-color`: 边框颜色
- `--primary-color`: 主要颜色（按钮、链接等）
- `--secondary-color`: 次要颜色（描述文字等）
- `--hover-color`: 悬停背景色
- `--shadow-color`: 阴影颜色

## 示例主题

### 绿色主题 (green.json)

```json
{
  "themes": [
    {
      "id": "green",
      "name": "Green Theme",
      "description": "A fresh green theme",
      "primaryColor": "#10b981",
      "variables": {
        "--header-color": "#ffffff",
        "--background-left-color": "#ecfdf5",
        "--background-right-color": "#a7f3d0",
        "--text-color": "#064e3b",
        "--border-color": "#6ee7b7",
        "--primary-color": "#10b981",
        "--secondary-color": "#059669",
        "--hover-color": "#d1fae5",
        "--shadow-color": "rgba(16, 185, 129, 0.1)"
      }
    }
  ]
}
```

### 紫色主题 (purple.json)

```json
{
  "themes": [
    {
      "id": "purple",
      "name": "Purple Theme",
      "description": "An elegant purple theme",
      "primaryColor": "#8b5cf6",
      "variables": {
        "--header-color": "#ffffff",
        "--background-left-color": "#faf5ff",
        "--background-right-color": "#c4b5fd",
        "--text-color": "#4c1d95",
        "--border-color": "#a78bfa",
        "--primary-color": "#8b5cf6",
        "--secondary-color": "#7c3aed",
        "--hover-color": "#ede9fe",
        "--shadow-color": "rgba(139, 92, 246, 0.1)"
      }
    }
  ]
}
```

## 注意事项

1. 主题ID必须唯一
2. 颜色值可以使用十六进制、RGB、RGBA等格式
3. 主题文件会自动加载，无需手动导入
4. 用户选择的主题会保存在本地存储中
5. 重启应用后会恢复上次选择的主题
