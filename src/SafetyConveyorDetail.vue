<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import axios from 'axios'

use([CanvasRenderer, LineChart, GridComponent, TitleComponent, TooltipComponent, LegendComponent])

const chartMotor1 = ref({
  title: {
    text: 'Motor 1',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Temperature', 'Vibration', 'Speed', 'Air Pressure'],
    top: '8%',
    right: '1%',
    itemWidth: 16,
    itemHeight: 8,
    textStyle: {
      fontSize: 12,
    },
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      rotate: 45,
      fontSize: 10,
    },
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Temperature',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'blue',
      },
    },
    {
      name: 'Vibration',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'red',
      },
    },
    {
      name: 'Speed',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'green',
      },
    },
    {
      name: 'Air Pressure',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'black',
      },
    },
  ],
})

const chartMotor2 = ref({
  title: {
    text: 'Motor 2',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Temperature', 'Vibration', 'Speed', 'Air Pressure'],
    top: '8%',
    right: '1%',
    itemWidth: 16,
    itemHeight: 8,
    textStyle: {
      fontSize: 12,
    },
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      rotate: 45,
      fontSize: 10,
    },
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Temperature',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'blue',
      },
    },
    {
      name: 'Vibration',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'red',
      },
    },
    {
      name: 'Speed',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'green',
      },
    },
    {
      name: 'Air Pressure',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'black',
      },
    },
  ],
})

const chartMotor3 = ref({
  title: {
    text: 'Motor 3',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Temperature', 'Vibration', 'Speed', 'Air Pressure'],
    top: '8%',
    right: '1%',
    itemWidth: 16,
    itemHeight: 8,
    textStyle: {
      fontSize: 12,
    },
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      rotate: 45,
      fontSize: 10,
    },
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Temperature',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'blue',
      },
    },
    {
      name: 'Vibration',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'red',
      },
    },
    {
      name: 'Speed',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'green',
      },
    },
    {
      name: 'Air Pressure',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'black',
      },
    },
  ],
})

const chartMotor4 = ref({
  title: {
    text: 'Motor 4',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Temperature', 'Vibration', 'Speed', 'Air Pressure'],
    top: '8%',
    right: '1%',
    itemWidth: 16,
    itemHeight: 8,
    textStyle: {
      fontSize: 12,
    },
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      rotate: 45,
      fontSize: 10,
    },
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Temperature',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'blue',
      },
    },
    {
      name: 'Vibration',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'red',
      },
    },
    {
      name: 'Speed',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'green',
      },
    },
    {
      name: 'Air Pressure',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'black',
      },
    },
  ],
})
const dataMotor1 = ref([])
const dataMotor2 = ref([])
const dataMotor3 = ref([])
const dataMotor4 = ref([])

const fetchMotor1Data = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/safety_conveyor_detail_motor1')
    dataMotor1.value = response.data.data
    const timeLabels = dataMotor1.value
      .slice() // Membuat salinan array agar tidak merusak data asli
      .reverse() // Membalik urutan data (dari terlama ke terbaru)
      .map((item) => {
        // Konversi ke objek Date
        const date = new Date(item.created_at)
        if (isNaN(date)) {
          return 'Invalid Date' // Penanganan jika nilai tidak valid
        }
        // Format waktu menjadi: YYYY-MM-DD HH:mm:ss
        return `${date.toISOString().split('T')[0]}\n${date.toTimeString().split(' ')[0]}`
      })
    const temperatureData = dataMotor1.value.map((item) => parseFloat(item.temperature)).reverse()
    const vibrationData = dataMotor1.value.map((item) => parseFloat(item.vibration)).reverse()
    const speedData = dataMotor1.value.map((item) => parseFloat(item.speed)).reverse()
    const airPressureData = dataMotor1.value.map((item) => parseFloat(item.airpressure)).reverse()

    chartMotor1.value.xAxis.data = timeLabels
    chartMotor1.value.series[0].data = temperatureData
    chartMotor1.value.series[1].data = vibrationData
    chartMotor1.value.series[2].data = speedData
    chartMotor1.value.series[3].data = airPressureData
  } catch (error) {
    console.error('Error fetching motor 1 data:', error)
  }
}

const fetchMotor2Data = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/safety_conveyor_detail_motor2')
    dataMotor2.value = response.data.data
    const timeLabels = dataMotor2.value
      .slice() // Membuat salinan array agar tidak merusak data asli
      .reverse() // Membalik urutan data (dari terlama ke terbaru)
      .map((item) => {
        // Konversi ke objek Date
        const date = new Date(item.created_at)
        if (isNaN(date)) {
          return 'Invalid Date' // Penanganan jika nilai tidak valid
        }
        // Format waktu menjadi: YYYY-MM-DD HH:mm:ss
        return `${date.toISOString().split('T')[0]}\n${date.toTimeString().split(' ')[0]}`
      })
    const temperatureData = dataMotor2.value.map((item) => parseFloat(item.temperature)).reverse()
    const vibrationData = dataMotor2.value.map((item) => parseFloat(item.vibration)).reverse()
    const speedData = dataMotor2.value.map((item) => parseFloat(item.speed)).reverse()
    const airPressureData = dataMotor2.value.map((item) => parseFloat(item.airpressure)).reverse()

    chartMotor2.value.xAxis.data = timeLabels
    chartMotor2.value.series[0].data = temperatureData
    chartMotor2.value.series[1].data = vibrationData
    chartMotor2.value.series[2].data = speedData
    chartMotor2.value.series[3].data = airPressureData
  } catch (error) {
    console.error('Error fetching motor 2 data:', error)
  }
}

