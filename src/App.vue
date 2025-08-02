<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-info shadow-sm">
      <div class="container">
        <router-link class="navbar-brand fw-bold" to="/">
          <i class="fas fa-music me-2"></i>윤정이의 BLOG
        </router-link>
        
        <div class="navbar-nav ms-auto">
          <router-link class="nav-link" to="/">
            <i class="fas fa-home me-1"></i>홈
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="min-vh-100">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-light py-4 mt-5">
      <div class="container text-center">
        <p class="mb-0">
          <i class="fas fa-headphones me-2"></i>
          Made with ❤️ for Music Lovers
        </p>
      </div>
    </footer>
  </div>
</template>

<style>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #ffffff !important;
}

.min-vh-100 {
  min-height: calc(100vh - 120px);
}
</style>

