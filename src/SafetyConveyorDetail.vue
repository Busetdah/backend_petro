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

const chartLiftingArea = ref({
  title: {
    text: 'Lifting Area',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['Pallet Distance', 'Elapsed Time'],
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
      name: 'Pallet Distance',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'green',
      },
    },
    {
      name: 'Elapsed Time',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        color: 'black',
      },
    },
  ],
})

const dataLiftingArea = ref([])

const fetchLiftingAreaData = async () => {
  try {
    const response = await axios.get(
      'https://be.robofuji.smartrobofuji.site/api/safety_conveyor_detail_lifting',
    )
    dataLiftingArea.value = response.data.data
    const timeLabels = dataLiftingArea.value
      .slice()
      .reverse()
      .map((item) => {
        const date = new Date(item.created_at)
        if (isNaN(date)) {
          return 'Invalid Date'
        }
        return `${date.toISOString().split('T')[0]}\n${date.toTimeString().split(' ')[0]}`
      })
    const palletdistanceData = dataLiftingArea.value
      .map((item) => parseFloat(item.palletdistance))
      .reverse()
    const elapsedtimeData = dataLiftingArea.value
      .map((item) => parseFloat(item.elapsedtime))
      .reverse()

    chartLiftingArea.value.xAxis.data = timeLabels
    chartLiftingArea.value.series[0].data = palletdistanceData
    chartLiftingArea.value.series[1].data = elapsedtimeData
  } catch (error) {
    console.error('Error fetching Lifting Area data:', error)
  }
}
let pollingIntervalLiftingArea = null

onMounted(() => {
  fetchLiftingAreaData()

  pollingIntervalLiftingArea = setInterval(fetchLiftingAreaData, 1000)
})

onUnmounted(() => {
  if (pollingIntervalLiftingArea) {
    clearInterval(pollingIntervalLiftingArea)
  }
})
</script>

<template>
  <section>
    <div class="head">
      <div class="title-motor">DETAIL PARAMETER EQUIPMENT SAFETY CONVEYOR</div>
    </div>
    <div class="list-motor">
      <div class="box" v-if="dataLiftingArea.length > 0 && dataLiftingArea[0]">
        <div class="header">Lifting Area</div>
        <div class="parameter">
          <div class="var">Lifting 1</div>
          <div class="value">{{ dataLiftingArea[0].lifting1 }}</div>
          <div class="unit">Status</div>
        </div>
        <div class="parameter">
          <div class="var">Lifting 2</div>
          <div class="value">{{ dataLiftingArea[0].lifting2 }}</div>
          <div class="unit">Status</div>
        </div>
        <div class="parameter">
          <div class="var">Pallet Distance</div>
          <div class="value">{{ dataLiftingArea[0].palletdistance }}</div>
          <div class="rpm">cm</div>
        </div>
        <div class="parameter">
          <div class="var">Elapsed Time</div>
          <div class="value">{{ dataLiftingArea[0].elapsedtime }}</div>
          <div class="unit">mS</div>
        </div>
      </div>
    </div>
    <div class="head">
      <div class="title-motor">REALTIME GRAFIK</div>
    </div>
    <div class="container-chart">
      <div class="chart">
        <v-chart :option="chartLiftingArea" />
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
  width: 23vw;
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
  width: 5vw;
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
  width: 30vw;
}
</style>
