import Login from '@/components/views/login.vue'
import ShapePuzzle from '@/components/views/ShapePuzzle.vue'
import Signup from '@/components/views/Signup.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AnimalExplorer from '../components/FirstGradeComponents/AnimalExplorer.vue'
import EmojiGame from '../components/FirstGradeComponents/EmojiGame.vue'
import FirstGradeGame from '../components/FirstGradeComponents/FirstGradeGame.vue'
import TriangleCountGame from '../components/FirstGradeComponents/TriangleCountGame.vue'
import Dashboard from '../components/views/Dashboard.vue'
import Profile from '../components/views/Profile.vue'
const routes = [
  { path: '/', name: 'login2', component: Login },
  { path: '/login', name: 'login', component: Login },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/kindergarten', name: 'Kindergarten', component: EmojiGame },
  { path: '/first-grade', name: 'FirstGrade', component: FirstGradeGame },
  { path: '/triangles', name: 'Triangles', component: TriangleCountGame },
  { path: '/shapepuzzle', name: 'ShapePuzzle', component: ShapePuzzle },
  {
    path: '/animalExplorer',
    name: 'AnimalExplorer',
    component: AnimalExplorer,
  },

  // Fifth Grade Games
  {
    path: '/fifth-grade/game1',
    component: () =>
      import('@/components/FifthGradeComponents/PrimeNumbersGame.vue'),
  },
  {
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
  },
  {
    path: '/fifth-grade/game7',
    component: () =>
      import('@/components/FifthGradeComponents/FractionPizza.vue'),
  },
  {
    path: '/fifth-grade/game8',
    component: () =>
      import('@/components/FifthGradeComponents/MultiplicationRace.vue'),
  },
  {
    path: '/fifth-grade/game9',
    component: () =>
      import('@/components/FifthGradeComponents/DecimalQuest.vue'),
  },
  {
    path: '/fifth-grade/game11',
    component: () =>
      import('@/components/FifthGradeComponents/CoordinateBattleship.vue'),
  },
  {
    path: '/fifth-grade/game13',
    component: () =>
      import('@/components/FirstGradeComponents/DinosaurExplorer.vue'),
  },
  {
    path: '/fifth-grade/game14',
    component: () =>
      import('@/components/FifthGradeComponents/ScienceExplorer.vue'),
  },
  {
    path: '/fifth-grade/game15',
    component: () =>
      import('@/components/FifthGradeComponents/ReadingExplorer.vue'),
  },
  {
    path: '/fifth-grade/game16',
    component: () =>
      import('@/components/FifthGradeComponents/MathPlayground.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
