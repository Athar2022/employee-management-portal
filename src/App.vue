<template>
  <div id="app" class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <!-- I am Stupid -->
    <div class="flex">
      <!-- Sidebar -->
      <Sidebar />
      
      <!-- Main Content -->
      <div class="flex-1 flex flex-col">
        <!-- Header -->
        <Header />
        
        <!-- Page Content -->
        <main class="flex-1 p-6">
          <router-view />
        </main>
      </div>
    </div>
    
    <!-- Toast Notifications -->
    <ToastContainer />
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import ToastContainer from './components/ToastContainer.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    Header,
    ToastContainer
  }
}
</script>

