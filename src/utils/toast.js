// Toast notification system
class ToastManager {
  constructor() {
    this.toasts = []
    this.container = null
    this.init()
  }

  init() {
    // Create toast container
    this.container = document.createElement('div')
    this.container.id = 'toast-container'
    this.container.className = 'fixed top-4 right-4 z-50 space-y-2'
    document.body.appendChild(this.container)
  }

  show(message, type = 'info', duration = 4000) {
    const toast = this.createToast(message, type)
    this.container.appendChild(toast)
    
    // Animate in
    setTimeout(() => {
      toast.classList.add('translate-x-0', 'opacity-100')
      toast.classList.remove('translate-x-full', 'opacity-0')
    }, 10)

    // Auto remove
    setTimeout(() => {
      this.remove(toast)
    }, duration)

    return toast
  }

  createToast(message, type) {
    const toast = document.createElement('div')
    toast.className = `
      transform transition-all duration-300 ease-in-out
      translate-x-full opacity-0
      max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto
      ring-1 ring-black ring-opacity-5 overflow-hidden
    `

    const iconMap = {
      success: `<svg class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`,
      error: `<svg class="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`,
      warning: `<svg class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>`,
      info: `<svg class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`
    }

    const colorMap = {
      success: 'border-green-500',
      error: 'border-red-500', 
      warning: 'border-yellow-500',
      info: 'border-blue-500'
    }

    toast.innerHTML = `
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            ${iconMap[type] || iconMap.info}
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900 dark:text-white">
              ${message}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button class="toast-close bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="sr-only">Close</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="h-1 ${colorMap[type] || colorMap.info} bg-current"></div>
    `

    // Add close button functionality
    const closeBtn = toast.querySelector('.toast-close')
    closeBtn.addEventListener('click', () => {
      this.remove(toast)
    })

    return toast
  }

  remove(toast) {
    toast.classList.add('translate-x-full', 'opacity-0')
    toast.classList.remove('translate-x-0', 'opacity-100')
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }

  success(message, duration) {
    return this.show(message, 'success', duration)
  }

  error(message, duration) {
    return this.show(message, 'error', duration)
  }

  warning(message, duration) {
    return this.show(message, 'warning', duration)
  }

  info(message, duration) {
    return this.show(message, 'info', duration)
  }
}

// Create global toast instance
const toast = new ToastManager()

// Make it available globally
window.$toast = toast

export default toast

