<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const dataMotor = ref([])
const dataPallet = ref([])
const dataSafConv = ref([])
const dataRoll = ref([])
const dataArm = ref([])
const dataSafetyCamera = ref(0)
const alarms = ref([]);

const normal = 70
const warning = 60

const fetchMotorData = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/motor_conveyor`)
    dataMotor.value = response.data.data
  } catch (error) {
    console.error('Error fetching motor conveyor data:', error)
  }
}

const fetchPalletData = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/pallet_dispenser`)
    dataPallet.value = response.data.data
  } catch (error) {
    console.error('Error fetching pallet dispenser data:', error)
  }
}

const fetchSafConvData = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/safety_conveyor`)
    dataSafConv.value = response.data.data
  } catch (error) {
    console.error('Error fetching safety conveyor data:', error)
  }
}

const fetchRollData = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/roll`)
    dataRoll.value = response.data.data
  } catch (error) {
    console.error('Error fetching roll data:', error)
  }
}

const fetchArmData = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/arm_robot`)
    dataArm.value = response.data.data
  } catch (error) {
    console.error('Error fetching arm robot data:', error)
  }
}

const fetchSafetyCameraData = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/safety_camera_detection`)
    const data = response.data.data

    if (Array.isArray(data) && data.length > 0) {
      const firstItem = data[0]

      if (firstItem?.status !== undefined) {
        dataSafetyCamera.value = firstItem.status
      } else {
        console.warn("Warning: 'status' field is missing in firstItem.")
      }
    } else {
      console.warn('Warning: API returned an empty or invalid data array.')
    }
  } catch (error) {
    console.error('Error fetching safety camera data:', error)
  }
}

