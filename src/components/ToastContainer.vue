<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <transition-group name="toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <!-- Success Icon -->
              <CheckCircleIcon
                v-if="toast.type === 'success'"
                class="h-6 w-6 text-green-400"
              />
              <!-- Error Icon -->
              <XCircleIcon
                v-else-if="toast.type === 'error'"
                class="h-6 w-6 text-red-400"
              />
              <!-- Loading Icon -->
              <div
                v-else-if="toast.type === 'loading'"
                class="h-6 w-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"
              ></div>
              <!-- Info Icon -->
              <InformationCircleIcon
                v-else
                class="h-6 w-6 text-blue-400"
              />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ toast.title }}
              </p>
              <p v-if="toast.message" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ toast.message }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                @click="removeToast(toast.id)"
                class="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'ToastContainer',
  components: {
    CheckCircleIcon,
    XCircleIcon,
    InformationCircleIcon,
    XMarkIcon
  },
  setup() {
    const toasts = ref([])
    
    const addToast = (toast) => {
      const id = Date.now() + Math.random()
      const newToast = { id, ...toast }
      toasts.value.push(newToast)
      
      // Auto remove after 5 seconds (except loading toasts)
      if (toast.type !== 'loading') {
        setTimeout(() => {
          removeToast(id)
        }, 5000)
      }
      
      return id
    }
    
    const removeToast = (id) => {
      const index = toasts.value.findIndex(toast => toast.id === id)
      if (index > -1) {
        toasts.value.splice(index, 1)
      }
    }
    
    const updateToast = (id, updates) => {
      const toast = toasts.value.find(t => t.id === id)
      if (toast) {
        Object.assign(toast, updates)
        
        // Auto remove if changed from loading
        if (updates.type && updates.type !== 'loading') {
          setTimeout(() => {
            removeToast(id)
          }, 5000)
        }
      }
    }
    
    // Global toast methods
    const showToast = {
      success: (title, message) => addToast({ type: 'success', title, message }),
      error: (title, message) => addToast({ type: 'error', title, message }),
      info: (title, message) => addToast({ type: 'info', title, message }),
      loading: (title, message) => addToast({ type: 'loading', title, message })
    }
    
    // Make toast methods globally available
    onMounted(() => {
      window.$toast = showToast
      window.$updateToast = updateToast
      window.$removeToast = removeToast
    })
    
    onUnmounted(() => {
      delete window.$toast
      delete window.$updateToast
      delete window.$removeToast
    })
    
    return {
      toasts,
      removeToast
    }
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>

