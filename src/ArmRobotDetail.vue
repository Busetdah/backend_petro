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
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

use([CanvasRenderer, LineChart, GridComponent, TitleComponent, TooltipComponent, LegendComponent])

const chartMotor1 = ref({
  title: {
    text: 'Arm Robot Fuji',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Temperature', 'Vibration', 'Air Pressure'],
    top: '8%',
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

const fetchMotor1Data = async () => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/api/arm_robot_detail_motor1`,
    )
    dataMotor1.value = response.data.data
    const timeLabels = dataMotor1.value
      .slice()
      .reverse()
      .map((item) => {
        const date = new Date(item.created_at)
        if (isNaN(date)) {
          return 'Invalid Date'
        }

        return `${date.toISOString().split('T')[0]}\n${date.toTimeString().split(' ')[0]}`
      })
    const temperatureData = dataMotor1.value.map((item) => parseFloat(item.temperature)).reverse()
    const vibrationData = dataMotor1.value.map((item) => parseFloat(item.vibration)).reverse()
    const airPressureData = dataMotor1.value.map((item) => parseFloat(item.airpressure)).reverse()

    chartMotor1.value.xAxis.data = timeLabels
    chartMotor1.value.series[0].data = temperatureData
    chartMotor1.value.series[1].data = vibrationData
    chartMotor1.value.series[2].data = airPressureData
  } catch (error) {
    console.error('Error fetching motor 1 data:', error)
  }
}


let pollingIntervalMotor1 = null

onMounted(() => {
  fetchMotor1Data()

  pollingIntervalMotor1 = setInterval(fetchMotor1Data, 1000)
})

onUnmounted(() => {
  if (pollingIntervalMotor1) {
    clearInterval(pollingIntervalMotor1)
  }
})
</script>

<template>
  <section>
    <div class="head">
      <div class="title-motor">DETAIL PARAMETER EQUIPMENT ARM ROBOT</div>
    </div>
    <div class="list-motor">
      <div class="box" v-if="dataMotor1.length > 0 && dataMotor1[0]">
        <div class="header">Arm Robot Fuji</div>
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
          <div class="var">AIR PRESSURE</div>
          <div class="value">{{ dataMotor1[0].airpressure }}</div>
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
  width: 35vw;
}
</style>
