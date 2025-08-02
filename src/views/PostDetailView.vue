<template>
  <div>
    <div v-if="loading">로딩 중...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="post">
      <h2>{{ post.title }}</h2>
      <pre class="lyrics">{{ post.lyrics }}</pre>
      <iframe
        width="560"
        height="315"
        :src="embedUrl"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <br />
      <router-link to="/">← 홈으로</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const post = ref(null)
const loading = ref(true)
const error = ref(null)
const embedUrl = ref('')

// 유튜브 임베드 URL 변환 함수
function toEmbedUrl(url) {
  // 유튜브 공유 링크에서 ID만 추출
  let videoId = ''
  
  // https://youtu.be/VIDEOID 형식
  if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0]
  }
  
  // https://www.youtube.com/watch?v=VIDEOID 형식
  else if (url.includes('watch?v=')) {
    videoId = url.split('watch?v=')[1].split('&')[0]
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`
  }
  
  return '' // 오류일 경우 빈 문자열
}



async function fetchPost(id) {
  loading.value = true
  error.value = null
  post.value = null
  embedUrl.value = ''

  try {
    const response = await axios.get(`http://localhost:7001/posts/${id}`)
    post.value = response.data.data
    embedUrl.value = toEmbedUrl(post.value.youtubeUrl)
  } catch (e) {
    error.value = '게시물을 불러오는 데 실패했습니다.'
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPost(route.params.id)
})

// 라우트가 바뀔 때(다른 포스트 클릭 시) 다시 데이터 불러오기
watch(() => route.params.id, (newId) => {
  fetchPost(newId)
})
</script>

<style scoped>
.error {
  color: red;
  margin: 1em 0;
}

.lyrics {
  white-space: pre-wrap; /* 줄바꿈 유지 */
  margin-bottom: 1em;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