const fetchAlarms = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/alarms`);
    if (response.status === 200) {
      alarms.value = response.data;
    }
  } catch (error) {
    console.error("Gagal mengambil data alarm:", error);
  }
};

const isAlarmActive = (parentName) => {
  return alarms.value.some(alarm => alarm.parent === parentName);
};

let pollingIntervalMotor = null
let pollingIntervalPallet = null
let pollingIntervalSafConv = null
let pollingIntervalRoll = null
let pollingIntervalArm = null
let pollingIntervalSafetyCamera = null
let pollingIntervalAlarms = null;

onMounted(() => {
  fetchSafConvData()
  fetchMotorData()
  fetchPalletData()
  fetchRollData()
  fetchArmData()
  fetchSafetyCameraData()
  fetchAlarms()

  pollingIntervalMotor = setInterval(fetchMotorData, 1000)
  pollingIntervalPallet = setInterval(fetchPalletData, 1000)
  pollingIntervalSafConv = setInterval(fetchSafConvData, 1000)
  pollingIntervalRoll = setInterval(fetchRollData, 1000)
  pollingIntervalArm = setInterval(fetchArmData, 1000)
  pollingIntervalSafetyCamera = setInterval(fetchSafetyCameraData, 1000)
  pollingIntervalAlarms = setInterval(fetchAlarms, 1000);
})

onUnmounted(() => {
  if (pollingIntervalSafConv) {
    clearInterval(pollingIntervalSafConv)
  }
  if (pollingIntervalMotor) {
    clearInterval(pollingIntervalMotor)
  }
  if (pollingIntervalPallet) {
    clearInterval(pollingIntervalPallet)
  }
  if (pollingIntervalRoll) {
    clearInterval(pollingIntervalRoll)
  }
  if (pollingIntervalArm) {
    clearInterval(pollingIntervalArm)
  }
  if (pollingIntervalSafetyCamera) {
    clearInterval(pollingIntervalSafetyCamera)
  }
  if (pollingIntervalAlarms) {
    clearInterval(pollingIntervalAlarms)
  }
})
</script>

<template>
  <section>
    <div>
      <video autoplay muted loop playsinline class="background-video">
        <source src="../assets/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <section>
      <div class="box">
        <div class="title">Safety Camera Detection</div>
        <hr />
        <div class="content">
          <div class="status-box">
            <div class="status normal">
              <span> SAFE </span>
              <div class="indicator" :class="{ blink: dataSafetyCamera === '0' }"></div>
            </div>
            <div class="status fault">
              <span> DANGER </span>
              <div class="indicator" :class="{ blink: dataSafetyCamera === '1' }"></div>
            </div>
          </div>
          <div class="camera-box">
            <div class="camera">
              <img alt="Camera image" height="50" src="../assets/cctv.png" width="100" />
            </div>
          </div>
        </div>
        <router-link class="detail-button" to="/safety_camera_detail">DETAIL</router-link>
      </div>
    </section>
    <section>
      <div class="box-motor">
        <div v-if="isAlarmActive('Motor Conveyor')" class="popup-alarm">⚠️ ALARM ACTIVE</div>
        <div class="motor-universal">
          <div class="title-motor">Overview Motor Conveyor</div>
          <hr />
          <div class="content-motor">
            <div class="status-box-motor">
              <div class="status-motor normal">
                <span> NORMAL </span>
                <div class="indicator" :class="{ blink: dataMotor.value >= normal }"></div>
              </div>
              <div class="status-motor warning">
                <span> WARNING </span>
                <div
                  class="indicator"
                  :class="{ blink: dataMotor.value >= warning && dataMotor.value < normal }"
                ></div>
              </div>
              <div class="status-motor fault">
                <span> FAULT </span>
                <div class="indicator" :class="{ blink: dataMotor.value < warning }"></div>
              </div>
            </div>
            <div class="camera-box-motor">
              <div class="camera-motor">
                <span>{{ dataMotor.value }}%</span>
              </div>
              <router-link class="detail-button-motor" to="/detailmotorconveyor">DETAIL</router-link>
            </div>
          </div>
          <div class="arrow-long-right"></div>
        </div>
      </div>
    </section>
    <section>
      <div class="box-motor-p">
        <div v-if="isAlarmActive('Safety Conveyor')" class="popup-alarm">⚠️ ALARM ACTIVE</div>
        <div class="motor-universal">
          <div class="title-motor">Overview Safety Conveyor</div>
          <hr />
          <div class="content-motor">
            <div class="status-box-motor">
              <div class="status-motor normal">
                <span> NORMAL </span>
                <div class="indicator" :class="{ blink: dataSafConv.value >= normal }"></div>
              </div>
              <div class="status-motor warning">
                <span> WARNING </span>
                <div
                  class="indicator"
                  :class="{ blink: dataSafConv.value >= warning && dataSafConv.value < normal }"
                ></div>
              </div>
              <div class="status-motor fault">
                <span> FAULT </span>
                <div class="indicator" :class="{ blink: dataSafConv.value < warning }"></div>
              </div>
            </div>
            <div class="camera-box-motor">
              <div class="camera-motor">
                <span>{{ dataSafConv.value }}%</span>
              </div>
              <router-link class="detail-button-motor" to="/detailsafetyconveyor">DETAIL</router-link>
            </div>
          </div>
          <div class="arrow-long-left"></div>
        </div>
      </div>
    </section>
    <section>
      <div class="box-motor-s">
        <div v-if="isAlarmActive('Pallet Dispenser')" class="popup-alarm">⚠️ ALARM ACTIVE</div>
        <div class="motor-universal">
          <div class="title-motor">Overview Pallet Dispenser</div>
          <hr />
          <div class="content-motor">
            <div class="status-box-motor">
              <div class="status-motor normal">
                <span> NORMAL </span>
                <div class="indicator" :class="{ blink: dataPallet.value >= normal }"></div>
              </div>
              <div class="status-motor warning">
                <span> WARNING </span>
                <div
                  class="indicator"
                  :class="{ blink: dataPallet.value >= warning && dataPallet.value < normal }"
                ></div>
              </div>
              <div class="status-motor fault">
                <span> FAULT </span>
                <div class="indicator" :class="{ blink: dataPallet.value < warning }"></div>
              </div>
            </div>
            <div class="camera-box-motor">
              <div class="camera-motor">
                <span>{{ dataPallet.value }}%</span>
              </div>
              <router-link class="detail-button-motor" to="/detailpalletedispenser"
                >DETAIL</router-link
              >
            </div>
          </div>
          <div class="arrow-long-right"></div>
        </div>
      </div>
    </section>
    <section>
      <div class="box-motor-r">
        <div v-if="isAlarmActive('Roll')" class="popup-alarm">⚠️ ALARM ACTIVE</div>
        <div class="motor-universal">
          <div class="title-motor">Overview Roll</div>
          <hr />
          <div class="content-motor">
            <div class="status-box-motor">
              <div class="status-motor normal">
                <span> NORMAL </span>
                <div class="indicator" :class="{ blink: dataRoll.value >= normal }"></div>
              </div>
              <div class="status-motor warning">
                <span> WARNING </span>
                <div
                  class="indicator"
                  :class="{ blink: dataRoll.value >= warning && dataRoll.value < normal }"
                ></div>
              </div>
              <div class="status-motor fault">
                <span> FAULT </span>
                <div class="indicator" :class="{ blink: dataRoll.value < warning }"></div>
              </div>
            </div>
            <div class="camera-box-motor">
              <div class="camera-motor">
                <span>{{ dataRoll.value }}%</span>
              </div>
              <router-link class="detail-button-motor" to="/detailroll">DETAIL</router-link>
            </div>
          </div>
          <div class="arrow-long-left"></div>
        </div>
      </div>
    </section>
    <section>
      <div class="box-motor-a">
        <div v-if="isAlarmActive('Arm Robot')" class="popup-alarm">⚠️ ALARM ACTIVE</div>
        <div class="motor-universal">
          <div class="title-motor">Overview Arm Robot</div>
          <hr />
          <div class="content-motor">
            <div class="status-box-motor">
              <div class="status-motor normal">
                <span> NORMAL </span>
                <div class="indicator" :class="{ blink: dataArm.value >= normal }"></div>
              </div>
              <div class="status-motor warning">
                <span> WARNING </span>
                <div
                  class="indicator"
                  :class="{ blink: dataArm.value >= warning && dataArm.value < normal }"
                ></div>
              </div>
              <div class="status-motor fault">
                <span> FAULT </span>
                <div class="indicator" :class="{ blink: dataArm.value < warning }"></div>
              </div>
            </div>
            <div class="camera-box-motor">
              <div class="camera-motor">
                <span>{{ dataArm.value }}%</span>
              </div>
              <router-link class="detail-button-motor" to="/detailarmrobot">DETAIL</router-link>
            </div>
          </div>
          <div class="arrow-long-left"></div>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
.popup-alarm {
  text-align: center;
  background-color: red;
  color: white;
  padding: 5px 3px;
  border-radius: 3px;
  width: 11rem;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.a-motor-conveyor{
  position: absolute;
  top: 43.5vh;
  left: 4vw;
  transform: translate(-50%, -50%);
}

.a-safety-conveyor{
  position: absolute;
  top: 65.5vh;
  left: 44vw;
  transform: translate(-50%, -50%);
}

.a-overview-pallet{
  position: absolute;
  top: 65.5vh;
  left: 15vw;
  transform: translate(-50%, -50%);
}

.a-roll{
  position: absolute;
  top: 46.5vh;
  left: 54vw;
  transform: translate(-50%, -50%);
}

.a-arm{
  /* position: absolute;
  top: 25.5vh;
  left: 51vw;
  transform: translate(-50%, -50%); */
}

.arrow-long-right {
  position: absolute;
  top: 50%;
  right: -50px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
}

.arrow-long-right::after {
  content: '';
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 15px solid #000000;
}

.arrow-long-right::before {
  content: '';
  width: 30px;
  height: 10px;
  background-color: #000000;
  margin-right: -1px;
}

.arrow-long-left {
  position: absolute;
  top: 50%;
  left: -50px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
}

.arrow-long-left::before {
  content: '';
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 15px solid #000000;
}

.arrow-long-left::after {
  content: '';
  width: 30px;
  height: 10px;
  background-color: #000000;
  margin-left: -1px;
}
.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 97vw;
  height: 85vh;
}
section {
  display: flex;
  position: relative;
  height: 100%;
}
img.palletizer {
  position: absolute;
  height: 80vh;
  width: 43vw;
  z-index: -1;
  top: 40vh;
  left: 48vw;
  transform: translate(-50%, -50%);
}
hr {
  background-color: #000000;
  color: #000000;
  height: 2px;
  width: 100%;
  border: none;
  margin: 3px;
}
.box {
  margin-top: 2vh;
  background-color: #00ffff;
  border: 2px solid #000000;
  padding: 10px;
  width: 15vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 1vw;
  font-weight: bold;
  width: 100%;
}
.content {
  display: flex;
  align-items: center;
}
.status-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 1vw;
}
.status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2px 0;
  padding: 4px;
  border: 1px solid #000000;
  background-color: #c0c0c0;
  width: 100%;
  font-size: 1vw;
}
.status .indicator {
  width: 1vw;
  height: 1vw;
  border-radius: 50%;
}
.normal .indicator {
  background-color: #00ff00;
}
.warning .indicator {
  background-color: #ffff00;
}
.fault .indicator {
  background-color: #ff0000;
}
.blink {
  animation: blinker 0.7s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
.camera-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.camera img {
  width: 6vw;
  height: 10vh;
}
.camera span {
  background-color: white;
  font-size: 2vw;
  padding: 5px;
}
.detail-button {
  background-color: #c0c0c0;
  border: 1px solid #000000;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 1vw;
  text-decoration: none;
  color: #000000;
}
.box-motor {
  position: absolute;
  top: 53vh;
  left: 4vw;
  transform: translate(-50%, -50%);
}
.title-motor {
  font-size: 10px;
  font-weight: bold;
  width: 100%;
}
.content-motor {
  display: flex;
  align-items: center;
}
.status-box-motor {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 20px;
}
.status-motor {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2px 0;
  padding: 4px;
  border: 1px solid #000000;
  background-color: #c0c0c0;
  width: 100%;
  font-size: 10px;
}
.status-motor .indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.camera-box-motor {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.camera-motor span {
  background-color: white;
  font-size: 23px;
  padding: 5px;
}
.detail-button-motor {
  background-color: #c0c0c0;
  border: 1px solid #000000;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 10px;
  margin: 9px 0;
  text-decoration: none;
  color: #000000;
}
.box-motor-p {
  position: absolute;
  top: 75vh;
  left: 44vw;
  transform: translate(-50%, -50%);
}
.box-motor-s {
  position: absolute;
  top: 75vh;
  left: 15vw;
  transform: translate(-50%, -50%);
}
.box-motor-r {
  position: absolute;
  top: 56vh;
  left: 54vw;
  transform: translate(-50%, -50%);
}
.box-motor-a {
  position: absolute;
  top: 35vh;
  left: 51vw;
  transform: translate(-50%, -50%);
}

.motor-universal{
  background-color: #0080ff;
  border: 2px solid #000000;
  padding: 2px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
