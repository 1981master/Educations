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
  {
    path: '/fifth-grade/game2',
    component: () =>
      import('@/components/FifthGradeComponents/PrimeNumbersGame.vue'),
  },

  /*{
    path: '/fifth-grade/game2',
    component: () =>
      import('@/components/FifthGradeComponents/FractionsPuzzle.vue'),
  },
  {
    path: '/fifth-grade/game3',
    component: () =>
      import('@/components/FifthGradeComponents/GeometryExplorer.vue'),
  },
  {
    path: '/fifth-grade/game4',
    component: () =>
      import('@/components/FifthGradeComponents/MathRiddles.vue'),
  },
  {
    path: '/fifth-grade/game5',
    component: () => import('@/components/FifthGradeComponents/LogicMaze.vue'),
  },
  {
    path: '/fifth-grade/game6',
    component: () =>
      import('@/components/FifthGradeComponents/EquationBalance.vue'),
  },*/
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
