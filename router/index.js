import { createRouter, createWebHashHistory } from 'vue-router'

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
    component: MainApp,
  },
  {
    path: '/detailroll',
    name: 'DetailRoll',
    component: DetailRoll,
  },
  {
    path: '/detailmotorconveyor',
    name: 'MotorConveyorDetail',
    component: MotorConveyorDetail,
  },
  {
    path: '/detailsafetyconveyor',
    name: 'SafetyConveyorDetail',
    component: SafetyConveyorDetail,
  },
  {
    path: '/detailpalletedispenser',
    name: 'PalleteDispenserDetail',
    component: PalleteDispenserDetail,
  },
  {
    path: '/detailarmrobot',
    name: 'ArmRobotDetail',
    component: ArmRobotDetail,
  },
  {
    path: '/historypage',
    name: 'HistoryPage',
    component: HistoryPage,
  },
  {
    path: '/alarmpage',
    name: 'AlarmPage',
    component: AlarmPage,
  },
  {
    path: '/safety_camera_detail',
    name: 'SafetyCameraDetail',
    component: SafetyCameraDetail,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
