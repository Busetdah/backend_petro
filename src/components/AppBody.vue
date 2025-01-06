<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

const dataMotor = ref([])
const dataPallet = ref([])
const dataSafConv = ref([])
const dataRoll = ref([])
const dataArm = ref([])

const normal = 40
const warning = 30

const fetchMotorData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/motor_conveyor')
    dataMotor.value = response.data.data
    console.log(dataMotor.value)
  } catch (error) {
    console.error('Error fetching motor conveyor data:', error)
  }
}

const fetchPalletData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/pallet_dispenser')
    dataPallet.value = response.data.data
  } catch (error) {
    console.error('Error fetching pallet dispenser data:', error)
  }
}

const fetchSafConvData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/safety_conveyor')
    dataSafConv.value = response.data.data
  } catch (error) {
    console.error('Error fetching pallet dispenser data:', error)
  }
}

const fetchRollData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/roll')
    dataRoll.value = response.data.data
  } catch (error) {
    console.error('Error fetching pallet dispenser data:', error)
  }
}

const fetchArmData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/arm_robot')
    dataArm.value = response.data.data
  } catch (error) {
    console.error('Error fetching pallet dispenser data:', error)
  }
}

let pollingIntervalMotor = null
let pollingIntervalPallet = null
let pollingIntervalSafConv = null
let pollingIntervalRoll = null
let pollingIntervalArm = null

onMounted(() => {
  fetchSafConvData()
  fetchMotorData()
  fetchPalletData()
  fetchRollData()
  fetchArmData()

  pollingIntervalMotor = setInterval(fetchMotorData, 1000)
  pollingIntervalPallet = setInterval(fetchPalletData, 1000)
  pollingIntervalSafConv = setInterval(fetchSafConvData, 1000)
  pollingIntervalRoll = setInterval(fetchRollData, 1000)
  pollingIntervalArm = setInterval(fetchArmData, 1000)
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
})
</script>

