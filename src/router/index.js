import { createRouter, createWebHistory } from 'vue-router'
import DesktopView from '../views/DesktopView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'desktop',
      component: DesktopView,
      meta: { title: 'Desktop' },
    },

    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
      meta: { title: 'User Management' },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      meta: { title: 'Settings' },
    },
    {
      path: '/projectsdetails',
      name: 'projectsdetails',
      component: () => import('../views/ProjectsDetailsView.vue'),
      meta: { title: 'Projects Details' },
    },
    {
      path: '/projectsdetails/:projectId',
      name: 'project-detail',
      component: () => import('../views/ProjectsDetailsView.vue'),
      meta: { title: 'Project Detail' },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { title: 'Profile' },
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => import('../views/TimelineView.vue'),
      meta: { title: 'Timeline' },
    },
  ],
})

export default router
