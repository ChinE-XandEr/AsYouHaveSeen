<template>
  <RouterView />
  <ThemeSwitcher />
</template>

<script>
import ThemeSwitcher from './components/ThemeSwitcher.vue'

export default {
  name: 'App',
  components: {
    ThemeSwitcher,
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

#app {
  min-height: 100vh;
}

/* 应用主题CSS变量 */
:root {
  --header-color: #ffffff;
  --background-left-color: #f5f7fa;
  --background-right-color: #c3cfe2;
  --text-color: #333333;
  --border-color: #e0e0e0;
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --hover-color: #f8f9fa;
  --shadow-color: rgba(0, 0, 0, 0.1);
}

/* 默认文本颜色跟随主题变量 */
html,
body,
#app {
  color: var(--text-color);
}

/* 确保Element Plus组件使用主题变量 */
.el-card {
  background-color: var(--header-color) !important;
  border-color: var(--border-color) !important;
  color: var(--text-color) !important;
}

.el-card__header {
  background-color: var(--header-color) !important;
  border-bottom-color: var(--border-color) !important;
  color: var(--text-color) !important;
}

/* 按钮样式覆盖 */
.el-button {
  border-color: var(--border-color) !important;
  background-color: var(--header-color) !important;
  color: var(--text-color) !important;
}

.el-button--text {
  color: var(--text-color) !important;
  background-color: transparent !important;
  border-color: transparent !important;
}

.el-button--text:hover {
  color: var(--primary-color) !important;
  background-color: var(--hover-color) !important;
}

.el-button--primary {
  background-color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
  color: #ffffff !important;
}

.el-button--primary:hover {
  background-color: var(--primary-color) !important;
  opacity: 0.8;
}

/* 表格样式覆盖 */
.el-table {
  background-color: var(--header-color) !important;
  color: var(--text-color) !important;
  border-color: var(--border-color) !important;
}

.el-table th {
  background-color: var(--hover-color) !important;
  color: var(--text-color) !important;
  border-bottom-color: var(--border-color) !important;
}

.el-table td {
  background-color: var(--header-color) !important;
  color: var(--text-color) !important;
  border-bottom-color: var(--border-color) !important;
}

.el-table--border {
  border-color: var(--border-color) !important;
}

.el-table--border th,
.el-table--border td {
  border-right-color: var(--border-color) !important;
}

/* 表格行悬停效果 */
.el-table tbody tr:hover > td {
  background-color: var(--hover-color) !important;
}

/* 描述列表样式 */
.el-descriptions {
  background-color: var(--header-color) !important;
  color: var(--text-color) !important;
}

.el-descriptions__header {
  background-color: var(--header-color) !important;
  color: var(--text-color) !important;
}

.el-descriptions__body {
  background-color: var(--header-color) !important;
  color: var(--text-color) !important;
}

.el-descriptions__table {
  background-color: var(--header-color) !important;
  color: var(--text-color) !important;
}

.el-descriptions__cell {
  background-color: var(--header-color) !important;
  color: var(--text-color) !important;
  border-color: var(--border-color) !important;
}

.el-descriptions__label {
  color: var(--secondary-color) !important;
  background-color: var(--hover-color) !important;
}

.el-descriptions__content {
  color: var(--text-color) !important;
  background-color: var(--header-color) !important;
}

.el-descriptions--border .el-descriptions__cell {
  border-color: var(--border-color) !important;
}

.el-descriptions--border .el-descriptions__label {
  border-color: var(--border-color) !important;
}

.el-descriptions--border .el-descriptions__content {
  border-color: var(--border-color) !important;
}

/* 对话框样式 */
.el-dialog {
  background-color: var(--header-color) !important;
  border-color: var(--border-color) !important;
}

.el-dialog__header {
  background-color: var(--header-color) !important;
  color: var(--text-color) !important;
  border-bottom-color: var(--border-color) !important;
}

.el-dialog__body {
  background-color: var(--header-color) !important;
  color: var(--text-color) !important;
}

.el-dialog__footer {
  background-color: var(--header-color) !important;
  border-top-color: var(--border-color) !important;
}

/* 下拉菜单样式 */
.el-dropdown-menu {
  background-color: var(--header-color) !important;
  border-color: var(--border-color) !important;
  box-shadow: 0 2px 12px var(--shadow-color) !important;
}

.el-dropdown-menu__item {
  color: var(--text-color) !important;
  background-color: var(--header-color) !important;
}

.el-dropdown-menu__item:hover {
  background-color: var(--hover-color) !important;
  color: var(--primary-color) !important;
}

.el-dropdown-menu__item--divided {
  border-top-color: var(--border-color) !important;
}

/* 标签样式 */
.el-tag {
  background-color: var(--hover-color) !important;
  border-color: var(--border-color) !important;
  color: var(--text-color) !important;
}

.el-tag--success {
  background-color: #67c23a !important;
  border-color: #67c23a !important;
  color: #ffffff !important;
}

.el-tag--warning {
  background-color: #e6a23c !important;
  border-color: #e6a23c !important;
  color: #ffffff !important;
}

