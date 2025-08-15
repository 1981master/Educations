import ShapePuzzle from '@/components/views/ShapePuzzle.vue'
import { createRouter, createWebHistory } from 'vue-router'
import EmojiGame from '../components/FirstGradeComponents/EmojiGame.vue'
import Dashboard from '../components/views/Dashboard.vue'
import FirstGradeGame from '../components/views/FirstGradeGame.vue'
import TriangleCountGame from '../components/views/TriangleCountGame.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/kindergarten', name: 'Kindergarten', component: EmojiGame },
  { path: '/first-grade', name: 'FirstGrade', component: FirstGradeGame },
  { path: '/triangles', name: 'Triangles', component: TriangleCountGame },
  { path: '/shapepuzzle', name: 'ShapePuzzle', component: ShapePuzzle },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
