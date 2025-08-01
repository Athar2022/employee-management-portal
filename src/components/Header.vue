<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
    <div class="px-6 py-4 flex items-center justify-between">
      <!-- Page Title -->
      <div>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">
          {{ pageTitle }}
        </h2>
      </div>
      
      <!-- Header Actions -->
      <div class="flex items-center space-x-4">
        <!-- Dark Mode Toggle -->
        <button
          @click="toggleDarkMode"
          class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <SunIcon v-if="isDark" class="w-5 h-5 text-yellow-500" />
          <MoonIcon v-else class="w-5 h-5 text-gray-600" />
        </button>
        
        <!-- User Profile -->
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span class="text-white text-sm font-medium">A</span>
          </div>
          <span class="text-gray-700 dark:text-gray-300 font-medium">Admin</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'Header',
  components: {
    SunIcon,
    MoonIcon
  },
  setup() {
    const route = useRoute()
    
    const pageTitle = computed(() => {
      const titles = {
        'dashboard': 'Dashboard',
        'employees': 'Employees',
        'add-employee': 'Add Employee',
        'employee-profile': 'Employee Profile',
        'leaves': 'Leave Management',
        'salary': 'Salary Summary'
      }
      return titles[route.name] || 'Employee Portal'
    })
    
    const isDark = computed(() => {
      return document.documentElement.classList.contains('dark')
    })
    
    const toggleDarkMode = () => {
      const html = document.documentElement
      if (html.classList.contains('dark')) {
        html.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      } else {
        html.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      }
    }
    
    // Initialize theme on component mount
    const initTheme = () => {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark')
      }
    }
    
    // Initialize theme when component is created
    initTheme()
    
    return {
      pageTitle,
      isDark,
      toggleDarkMode
    }
  }
}
</script>

