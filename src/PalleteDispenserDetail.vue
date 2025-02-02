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

const chartLeft = ref({
  title: {
    text: 'Left Dispenser',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Air Pressure Forward', 'Air Pressure Retract', 'Rotation Grip'],
    top: '8%',
    itemWidth: 16,
    itemHeight: 8,
    textStyle: {
      fontSize: 10,
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
      name: 'Air Pressure Forward',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'blue',
      },
    },
    {
      name: 'Air Pressure Retract',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'red',
      },
    },
    {
      name: 'Rotation Grip',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'green',
      },
    },
  ],
})

const chartRight = ref({
  title: {
    text: 'Right Dispenser',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Air Pressure Forward', 'Air Pressure Retract', 'Rotation Grip'],
    top: '8%',
    itemWidth: 16,
    itemHeight: 8,
    textStyle: {
      fontSize: 10,
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
      name: 'Air Pressure Forward',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'blue',
      },
    },
    {
      name: 'Air Pressure Retract',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'red',
      },
    },
    {
      name: 'Rotation Grip',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'green',
      },
    },
  ],
})

const dataLeft = ref([])
const dataRight = ref([])

const fetchLeftData = async () => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/api/pallete_dispenser_detail_left`,
    )
    dataLeft.value = response.data.data
    const timeLabels = dataLeft.value
      .slice()
      .reverse()
      .map((item) => {
        const date = new Date(item.created_at)
        if (isNaN(date)) {
          return 'Invalid Date'
        }
        return `${date.toISOString().split('T')[0]}\n${date.toTimeString().split(' ')[0]}`
      })
    const airpressureforward = dataLeft.value
      .map((item) => parseFloat(item.airpressureforward))
      .reverse()
    const airpressureretract = dataLeft.value
      .map((item) => parseFloat(item.airpressureretract))
      .reverse()
    const rotationgrip = dataLeft.value.map((item) => parseFloat(item.rotationgrip)).reverse()

    chartLeft.value.xAxis.data = timeLabels
    chartLeft.value.series[0].data = airpressureforward
    chartLeft.value.series[1].data = airpressureretract
    chartLeft.value.series[2].data = rotationgrip
  } catch (error) {
    console.error('Error fetching left data:', error)
  }
}

const fetchRightData = async () => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/api/pallete_dispenser_detail_right`,
    )
    dataRight.value = response.data.data
    const timeLabels = dataRight.value
      .slice()
      .reverse()
      .map((item) => {
        const date = new Date(item.created_at)
        if (isNaN(date)) {
          return 'Invalid Date'
        }
        return `${date.toISOString().split('T')[0]}\n${date.toTimeString().split(' ')[0]}`
      })
    const airpressureforward = dataRight.value
      .map((item) => parseFloat(item.airpressureforward))
      .reverse()
    const airpressureretract = dataRight.value
      .map((item) => parseFloat(item.airpressureretract))
      .reverse()
    const rotationgrip = dataRight.value.map((item) => parseFloat(item.rotationgrip)).reverse()

    chartRight.value.xAxis.data = timeLabels
    chartRight.value.series[0].data = airpressureforward
    chartRight.value.series[1].data = airpressureretract
    chartRight.value.series[2].data = rotationgrip
  } catch (error) {
    console.error('Error fetching right data:', error)
  }
}

let pollingIntervalLeft = null
let pollingIntervalRight = null

onMounted(() => {
  fetchLeftData()
  fetchRightData()

  pollingIntervalLeft = setInterval(fetchLeftData, 1000)
  pollingIntervalRight = setInterval(fetchRightData, 1000)
})

onUnmounted(() => {
  if (pollingIntervalLeft) {
    clearInterval(pollingIntervalLeft)
  }
  if (pollingIntervalRight) {
    clearInterval(pollingIntervalRight)
  }
})
</script>

<template>
  <section>
    <div class="head">
      <div class="title-motor">DETAIL PARAMETER EQUIPMENT PALLETE DISPENSER</div>
    </div>
    <div class="list-motor">
      <div class="box" v-if="dataLeft.length > 0 && dataLeft[0]">
        <div class="header">Left Dispenser</div>
        <div class="parameter">
          <div class="var">Air Pressure Forward</div>
          <div class="value">{{ dataLeft[0].airpressureforward }}</div>
          <div class="unit">Bar</div>
        </div>
        <div class="parameter">
          <div class="var">Air Pressure Retract</div>
          <div class="value">{{ dataLeft[0].airpressureretract }}</div>
          <div class="unit">Bar</div>
        </div>
        <div class="parameter">
          <div class="var">Rotation Grip</div>
          <div class="value">{{ dataLeft[0].rotationgrip }}</div>
          <div class="rpm">Degrees</div>
        </div>
        <div class="parameter">
          <div class="var">Reed Switch</div>
          <div class="value">{{ dataLeft[0].reedswitch }}</div>
          <div class="unit">Status</div>
        </div>
      </div>
      <div class="box" v-if="dataRight.length > 0 && dataRight[0]">
        <div class="header">Right Dispenser</div>
        <div class="parameter">
          <div class="var">Air Pressure Forward</div>
          <div class="value">{{ dataRight[0].airpressureforward }}</div>
          <div class="unit">Bar</div>
        </div>
        <div class="parameter">
          <div class="var">Air Pressure Retract</div>
          <div class="value">{{ dataRight[0].airpressureretract }}</div>
          <div class="unit">Bar</div>
        </div>
        <div class="parameter">
          <div class="var">Rotation Grip</div>
          <div class="value">{{ dataRight[0].rotationgrip }}</div>
          <div class="rpm">Degrees</div>
        </div>
        <div class="parameter">
          <div class="var">Reed Switch</div>
          <div class="value">{{ dataRight[0].reedswitch }}</div>
          <div class="unit">Status</div>
        </div>
      </div>
    </div>
    <div class="head">
      <div class="title-motor">REALTIME GRAFIK</div>
    </div>
    <div class="container-chart">
      <div class="chart">
        <v-chart :option="chartLeft" />
      </div>
      <div class="chart">
        <v-chart :option="chartRight" />
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
  width: 24vw;
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
  width: 12vw;
  margin-right: 12px;
}
.value {
  background-color: yellow;
  padding: 5px;
  width: 5vw;
  margin-right: 10px;
}
.rpm {
  font-size: 12px;
  margin: 0;
}
.container-chart {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.chart {
  height: 45vh;
  width: 30vw;
}
</style>