<template>
  <section>
    <img class="palletizer" src="../assets/palletizer.png" alt="" />
    <section>
      <div class="box">
        <div class="title">Safety Camera Detection</div>
        <hr />
        <div class="content">
          <div class="status-box">
            <div class="status normal">
              <span> NORMAL </span>
              <div class="indicator"></div>
            </div>
            <div class="status warning">
              <span> WARNING </span>
              <div class="indicator"></div>
            </div>
            <div class="status fault">
              <span> FAULT </span>
              <div class="indicator"></div>
            </div>
          </div>
          <div class="camera-box">
            <div class="camera">
              <img alt="Camera image" height="50" src="../assets/cctv.png" width="100" />
            </div>
          </div>
        </div>
        <div class="detail-button">DETAIL</div>
      </div>
    </section>
    <section>
      <div class="box-motor">
        <div class="title-motor">Overview Motor Conveyor</div>
        <hr />
        <div class="content-motor">
          <div class="status-box-motor">
            <div class="status-motor normal">
              <span> NORMAL </span>
              <div class="indicator" :class="{ blink: dataMotor.value > normal }"></div>
            </div>
            <div class="status-motor warning">
              <span> WARNING </span>
              <div
                class="indicator"
                :class="{ blink: dataMotor.value > warning && dataMotor.value < normal }"
              ></div>
            </div>
            <div class="status-motor fault">
              <span> FAULT </span>
              <div class="indicator" :class="{ blink: dataMotor.value < warning }"></div>
            </div>
          </div>
          <div class="camera-box-motor">
            <div class="camera-motor">
              <span>{{ dataMotor.value }}</span>
            </div>
            <router-link class="detail-button-motor" to="/detailmotorconveyor">DETAIL</router-link>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="box-motor-p">
        <div class="title-motor">Overview Pallet Dispenser</div>
        <hr />
        <div class="content-motor">
          <div class="status-box-motor">
            <div class="status-motor normal">
              <span> NORMAL </span>
              <div class="indicator" :class="{ blink: dataPallet.value > normal }"></div>
            </div>
            <div class="status-motor warning">
              <span> WARNING </span>
              <div
                class="indicator"
                :class="{ blink: dataPallet.value > warning && dataPallet.value < normal }"
              ></div>
            </div>
            <div class="status-motor fault">
              <span> FAULT </span>
              <div class="indicator" :class="{ blink: dataPallet.value < warning }"></div>
            </div>
          </div>
          <div class="camera-box-motor">
            <div class="camera-motor">
              <span>{{ dataPallet.value }}</span>
            </div>
            <router-link class="detail-button-motor" to="/detailpalletedispenser"
              >DETAIL</router-link
            >
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="box-motor-s">
        <div class="title-motor">Overview Safety Conveyor</div>
        <hr />
        <div class="content-motor">
          <div class="status-box-motor">
            <div class="status-motor normal">
              <span> NORMAL </span>
              <div class="indicator" :class="{ blink: dataSafConv.value > normal }"></div>
            </div>
            <div class="status-motor warning">
              <span> WARNING </span>
              <div
                class="indicator"
                :class="{ blink: dataSafConv.value > warning && dataSafConv.value < normal }"
              ></div>
            </div>
            <div class="status-motor fault">
              <span> FAULT </span>
              <div class="indicator" :class="{ blink: dataSafConv.value < warning }"></div>
            </div>
          </div>
          <div class="camera-box-motor">
            <div class="camera-motor">
              <span>{{ dataSafConv.value }}</span>
            </div>
            <router-link class="detail-button-motor" to="/detailsafetyconveyor">DETAIL</router-link>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="box-motor-r">
        <div class="title-motor">Overview Roll</div>
        <hr />
        <div class="content-motor">
          <div class="status-box-motor">
            <div class="status-motor normal">
              <span> NORMAL </span>
              <div class="indicator" :class="{ blink: dataRoll.value > normal }"></div>
            </div>
            <div class="status-motor warning">
              <span> WARNING </span>
              <div
                class="indicator"
                :class="{ blink: dataRoll.value > warning && dataRoll.value < normal }"
              ></div>
            </div>
            <div class="status-motor fault">
              <span> FAULT </span>
              <div class="indicator" :class="{ blink: dataRoll.value < warning }"></div>
            </div>
          </div>
          <div class="camera-box-motor">
            <div class="camera-motor">
              <span>{{ dataRoll.value }}</span>
            </div>
            <router-link class="detail-button-motor" to="/detailroll">DETAIL</router-link>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="box-motor-a">
        <div class="title-motor">Overview Arm Robot</div>
        <hr />
        <div class="content-motor">
          <div class="status-box-motor">
            <div class="status-motor normal">
              <span> NORMAL </span>
              <div class="indicator" :class="{ blink: dataArm.value > normal }"></div>
            </div>
            <div class="status-motor warning">
              <span> WARNING </span>
              <div
                class="indicator"
                :class="{ blink: dataArm.value > warning && dataArm.value < normal }"
              ></div>
            </div>
            <div class="status-motor fault">
              <span> FAULT </span>
              <div class="indicator" :class="{ blink: dataArm.value < warning }"></div>
            </div>
          </div>
          <div class="camera-box-motor">
            <div class="camera-motor">
              <span>{{ dataArm.value }}</span>
            </div>
            <router-link class="detail-button-motor" to="/detailarmrobot">DETAIL</router-link>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
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
}
.box-motor {
  position: absolute;
  top: 47vh;
  left: 5vw;
  transform: translate(-50%, -50%);
  background-color: #0080ff;
  border: 2px solid #000000;
  padding: 2px;
  width: 9rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  left: 40vw;
  transform: translate(-50%, -50%);
  background-color: #0080ff;
  border: 2px solid #000000;
  padding: 2px;
  width: 9rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box-motor-s {
  position: absolute;
  top: 75vh;
  left: 12vw;
  transform: translate(-50%, -50%);
  background-color: #0080ff;
  border: 2px solid #000000;
  padding: 2px;
  width: 9rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box-motor-r {
  position: absolute;
  top: 62vh;
  left: 58vw;
  transform: translate(-50%, -50%);
  background-color: #0080ff;
  border: 2px solid #000000;
  padding: 2px;
  width: 9rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box-motor-a {
  position: absolute;
  top: 35vh;
  left: 58vw;
  transform: translate(-50%, -50%);
  background-color: #0080ff;
  border: 2px solid #000000;
  padding: 2px;
  width: 9rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
