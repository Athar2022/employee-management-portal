<template>
  <div class="space-y-6">
    <!-- Welcome Header -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, Admin! <!-- I am Stupid -->
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Here's what's happening with your team today.
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ currentDate }}</p>
          <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ currentTime }}</p>
        </div>
      </div>
    </div>
    
    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Employees -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <UsersIcon class="h-8 w-8 text-blue-500" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Employees</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ totalEmployees }}</p>
            <p class="text-xs text-green-600 dark:text-green-400">+2 this month</p>
          </div>
        </div>
      </div>
      
      <!-- Active Employees -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <CheckCircleIcon class="h-8 w-8 text-green-500" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Employees</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ activeEmployees }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ ((activeEmployees / totalEmployees) * 100).toFixed(1) }}% of total</p>
          </div>
        </div>
      </div>
      
      <!-- Pending Leaves -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <CalendarIcon class="h-8 w-8 text-yellow-500" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Leaves</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ pendingLeaves }}</p>
            <p class="text-xs text-yellow-600 dark:text-yellow-400">Requires attention</p>
          </div>
        </div>
      </div>
      
      <!-- Average Salary -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <CurrencyDollarIcon class="h-8 w-8 text-purple-500" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Average Salary</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">${{ averageSalary.toLocaleString() }}</p>
            <p class="text-xs text-purple-600 dark:text-purple-400">Per year</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Department Distribution Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Employees by Department
        </h3>
        <div class="h-64">
          <canvas ref="departmentChart" class="w-full h-full"></canvas>
        </div>
      </div>
      
      <!-- Salary Distribution Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Salary Distribution
        </h3>
        <div class="h-64">
          <canvas ref="salaryChart" class="w-full h-full"></canvas>
        </div>
      </div>
    </div>
    
    <!-- Recent Activities and Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activities -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            Recent Activities
          </h3>
          <button class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
            View All
          </button>
        </div>
        
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <div :class="getActivityIconClass(activity.type)" class="h-8 w-8 rounded-full flex items-center justify-center">
                <component :is="getActivityIcon(activity.type)" class="h-4 w-4 text-white" />
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-900 dark:text-white">{{ activity.description }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatTimeAgo(activity.timestamp) }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        
        <div class="grid grid-cols-2 gap-4">
          <router-link
            to="/employees/add"
            class="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200 group"
          >
            <UserPlusIcon class="h-8 w-8 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 mb-2" />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400">
              Add Employee
            </span>
          </router-link>
          
          <button
            @click="requestLeave"
            class="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 dark:hover:border-green-400 transition-colors duration-200 group"
          >
            <CalendarIcon class="h-8 w-8 text-gray-400 group-hover:text-green-500 dark:group-hover:text-green-400 mb-2" />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-500 dark:group-hover:text-green-400">
              Request Leave
            </span>
          </button>
          
          <router-link
            to="/salary"
            class="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-purple-500 dark:hover:border-purple-400 transition-colors duration-200 group"
          >
            <CurrencyDollarIcon class="h-8 w-8 text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 mb-2" />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-500 dark:group-hover:text-purple-400">
              Calculate Salary
            </span>
          </router-link>
          
          <button
            @click="generateReport"
            class="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-orange-500 dark:hover:border-orange-400 transition-colors duration-200 group"
          >
            <DocumentArrowDownIcon class="h-8 w-8 text-gray-400 group-hover:text-orange-500 dark:group-hover:text-orange-400 mb-2" />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-orange-500 dark:group-hover:text-orange-400">
              Generate Report
            </span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Upcoming Events -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Upcoming Events & Deadlines
      </h3>
      
      <div class="space-y-3">
        <div v-for="event in upcomingEvents" :key="event.id" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="flex items-center space-x-3">
            <div :class="getEventTypeClass(event.type)" class="h-3 w-3 rounded-full"></div>
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ event.title }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ event.description }}</p>
            </div>
          </div>
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(event.date) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  UsersIcon,
  CheckCircleIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
  DocumentArrowDownIcon,
  PlusIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'Dashboard',
  components: {
    UsersIcon,
    CheckCircleIcon,
    CalendarIcon,
    CurrencyDollarIcon,
    UserPlusIcon,
    DocumentArrowDownIcon,
    PlusIcon,
    ClockIcon,
    XCircleIcon
  },
  setup() {
    const router = useRouter()
    const employees = ref([])
    const leaves = ref([])
    const currentTime = ref('')
    const currentDate = ref('')
    const departmentChart = ref(null)
    const salaryChart = ref(null)
    
    const recentActivities = ref([
      {
        id: 1,
        type: 'employee_added',
        description: 'New employee John Doe added to Engineering department',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        id: 2,
        type: 'leave_approved',
        description: 'Leave request approved for Jane Smith',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
      },
      {
        id: 3,
        type: 'salary_updated',
        description: 'Salary calculation updated for Mike Johnson',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
      },
      {
        id: 4,
        type: 'leave_requested',
        description: 'New leave request submitted by Sarah Wilson',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000) // 8 hours ago
      }
    ])
    
    const upcomingEvents = ref([
      {
        id: 1,
        title: 'Performance Reviews Due',
        description: 'Q1 performance reviews deadline',
        date: '2024-03-15',
        type: 'deadline'
      },
      {
        id: 2,
        title: 'Team Building Event',
        description: 'Annual company retreat',
        date: '2024-03-20',
        type: 'event'
      },
      {
        id: 3,
        title: 'Salary Review Meeting',
        description: 'Monthly salary review with HR',
        date: '2024-03-25',
        type: 'meeting'
      }
    ])
    
    const loadData = () => {
      employees.value = JSON.parse(localStorage.getItem('employees') || '[]')
      leaves.value = JSON.parse(localStorage.getItem('leaves') || '[]')
    }
    
    const totalEmployees = computed(() => employees.value.length)
    const activeEmployees = computed(() => employees.value.filter(emp => emp.status === 'Active').length)
    const pendingLeaves = computed(() => leaves.value.filter(leave => leave.status === 'Pending').length)
    const averageSalary = computed(() => {
      if (employees.value.length === 0) return 0
      const totalSalary = employees.value.reduce((sum, emp) => sum + (emp.salary || 0), 0)
      return Math.round(totalSalary / employees.value.length)
    })
    
    const updateTime = () => {
      const now = new Date()
      currentTime.value = now.toLocaleTimeString()
      currentDate.value = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
    
    const formatTimeAgo = (timestamp) => {
      const now = new Date()
      const diff = now - timestamp
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor(diff / (1000 * 60))
      
      if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`
      } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
      } else {
        return 'Just now'
      }
    }
    
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }
    
    const getActivityIcon = (type) => {
      switch (type) {
        case 'employee_added': return UserPlusIcon
        case 'leave_approved': return CheckCircleIcon
        case 'leave_requested': return CalendarIcon
        case 'salary_updated': return CurrencyDollarIcon
        default: return ClockIcon
      }
    }
    
    const getActivityIconClass = (type) => {
      switch (type) {
        case 'employee_added': return 'bg-blue-500'
        case 'leave_approved': return 'bg-green-500'
        case 'leave_requested': return 'bg-yellow-500'
        case 'salary_updated': return 'bg-purple-500'
        default: return 'bg-gray-500'
      }
    }
    
    const getEventTypeClass = (type) => {
      switch (type) {
        case 'deadline': return 'bg-red-500'
        case 'event': return 'bg-blue-500'
        case 'meeting': return 'bg-green-500'
        default: return 'bg-gray-500'
      }
    }
    
    const createCharts = () => {
      // Simple chart implementation using Canvas API
      if (departmentChart.value) {
        const ctx = departmentChart.value.getContext('2d')
        const departments = {}
        
        employees.value.forEach(emp => {
          departments[emp.department] = (departments[emp.department] || 0) + 1
        })
        
        // Simple pie chart
        const total = Object.values(departments).reduce((sum, count) => sum + count, 0)
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']
        
        let currentAngle = 0
        const centerX = ctx.canvas.width / 2
        const centerY = ctx.canvas.height / 2
        const radius = Math.min(centerX, centerY) - 20
        
        Object.entries(departments).forEach(([dept, count], index) => {
          const sliceAngle = (count / total) * 2 * Math.PI
          
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
          ctx.closePath()
          ctx.fillStyle = colors[index % colors.length]
          ctx.fill()
          
          // Add label
          const labelAngle = currentAngle + sliceAngle / 2
          const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7)
          const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7)
          
          ctx.fillStyle = 'white'
          ctx.font = '12px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(dept, labelX, labelY)
          
          currentAngle += sliceAngle
        })
      }
      
      if (salaryChart.value) {
        const ctx = salaryChart.value.getContext('2d')
        const salaryRanges = {
          '40k-60k': 0,
          '60k-80k': 0,
          '80k-100k': 0,
          '100k+': 0
        }
        
        employees.value.forEach(emp => {
          const salary = emp.salary || 0
          if (salary < 60000) salaryRanges['40k-60k']++
          else if (salary < 80000) salaryRanges['60k-80k']++
          else if (salary < 100000) salaryRanges['80k-100k']++
          else salaryRanges['100k+']++
        })
        
        // Simple bar chart
        const maxCount = Math.max(...Object.values(salaryRanges))
        const barWidth = ctx.canvas.width / Object.keys(salaryRanges).length - 20
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
        
        Object.entries(salaryRanges).forEach(([range, count], index) => {
          const barHeight = (count / maxCount) * (ctx.canvas.height - 60)
          const x = index * (barWidth + 20) + 10
          const y = ctx.canvas.height - barHeight - 30
          
          ctx.fillStyle = colors[index]
          ctx.fillRect(x, y, barWidth, barHeight)
          
          // Add label
          ctx.fillStyle = '#374151'
          ctx.font = '12px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(range, x + barWidth / 2, ctx.canvas.height - 10)
          ctx.fillText(count.toString(), x + barWidth / 2, y - 5)
        })
      }
    }
    
    const requestLeave = () => {
      router.push('/leaves')
    }
    
    const generateReport = () => {
      if (window.$toast) {
        window.$toast.info('Report generation feature will be implemented')
      }
    }
    
    let timeInterval
    
    onMounted(() => {
      loadData()
      updateTime()
      timeInterval = setInterval(updateTime, 1000)
      
      // Create charts after a short delay to ensure canvas elements are rendered
      setTimeout(createCharts, 100)
    })
    
    onUnmounted(() => {
      if (timeInterval) {
        clearInterval(timeInterval)
      }
    })
    
    return {
      employees,
      leaves,
      currentTime,
      currentDate,
      departmentChart,
      salaryChart,
      recentActivities,
      upcomingEvents,
      totalEmployees,
      activeEmployees,
      pendingLeaves,
      averageSalary,
      formatTimeAgo,
      formatDate,
      getActivityIcon,
      getActivityIconClass,
      getEventTypeClass,
      requestLeave,
      generateReport
    }
  }
}
</script>

