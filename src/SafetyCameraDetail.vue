<template>
  <div class="container">
    <h1 class="title">Safety Camera Detection</h1>

    <div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-else-if="detections.length === 0" class="no-data">
      Tidak ada data Safety Camera Detection.
    </div>

    <div v-else>
      <el-table :data="detections" border style="width: 100%">
        <el-table-column label="No" width="50">
          <template #default="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status" width="80"></el-table-column>
        <!-- <el-table-column label="Waktu" width="250">
          <template #default="scope">
            <span>{{ formatDate(scope.row.created_at) }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="Gambar">
          <template #default="scope">
            <template v-if="scope.row.gambar">
              <img
                :src="`data:image/png;base64,${scope.row.gambar}`"
                alt="Gambar Safety Camera"
                class="detection-img"
                @click="openFullscreen(scope.row.gambar)"
              />
            </template>
            <template v-else>
              <span>No Image</span>
            </template>
          </template>
        </el-table-column>
      </el-table>


      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalDetections"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>

    <div v-if="isFullscreen" class="fullscreen-overlay" @click="closeFullscreen">
      <img
        :src="`data:image/jpeg;base64,${fullscreenImage}`"
        alt="Gambar Besar"
        class="fullscreen-img"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/id';

dayjs.extend(utc);
dayjs.extend(localeData);
dayjs.locale('id');

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default {
  name: 'SafetyCameraDetection',
  setup() {
    const detections = ref([]);
    const loading = ref(true);
    const isFullscreen = ref(false);
    const fullscreenImage = ref(null);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const totalDetections = ref(0);

    const fetchDetections = async () => {
      loading.value = true;
      try {
        const response = await axios.get(`${apiBaseUrl}/api/safety_camera_detection`, {
          params: {
            page: currentPage.value,
            limit: pageSize.value,
          },
        });
        if (response.data && Array.isArray(response.data.data)) {
          detections.value = response.data.data;
          totalDetections.value = response.data.total;
        } else {
          detections.value = [];
          totalDetections.value = 0;
        }
      } catch (error) {
        console.error('Error fetching safety camera detections:', error);
      } finally {
        loading.value = false;
      }
    };

    const openFullscreen = (image) => {
      fullscreenImage.value = image;
      isFullscreen.value = true;
    };

    const closeFullscreen = () => {
      isFullscreen.value = false;
      fullscreenImage.value = null;
    };

    const formatDate = (dateStr) => {
      return dayjs.utc(dateStr).locale('id').format('dddd, D MMMM YYYY, [jam] HH:mm');
    };

    const handlePageChange = (page) => {
      currentPage.value = page;
      fetchDetections();
    };

    onMounted(() => {
      fetchDetections();
    });

    return {
      detections,
      loading,
      isFullscreen,
      fullscreenImage,
      currentPage,
      pageSize,
      totalDetections,
      openFullscreen,
      closeFullscreen,
      formatDate,
      handlePageChange,
    };
  },
};
</script>



<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.loading,
.no-data {
  font-size: 18px;
  margin-top: 20px;
}

.detection-img {
  width: 100px;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s;
}

.detection-img:hover {
  transform: scale(1.1);
}

.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.fullscreen-img {
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
