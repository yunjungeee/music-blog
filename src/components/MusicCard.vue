<template>
  <div class="music-card h-100" @click="goToDetail">
    <div class="card h-100 border-0 shadow-sm">
      <!-- 썸네일 자리: 유튜브 embed 미리보기 iframe -->
      <div class="position-relative card-img-container">
        <iframe
          :src="youtubeEmbedUrl"
          width="100%"
          height="200"
          style="border-radius: 8px; background: #000;"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          title="유튜브 미리보기"
        ></iframe>
        <!-- Play Overlay (hover 시 표시) -->
        <div class="play-overlay position-absolute top-50 start-50 translate-middle">
          <button
            class="btn btn-primary rounded-circle p-3"
            @click.stop="$emit('play', post)"
          >
            <i class="fas fa-play"></i>
          </button>
        </div>
        <!-- Duration Badge -->
        <span class="badge bg-dark position-absolute bottom-0 end-0 m-2">
          {{ duration }}
        </span>
      </div>
      <!-- 카드 설명 -->
      <div class="card-body d-flex flex-column">
        <h5 class="card-title fw-bold text-truncate mb-2">
          {{ songTitle }}
        </h5>
        <p class="text-muted mb-3 flex-grow-1">
          <i class="fas fa-microphone me-1"></i>
          {{ artist }}
        </p>
        <div class="d-flex gap-2">
          <button
            class="btn btn-outline-primary btn-sm flex-fill"
            @click.stop="$emit('play', post)"
          >
            <i class="fas fa-play me-1"></i>
            재생
          </button>
          <button class="btn btn-outline-secondary btn-sm">
            <i class="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  post: { type: Object, required: true }
})
const emit = defineEmits(['play'])
const router = useRouter()

// 유튜브 embed url 생성
const youtubeEmbedUrl = computed(() => {
  if (props.post.youtubeUrl) {
    const url = props.post.youtubeUrl
    let videoId = ''
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0]
    } else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1].split('&')[0]
    }
    if (videoId) return `https://www.youtube.com/embed/${videoId}`
  }
  return ''
})

const songTitle = computed(() => {
  const title = props.post.title
  return title && title.includes(' - ') ? title.split(' - ')[0] : title ?? ''
})
const artist = computed(() => {
  const title = props.post.title
  return title && title.includes(' - ') ? title.split(' - ')[1] : 'Unknown Artist'
})
const duration = computed(() => {
  const durations = ['3:24', '4:15', '2:58', '5:12', '3:45']
  return durations[props.post.id % durations.length]
})

function goToDetail() {
  router.push(`/post/${props.post.id}`)
}
</script>

<style scoped>
.music-card {
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}
.music-card:hover {
  transform: translateY(-8px);
}
.music-card:hover .card {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
.card-img-container {
  overflow: hidden;
  height: 200px;
}
.music-card:hover .play-overlay {
  opacity: 1;
}
.play-overlay {
  opacity: 0;
  transition: opacity 0.3s;
}
.play-overlay .btn {
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}
.badge {
  font-size: 0.75rem;
  border-radius: 12px;
}
</style>
