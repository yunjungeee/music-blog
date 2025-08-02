<template>
  <div class="card-xl-stretch h-100 d-flex flex-column">
    <a
      class="d-block bgi-no-repeat bgi-size-cover bgi-position-center card-rounded position-relative min-h-175px mb-4"
      :style="`background-image:url('${video.thumbnail}')`"
      :href="video.videoUrl"
      target="_blank"
      rel="noopener"
    >
      <img
       
      />
    </a>
    <div class="m-0 flex-grow-1 d-flex flex-column">
      <a :href="video.link"
        class="fs-5 text-gray-900 fw-bold text-hover-primary lh-base mb-2"
        target="_blank"
        rel="noopener"
      >{{ video.title }}</a>
      <div class="fw-semibold fs-6 text-gray-600 my-2 flex-grow-1">{{ video.summary }}</div>
      <div class="fs-6 fw-bold text-muted">
        <span class="text-gray-700 me-2">{{ video.author }}</span>
        <span>{{ video.date }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  video: { type: Object, required: true }
})
</script>
<style scoped>
.bgi-no-repeat { background-repeat: no-repeat; }
.bgi-size-cover { background-size: cover; }
.bgi-position-center { background-position: center; }
.card-rounded { border-radius: 1rem; }
.min-h-175px { min-height: 175px; }
a { text-decoration: none; }
</style>