const fetchMotor3Data = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/safety_conveyor_detail_motor3')
    dataMotor3.value = response.data.data
    const timeLabels = dataMotor3.value
      .slice() // Membuat salinan array agar tidak merusak data asli
      .reverse() // Membalik urutan data (dari terlama ke terbaru)
      .map((item) => {
        // Konversi ke objek Date
        const date = new Date(item.created_at)
        if (isNaN(date)) {
          return 'Invalid Date' // Penanganan jika nilai tidak valid
        }
        // Format waktu menjadi: YYYY-MM-DD HH:mm:ss
        return `${date.toISOString().split('T')[0]}\n${date.toTimeString().split(' ')[0]}`
      })
    const temperatureData = dataMotor3.value.map((item) => parseFloat(item.temperature)).reverse()
    const vibrationData = dataMotor3.value.map((item) => parseFloat(item.vibration)).reverse()
    const speedData = dataMotor3.value.map((item) => parseFloat(item.speed)).reverse()
    const airPressureData = dataMotor3.value.map((item) => parseFloat(item.airpressure)).reverse()

    chartMotor3.value.xAxis.data = timeLabels
    chartMotor3.value.series[0].data = temperatureData
    chartMotor3.value.series[1].data = vibrationData
    chartMotor3.value.series[2].data = speedData
    chartMotor3.value.series[3].data = airPressureData
  } catch (error) {
    console.error('Error fetching motor 3 data:', error)
  }
}
const fetchMotor4Data = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/safety_conveyor_detail_motor4')
    dataMotor4.value = response.data.data
    const timeLabels = dataMotor4.value
      .slice() // Membuat salinan array agar tidak merusak data asli
      .reverse() // Membalik urutan data (dari terlama ke terbaru)
      .map((item) => {
        // Konversi ke objek Date
        const date = new Date(item.created_at)
        if (isNaN(date)) {
          return 'Invalid Date' // Penanganan jika nilai tidak valid
        }
        // Format waktu menjadi: YYYY-MM-DD HH:mm:ss
        return `${date.toISOString().split('T')[0]}\n${date.toTimeString().split(' ')[0]}`
      })
    const temperatureData = dataMotor4.value.map((item) => parseFloat(item.temperature)).reverse()
    const vibrationData = dataMotor4.value.map((item) => parseFloat(item.vibration)).reverse()
    const speedData = dataMotor4.value.map((item) => parseFloat(item.speed)).reverse()
    const airPressureData = dataMotor4.value.map((item) => parseFloat(item.airpressure)).reverse()

    chartMotor4.value.xAxis.data = timeLabels
    chartMotor4.value.series[0].data = temperatureData
    chartMotor4.value.series[1].data = vibrationData
    chartMotor4.value.series[2].data = speedData
    chartMotor4.value.series[3].data = airPressureData
  } catch (error) {
    console.error('Error fetching motor 4 data:', error)
  }
}

let pollingIntervalMotor1 = null
let pollingIntervalMotor2 = null
let pollingIntervalMotor3 = null
let pollingIntervalMotor4 = null

onMounted(() => {
  fetchMotor1Data()
  fetchMotor2Data()
  fetchMotor3Data()
  fetchMotor4Data()

  pollingIntervalMotor1 = setInterval(fetchMotor1Data, 1000)
  pollingIntervalMotor2 = setInterval(fetchMotor2Data, 1000)
  pollingIntervalMotor1 = setInterval(fetchMotor3Data, 1000)
  pollingIntervalMotor2 = setInterval(fetchMotor4Data, 1000)
})

onUnmounted(() => {
  if (pollingIntervalMotor1) {
    clearInterval(pollingIntervalMotor1)
  }
  if (pollingIntervalMotor2) {
    clearInterval(pollingIntervalMotor2)
  }
  if (pollingIntervalMotor3) {
    clearInterval(pollingIntervalMotor3)
  }
  if (pollingIntervalMotor4) {
    clearInterval(pollingIntervalMotor4)
  }
})
</script>

