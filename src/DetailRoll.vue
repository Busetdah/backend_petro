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

const chartRoll = ref({
  title: {
    text: 'Roll',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['RPM Motor', 'RPM Roll', 'Rotation Difference', 'Vibration Bearing'],
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
      name: 'RPM Motor',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'blue',
      },
    },
    {
      name: 'RPM Roll',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'red',
      },
    },
    {
      name: 'Rotation Difference',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'green',
      },
    },
    {
      name: 'Vibration Bearing',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'black',
      },
    },
  ],
})

const dataRoll = ref([])
const fetchRollData = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/roll_detail_roll`)
    dataRoll.value = response.data.data
    const timeLabels = dataRoll.value
      .slice()
      .reverse()
      .map((item) => {
        const date = new Date(item.created_at)
        if (isNaN(date)) {
          return 'Invalid Date'
        }
        return `${date.toISOString().split('T')[0]}\n${date.toTimeString().split(' ')[0]}`
      })
    const rpm_motorData = dataRoll.value.map((item) => parseFloat(item.rpm_motor)).reverse()
    const rpm_rollData = dataRoll.value.map((item) => parseFloat(item.rpm_roll)).reverse()
    const rotationData = dataRoll.value.map((item) => parseFloat(item.presentase)).reverse()
    const VibrationBearingData = dataRoll.value.map((item) => parseFloat(item.getaran_hz)).reverse()

    chartRoll.value.xAxis.data = timeLabels
    chartRoll.value.series[0].data = rpm_motorData
    chartRoll.value.series[1].data = rpm_rollData
    chartRoll.value.series[2].data = rotationData
    chartRoll.value.series[3].data = VibrationBearingData
  } catch (error) {
    console.error('Error fetching Rol data:', error)
  }
}

let pollingIntervalRoll = null

onMounted(() => {
  fetchRollData()

  pollingIntervalRoll = setInterval(fetchRollData, 1000)
})

onUnmounted(() => {
  if (pollingIntervalRoll) {
    clearInterval(pollingIntervalRoll)
  }
})
</script>

<template>
  <section>
    <div class="head">
      <div class="title-motor">DETAIL PARAMETER EQUIPMENT ROLL</div>
    </div>
    <div class="list-motor">
      <div class="box" v-if="dataRoll.length > 0 && dataRoll[0]">
        <div class="header">Roll</div>
        <div class="parameter">
          <div class="var">RPM Motor</div>
          <div class="value">{{ dataRoll[0].rpm_motor }}</div>
          <div class="unit">RPM</div>
        </div>
        <div class="parameter">
          <div class="var">RPM Roll</div>
          <div class="value">{{ dataRoll[0].rpm_roll }}</div>
          <div class="unit">RPM</div>
        </div>
        <div class="parameter">
          <div class="var">Rotation Difference</div>
          <div class="value">{{ dataRoll[0].presentase }}</div>
          <div class="rpm">%</div>
        </div>
        <div class="parameter">
          <div class="var">Vibration Bearing</div>
          <div class="value">{{ dataRoll[0].getaran_hz }}</div>
          <div class="unit">Hz</div>
        </div>
      </div>
    </div>
    <div class="head">
      <div class="title-motor">REALTIME GRAFIK</div>
    </div>
    <div class="container-chart">
      <div class="chart">
        <v-chart :option="chartRoll" />
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
  width: 17vw;
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
  width: 32vw;
}
</style>