.el-tag--info {
  background-color: #909399 !important;
  border-color: #909399 !important;
  color: #ffffff !important;
}

/* 输入框样式 */
.el-input__inner {
  background-color: var(--header-color) !important;
  border-color: var(--border-color) !important;
  color: var(--text-color) !important;
}

.el-input__inner:focus {
  border-color: var(--primary-color) !important;
}

/* 选择器样式 */
.el-select .el-input__inner {
  background-color: var(--header-color) !important;
  border-color: var(--border-color) !important;
  color: var(--text-color) !important;
}

/* 表单样式 */
.el-form-item__label {
  color: var(--text-color) !important;
}

.el-form-item__content {
  color: var(--text-color) !important;
}

/* 文本域样式 */
.el-textarea__inner {
  background-color: var(--header-color) !important;
  border-color: var(--border-color) !important;
  color: var(--text-color) !important;
}

.el-textarea__inner:focus {
  border-color: var(--primary-color) !important;
}

/* 颜色选择器样式 */
.el-color-picker {
  background-color: var(--header-color) !important;
}

.el-color-picker__trigger {
  border-color: var(--border-color) !important;
}

/* 下拉选项样式 */
.el-select-dropdown {
  background-color: var(--header-color) !important;
  border-color: var(--border-color) !important;
}

.el-select-dropdown__item {
  color: var(--text-color) !important;
  background-color: var(--header-color) !important;
}

.el-select-dropdown__item:hover {
  background-color: var(--hover-color) !important;
  color: var(--primary-color) !important;
}

.el-select-dropdown__item.selected {
  background-color: var(--primary-color) !important;
  color: #ffffff !important;
}

/* 表格行选中状态 */
.el-table__row.current-row {
  background-color: var(--hover-color) !important;
}

.el-table__row.selected {
  background-color: var(--hover-color) !important;
}

/* 表格条纹样式 */
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: var(--hover-color) !important;
}

/* 空状态样式 */
.el-empty {
  color: var(--secondary-color) !important;
}

.el-empty__description {
  color: var(--secondary-color) !important;
}

/* 加载状态样式 */
.el-loading-mask {
  background-color: rgba(0, 0, 0, 0.8) !important;
}

.el-loading-spinner {
  color: var(--primary-color) !important;
}

/* 消息提示样式 */
.el-message {
  background-color: var(--header-color) !important;
  border-color: var(--border-color) !important;
  color: var(--text-color) !important;
}

.el-message .el-message__content {
  color: var(--text-color) !important;
}

.el-message--success {
  background-color: #67c23a !important;
  border-color: #67c23a !important;
  color: #ffffff !important;
}

.el-message--success .el-message__content {
  color: #ffffff !important;
}

.el-message--warning {
  background-color: #e6a23c !important;
  border-color: #e6a23c !important;
  color: #ffffff !important;
}

.el-message--warning .el-message__content {
  color: #ffffff !important;
}

.el-message--error {
  background-color: #f56c6c !important;
  border-color: #f56c6c !important;
  color: #ffffff !important;
}

.el-message--error .el-message__content {
  color: #ffffff !important;
}

.el-message--info {
  background-color: #909399 !important;
  border-color: #909399 !important;
  color: #ffffff !important;
}

.el-message--info .el-message__content {
  color: #ffffff !important;
}

/* 消息提示图标样式 */
.el-message .el-message__icon {
  color: inherit !important;
}

.el-message--success .el-message__icon {
  color: #ffffff !important;
}

.el-message--warning .el-message__icon {
  color: #ffffff !important;
}

.el-message--error .el-message__icon {
  color: #ffffff !important;
}

.el-message--info .el-message__icon {
  color: #ffffff !important;
}

/* 消息提示关闭按钮样式 */
.el-message .el-message__closeBtn {
  color: inherit !important;
}

.el-message--success .el-message__closeBtn {
  color: #ffffff !important;
}

.el-message--warning .el-message__closeBtn {
  color: #ffffff !important;
}

.el-message--error .el-message__closeBtn {
  color: #ffffff !important;
}

.el-message--info .el-message__closeBtn {
  color: #ffffff !important;
}

/* 通知样式 */
.el-notification {
  background-color: var(--header-color) !important;
  border-color: var(--border-color) !important;
  color: var(--text-color) !important;
}

.el-notification__title {
  color: var(--text-color) !important;
}

.el-notification__content {
  color: var(--secondary-color) !important;
}

/* 分页样式 */
.el-pagination {
  color: var(--text-color) !important;
}

.el-pagination .el-pager li {
  background-color: var(--header-color) !important;
  color: var(--text-color) !important;
  border-color: var(--border-color) !important;
}

.el-pagination .el-pager li:hover {
  color: var(--primary-color) !important;
}

.el-pagination .el-pager li.active {
  background-color: var(--primary-color) !important;
  color: #ffffff !important;
}

.el-pagination .btn-prev,
.el-pagination .btn-next {
  background-color: var(--header-color) !important;
  color: var(--text-color) !important;
  border-color: var(--border-color) !important;
}

.el-pagination .btn-prev:hover,
.el-pagination .btn-next:hover {
  color: var(--primary-color) !important;
}
</style>
