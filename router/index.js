import { createRouter, createWebHistory } from 'vue-router'

// Import halaman-halaman Anda
import MainApp from '@/MainApp.vue'
import DetailRoll from '@/DetailRoll.vue'
import MotorConveyorDetail from '@/MotorConveyorDetail.vue'
import SafetyConveyorDetail from '@/SafetyConveyorDetail.vue'
import PalleteDispenserDetail from '@/PalleteDispenserDetail.vue'
import ArmRobotDetail from '@/ArmRobotDetail.vue'
import HistoryPage from '@/HistoryPage.vue'
import AlarmPage from '@/AlarmPage.vue'
import SafetyCameraDetail from '@/SafetyCameraDetail.vue'

const routes = [
  {
    path: '/',
    name: 'MainApp',
    component: MainApp, // Halaman lain
  },
  {
    path: '/detailroll',
    name: 'DetailRoll',
    component: DetailRoll, // Halaman lain
  },
  {
    path: '/detailmotorconveyor',
    name: 'MotorConveyorDetail',
    component: MotorConveyorDetail, // Halaman lain
  },
  {
    path: '/detailsafetyconveyor',
    name: 'SafetyConveyorDetail',
    component: SafetyConveyorDetail, // Halaman lain
  },
  {
    path: '/detailpalletedispenser',
    name: 'PalleteDispenserDetail',
    component: PalleteDispenserDetail, // Halaman lain
  },
  {
    path: '/detailarmrobot',
    name: 'ArmRobotDetail',
    component: ArmRobotDetail, // Halaman lain
  },
  {
    path: '/historypage',
    name: 'HistoryPage',
    component: HistoryPage, // Halaman lain
  },
  {
    path: '/alarmpage',
    name: 'AlarmPage',
    component: AlarmPage, // Halaman lain
  },
  {
    path: '/safety_camera_detail',
    name: 'SafetyCameraDetail',
    component: SafetyCameraDetail, // Halaman lain
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
