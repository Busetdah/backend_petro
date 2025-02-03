<template>
  <div class="container">
    <div>
      <h1 class="text-xl font-bold mb-4">HISTORY</h1>
      <div v-if="loading" class="text-center">
        <p>Loading...</p>
      </div>
      <div v-else-if="historyData.data.length === 0" class="text-center">
        <p>Tidak ada riwayat data.</p>
      </div>
      <div v-else>
        <el-table :data="historyData.data" border style="width: 100%">
          <el-table-column label="No" width="50">
          <template #default="scope">
            {{ (historyData.current_page - 1) * historyData.per_page + scope.$index + 1 }}
          </template>
          </el-table-column>
          <el-table-column prop="source" label="Source" width="200"></el-table-column>
          <el-table-column prop="error" label="Keterangan" width="400"></el-table-column>
          <el-table-column label="Waktu" width="250">
            <template #default="scope">
              {{ formatDate(scope.row.created_at) }}
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
  background
  layout="prev, next"
  :current-page="historyData.current_page"
  :page-size="historyData.per_page"
  :total="historyData.total"
  @current-change="handlePageChange">
</el-pagination>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export default {
  name: 'HistoryPage',
  setup() {
    const historyData = ref({
      data: [],
      current_page: 1,
      per_page: 10,
      total: 0,
      last_page: 1,
    })
    const loading = ref(true)

    const fetchHistory = async (page = 1) => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/historys`, {
          params: { page, per_page: 10 }
        })
        historyData.value = response.data
      } catch (error) {
        console.error('Failed to fetch history:', error)
      } finally {
        loading.value = false
      }
    }

    const handlePageChange = (page) => {
      loading.value = true
      fetchHistory(page)
    }

    const formatDate = (dateStr) => {
      if (!dateStr) return ''
      const date = new Date(dateStr)
      const optionsDate = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
      let formattedDate = date.toLocaleDateString('id-ID', optionsDate)
      const optionsTime = { hour: '2-digit', minute: '2-digit' }
      let formattedTime = date.toLocaleTimeString('id-ID', optionsTime)
      formattedTime = formattedTime.replace('.', ':')
      return `${formattedDate}, jam ${formattedTime}`
    }

    onMounted(() => {
      fetchHistory()
    })

    return {
      historyData,
      loading,
      handlePageChange,
      formatDate
    }
  },
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  text-align: center;
}

h1 {
  margin-bottom: 1rem;
}

.el-table {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.text-center {
  text-align: center;
}
</style>
