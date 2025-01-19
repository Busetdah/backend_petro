<template>
  <div class="container">
    <div>
      <h1 class="text-xl font-bold mb-4">Alarm History</h1>
      <div v-if="loading" class="text-center">
        <p>Loading...</p>
      </div>
      <div v-else>
        <!-- Tabel dengan Element Plus -->
        <el-table :data="paginatedData" border style="width: 100%">
          <!-- Kolom Nomor -->
          <el-table-column
            label="No"
            width="70"
            type="index"
            :index="computeRowIndex"
          ></el-table-column>
          <el-table-column prop="value" label="Value" width="150"></el-table-column>
          <el-table-column prop="source" label="Source" width="200"></el-table-column>
          <el-table-column prop="created_at" label="Waktu" width="250">
            <template #default="{ row }">
              {{ formatcreated_at(row.created_at) }}
            </template>
          </el-table-column>
        </el-table>

        <!-- Pagination -->
        <el-pagination
          class="mt-4"
          background
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="itemsPerPage"
          :total="alarms.length"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'

export default {
  name: 'DynamicAlarmTable',
  setup() {
    const alarms = ref([])
    const loading = ref(true)
    const currentPage = ref(1)
    const itemsPerPage = ref(10) // Jumlah item per halaman
    let pollingInterval = null // Untuk menyimpan interval polling

    // Data untuk halaman saat ini
    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      return alarms.value.slice(start, start + itemsPerPage.value)
    })

    const fetchAlarms = async () => {
      try {
        const response = await axios.get('https://be.robofuji.smartrobofuji.site/api/historys')
        alarms.value = response.data
      } catch (error) {
        console.error('Failed to fetch alarms:', error)
      } finally {
        loading.value = false
      }
    }

    const handlePageChange = (page) => {
      currentPage.value = page
    }

    const startPolling = () => {
      pollingInterval = setInterval(() => {
        fetchAlarms()
      }, 5000) // Poll setiap 5 detik
    }

    const stopPolling = () => {
      if (pollingInterval) {
        clearInterval(pollingInterval)
      }
    }

    const formatcreated_at = (created_at) => {
      if (!created_at) return 'N/A' // Jika created_at kosong
      const date = new Date(created_at) // Pastikan format dapat diterima oleh Date
      if (isNaN(date.getTime())) return 'Invalid Date' // Tangani kesalahan parsing
      return date.toLocaleString() // Format tanggal & waktu lokal
    }

    // Hitung nomor berdasarkan indeks tabel
    const computeRowIndex = (index) => {
      return (currentPage.value - 1) * itemsPerPage.value + index + 1
    }

    onMounted(() => {
      fetchAlarms()
      startPolling() // Mulai polling data
    })

    onBeforeUnmount(() => {
      stopPolling() // Hentikan polling saat komponen dihancurkan
    })

    return {
      alarms,
      loading,
      currentPage,
      itemsPerPage,
      paginatedData,
      handlePageChange,
      formatcreated_at,
      computeRowIndex,
    }
  },
}
</script>

<style scoped>
/* Memusatkan tabel dan konten lainnya */
.container {
  display: flex;
  justify-content: center; /* Memusatkan secara horizontal */
  height: 40vh; /* Tinggi layar penuh */
  text-align: center; /* Pusatkan teks secara default */
}

h1 {
  margin-bottom: 1rem;
}

.el-table {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Tambahkan bayangan pada tabel */
  border-radius: 8px; /* Sudut tabel melengkung */
}

.mt-4 {
  margin-top: 1rem;
}
</style>
