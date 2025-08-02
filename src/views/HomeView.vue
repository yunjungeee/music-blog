<template>
  <div class="container-fluid py-5">
    <!-- Header Section -->
    <div class="d-flex justify-content-between align-items-center mb-5">
      <div>
        <h1 class="display-4 fw-bold text-dark mb-2">🎵 yj's music blog</h1>
        <p class="text-muted fs-5">Music is my life and my life is music</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">로딩 중...</span>
      </div>
      <p class="mt-3 text-muted">음악을 불러오는 중...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-danger d-flex align-items-center" role="alert">
      <i class="fas fa-exclamation-triangle me-2"></i>
      {{ error }}
    </div>

    <!-- 정상 상태: Music Cards + Video Tutorials 구역 -->
    <div v-else>
      <!-- Music Cards Grid -->
      <div class="row g-4 mb-5">
        <div
          v-for="post in posts"
          :key="post.id"
          class="col-12 col-sm-6 col-lg-4 col-xl-3"
        >
          <MusicCard :post="post" @play="handlePlay" />
        </div>
      </div>

      <!-- Metronic Video Tutorials Section -->
      <div class="mb-5 mt-4">
        <div class="d-flex flex-stack mb-4">
          <h3 class="text-gray-900 mb-0 fw-bold">yj's daily</h3>
        </div>
        <div class="separator separator-dashed mb-4"></div>
        <div class="row g-4">
          <div
            v-for="video in videos"
            :key="video.id"
            class="col-12 col-md-4"
          >
            <VideoCard :video="video" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import MusicCard from '@/components/MusicCard.vue'
import VideoCard from '@/components/VideoCard.vue'

const posts = ref([])
const loading = ref(false)
const error = ref(null)

/**
 * Video Tutorials (Metronic 스타일) 데이터
 */
const videos = ref([
  {
    id: 1,
    thumbnail: '/sia.jpg',
    title: "[공간정보아카데미] 아카데미에서의 일상",
    summary: "어제는 아카데미에서 워크숍을 진행했는데 기대만큼 재미있었다 어쩌면 이게 마지막 ...",
    author: "yj",
    date: "2025-08-2"
  },
  {
    id: 2,
    thumbnail: '/Spain.jpg',
    title: "[스페인 여행] Spain, Tenerife",
    summary: "종강하고 떠난 스페인 음식도 맛있고 날씨도 너무 좋았다 테네리페 in > 마드리드 > 말라가 > 네르하 > 프리힐리아 > 세비야 > 바르셀로나 out",
    author: "yj",
    date: "2025-02-10"
  },
  {
    id: 3,
    thumbnail: '/Sweden.jpg',
    title: "[북유럽 여행] Sweden, Copenhagen",
    summary: "겨울방학을 맞아 떠난 북유럽!! 스톡홀름 in > 예테보리 > 말뫼 > 코펜하겐 > 다시 말뫼 out",
    author: "yj",
    date: "2024-11-18"
  }
]);

const handlePlay = (post) => {
  console.log('Playing:', post.title)
}

onMounted(async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get('http://localhost:7001/posts')
    posts.value = response.data.data
  } catch (e) {
    error.value = '게시물을 불러오는 데 실패했습니다.'
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.container-fluid {
  max-width: 1400px;
}
.separator-dashed {
  border-top: 2px dashed #e3e3e3;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