<template>
  <section>
    <div class="head">
      <div class="title-motor">DETAIL PARAMETER EQUIPMENT SAFETY CONVEYOR</div>
    </div>
    <div class="list-motor">
      <div class="box" v-if="dataMotor1.length > 0 && dataMotor1[0]">
        <div class="header">Motor 1</div>
        <div class="parameter">
          <div class="var">TEMPERATURE</div>
          <div class="value">{{ dataMotor1[0].temperature }}</div>
          <div class="unit">°C</div>
        </div>
        <div class="parameter">
          <div class="var">VIBRATION</div>
          <div class="value">{{ dataMotor1[0].vibration }}</div>
          <div class="unit">%</div>
        </div>
        <div class="parameter">
          <div class="var">SPEED</div>
          <div class="value">{{ dataMotor1[0].speed }}</div>
          <div class="rpm">RPM</div>
        </div>
        <div class="parameter">
          <div class="var">AIR PRESSURE</div>
          <div class="value">{{ dataMotor1[0].airpressure }}</div>
          <div class="unit">Bar</div>
        </div>
      </div>
      <div class="box" v-if="dataMotor2.length > 0 && dataMotor2[0]">
        <div class="header">Motor 2</div>
        <div class="parameter">
          <div class="var">TEMPERATURE</div>
          <div class="value">{{ dataMotor2[0].temperature }}</div>
          <div class="unit">°C</div>
        </div>
        <div class="parameter">
          <div class="var">VIBRATION</div>
          <div class="value">{{ dataMotor2[0].vibration }}</div>
          <div class="unit">%</div>
        </div>
        <div class="parameter">
          <div class="var">SPEED</div>
          <div class="value">{{ dataMotor2[0].speed }}</div>
          <div class="rpm">RPM</div>
        </div>
        <div class="parameter">
          <div class="var">AIR PRESSURE</div>
          <div class="value">{{ dataMotor2[0].airpressure }}</div>
          <div class="unit">Bar</div>
        </div>
      </div>
      <div class="box" v-if="dataMotor3.length > 0 && dataMotor3[0]">
        <div class="header">Motor 3</div>
        <div class="parameter">
          <div class="var">TEMPERATURE</div>
          <div class="value">{{ dataMotor3[0].temperature }}</div>
          <div class="unit">°C</div>
        </div>
        <div class="parameter">
          <div class="var">VIBRATION</div>
          <div class="value">{{ dataMotor3[0].vibration }}</div>
          <div class="unit">%</div>
        </div>
        <div class="parameter">
          <div class="var">SPEED</div>
          <div class="value">{{ dataMotor3[0].speed }}</div>
          <div class="rpm">RPM</div>
        </div>
        <div class="parameter">
          <div class="var">AIR PRESSURE</div>
          <div class="value">{{ dataMotor3[0].airpressure }}</div>
          <div class="unit">Bar</div>
        </div>
      </div>
      <div class="box" v-if="dataMotor4.length > 0 && dataMotor4[0]">
        <div class="header">Motor 4</div>
        <div class="parameter">
          <div class="var">TEMPERATURE</div>
          <div class="value">{{ dataMotor4[0].temperature }}</div>
          <div class="unit">°C</div>
        </div>
        <div class="parameter">
          <div class="var">VIBRATION</div>
          <div class="value">{{ dataMotor4[0].vibration }}</div>
          <div class="unit">%</div>
        </div>
        <div class="parameter">
          <div class="var">SPEED</div>
          <div class="value">{{ dataMotor4[0].speed }}</div>
          <div class="rpm">RPM</div>
        </div>
        <div class="parameter">
          <div class="var">AIR PRESSURE</div>
          <div class="value">{{ dataMotor4[0].airpressure }}</div>
          <div class="unit">Bar</div>
        </div>
      </div>
    </div>
    <div class="head">
      <div class="title-motor">REALTIME GRAFIK</div>
    </div>
    <div class="container-chart">
      <div class="chart">
        <v-chart :option="chartMotor1" />
      </div>
      <div class="chart">
        <v-chart :option="chartMotor2" />
      </div>
      <div class="chart">
        <v-chart :option="chartMotor3" />
      </div>
      <div class="chart">
        <v-chart :option="chartMotor4" />
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  text-align: center;
}
.head {
  display: flex;
  justify-content: center;
}
.title-motor {
  background-color: yellow;
  border: 2px solid #000;
  padding: 1vh 1vw;
  font-family: 'Roboto Condensed', sans-serif;
  margin: 1vh 0;
  font-size: 1.5vw;
}
.list-motor {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1vw;
}
.box {
  border: 2px solid black;
  width: 250px;
  background-color: #d5d5d5;
  padding: 0 1vw;
}
.header {
  border: 2px solid #000;
  background-color: #fff;
  margin-top: 0.5vh;
}
.parameter {
  display: flex;
  align-items: center;
  margin: 0.3vh 0;
  font-size: 1vw;
}
.var {
  background-color: #f0f0f0;
  border: 2px solid #000;
  padding: 5px;
  width: 9rem;
  margin-right: 12px;
}
.value {
  background-color: yellow;
  padding: 5px;
  width: 2vw;
  margin-right: 10px;
}
.rpm {
  font-size: 11px;
  margin: 0;
}
.container-chart {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.chart {
  height: 45vh;
  width: 24vw;
}
</style>
