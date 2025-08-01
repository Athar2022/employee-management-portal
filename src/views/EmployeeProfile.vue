<template>
  <div v-if="employee" class="space-y-6">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center">
            <span class="text-white text-xl font-bold">
              {{ employee.name.charAt(0).toUpperCase() }}
            </span>
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ employee.name }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ employee.position }} • {{ employee.department }}
            </p>
            <span :class="getStatusClass(employee.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1">
              {{ employee.status }}
            </span>
          </div>
        </div>
        
        <div class="flex space-x-3">
          <router-link
            to="/employees"
            class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <ArrowLeftIcon class="h-5 w-5 mr-2" />
            Back to Employees
          </router-link>
          <button
            @click="editEmployee"
            class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <PencilIcon class="h-5 w-5 mr-2" />
            Edit Employee
          </button>
        </div>
      </div>
    </div>
    
    <!-- Tabs -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-200">
      <div class="border-b border-gray-200 dark:border-gray-700">
        <nav class="-mb-px flex space-x-8 px-6">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="activeTab === tab.id 
              ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'"
            class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
          >
            <component :is="tab.icon" class="h-5 w-5 mr-2 inline" />
            {{ tab.name }}
          </button>
        </nav>
      </div>
      
      <!-- Tab Content -->
      <div class="p-6">
        <!-- Overview Tab -->
        <div v-if="activeTab === 'overview'" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Personal Information -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Personal Information</h4>
              <dl class="space-y-2">
                <div>
                  <dt class="text-xs text-gray-500 dark:text-gray-400">Email</dt>
                  <dd class="text-sm text-gray-900 dark:text-white">{{ employee.email }}</dd>
                </div>
                <div v-if="employee.phone">
                  <dt class="text-xs text-gray-500 dark:text-gray-400">Phone</dt>
                  <dd class="text-sm text-gray-900 dark:text-white">{{ employee.phone }}</dd>
                </div>
                <div v-if="employee.dateOfBirth">
                  <dt class="text-xs text-gray-500 dark:text-gray-400">Date of Birth</dt>
                  <dd class="text-sm text-gray-900 dark:text-white">{{ formatDate(employee.dateOfBirth) }}</dd>
                </div>
              </dl>
            </div>
            
            <!-- Employment Details -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Employment Details</h4>
              <dl class="space-y-2">
                <div>
                  <dt class="text-xs text-gray-500 dark:text-gray-400">Employee ID</dt>
                  <dd class="text-sm text-gray-900 dark:text-white">{{ employee.employeeId }}</dd>
                </div>
                <div v-if="employee.startDate">
                  <dt class="text-xs text-gray-500 dark:text-gray-400">Start Date</dt>
                  <dd class="text-sm text-gray-900 dark:text-white">{{ formatDate(employee.startDate) }}</dd>
                </div>
                <div v-if="employee.employmentType">
                  <dt class="text-xs text-gray-500 dark:text-gray-400">Employment Type</dt>
                  <dd class="text-sm text-gray-900 dark:text-white">{{ employee.employmentType }}</dd>
                </div>
              </dl>
            </div>
            
            <!-- Salary Information -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-3">Salary Information</h4>
              <dl class="space-y-2">
                <div>
                  <dt class="text-xs text-gray-500 dark:text-gray-400">Base Salary</dt>
                  <dd class="text-sm text-gray-900 dark:text-white">${{ employee.baseSalary?.toLocaleString() || 'N/A' }}</dd>
                </div>
                <div v-if="employee.bonus">
                  <dt class="text-xs text-gray-500 dark:text-gray-400">Annual Bonus</dt>
                  <dd class="text-sm text-gray-900 dark:text-white">${{ employee.bonus.toLocaleString() }}</dd>
                </div>
                <div>
                  <dt class="text-xs text-gray-500 dark:text-gray-400">Total Salary</dt>
                  <dd class="text-lg font-semibold text-green-600 dark:text-green-400">${{ employee.salary?.toLocaleString() || 'N/A' }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        
        <!-- Contract Tab -->
        <div v-if="activeTab === 'contract'" class="space-y-6">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Contract Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Contract Type</dt>
                <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ employee.employmentType || 'Full-time' }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</dt>
                <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ formatDate(employee.startDate) || 'N/A' }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Department</dt>
                <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ employee.department }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Position</dt>
                <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ employee.position }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                <dd class="mt-1">
                  <span :class="getStatusClass(employee.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                    {{ employee.status }}
                  </span>
                </dd>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Evaluations Tab -->
        <div v-if="activeTab === 'evaluations'" class="space-y-6">
          <div class="flex items-center justify-between">
            <h4 class="text-lg font-medium text-gray-900 dark:text-white">Performance Evaluations</h4>
            <button
              @click="addEvaluation"
              class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              <PlusIcon class="h-5 w-5 mr-2" />
              Add Evaluation
            </button>
          </div>
          
          <div v-if="evaluations.length === 0" class="text-center py-12">
            <ChartBarIcon class="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p class="text-gray-500 dark:text-gray-400">No evaluations found</p>
            <button
              @click="addEvaluation"
              class="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Add First Evaluation
            </button>
          </div>
          
          <div v-else class="space-y-4">
            <div
              v-for="evaluation in evaluations"
              :key="evaluation.id"
              class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
            >
              <div class="flex items-center justify-between mb-2">
                <h5 class="font-medium text-gray-900 dark:text-white">{{ evaluation.period }}</h5>
                <span :class="getRatingClass(evaluation.rating)" class="px-2 py-1 text-xs font-semibold rounded-full">
                  {{ evaluation.rating }}
                </span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ evaluation.notes }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">{{ formatDate(evaluation.date) }}</p>
            </div>
          </div>
        </div>
        
        <!-- Leaves Tab -->
        <div v-if="activeTab === 'leaves'" class="space-y-6">
          <div class="flex items-center justify-between">
            <h4 class="text-lg font-medium text-gray-900 dark:text-white">Leave History</h4>
            <button
              @click="requestLeave"
              class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
            >
              <CalendarIcon class="h-5 w-5 mr-2" />
              Request Leave
            </button>
          </div>
          
          <div v-if="leaves.length === 0" class="text-center py-12">
            <CalendarIcon class="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p class="text-gray-500 dark:text-gray-400">No leave requests found</p>
          </div>
          
          <div v-else class="space-y-4">
            <div
              v-for="leave in leaves"
              :key="leave.id"
              class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
            >
              <div class="flex items-center justify-between mb-2">
                <h5 class="font-medium text-gray-900 dark:text-white">{{ leave.type }}</h5>
                <span :class="getLeaveStatusClass(leave.status)" class="px-2 py-1 text-xs font-semibold rounded-full">
                  {{ leave.status }}
                </span>
              </div>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-500 dark:text-gray-400">From:</span>
                  <span class="text-gray-900 dark:text-white ml-1">{{ formatDate(leave.startDate) }}</span>
                </div>
                <div>
                  <span class="text-gray-500 dark:text-gray-400">To:</span>
                  <span class="text-gray-900 dark:text-white ml-1">{{ formatDate(leave.endDate) }}</span>
                </div>
              </div>
              <p v-if="leave.reason" class="text-sm text-gray-600 dark:text-gray-400 mt-2">{{ leave.reason }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="text-center py-12">
    <UsersIcon class="mx-auto h-12 w-12 text-gray-400 mb-4" />
    <p class="text-gray-500 dark:text-gray-400">Employee not found</p>
    <router-link
      to="/employees"
      class="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
    >
      Back to Employees
    </router-link>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  ArrowLeftIcon,
  PencilIcon,
  UserIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CalendarIcon,
  PlusIcon,
  UsersIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'EmployeeProfile',
  components: {
    ArrowLeftIcon,
    PencilIcon,
    UserIcon,
    DocumentTextIcon,
    ChartBarIcon,
    CalendarIcon,
    PlusIcon,
    UsersIcon
  },
  setup() {
    const route = useRoute()
    const employee = ref(null)
    const activeTab = ref('overview')
    const evaluations = ref([])
    const leaves = ref([])
    
    const tabs = [
      { id: 'overview', name: 'Overview', icon: UserIcon },
      { id: 'contract', name: 'Contract', icon: DocumentTextIcon },
      { id: 'evaluations', name: 'Evaluations', icon: ChartBarIcon },
      { id: 'leaves', name: 'Leaves', icon: CalendarIcon }
    ]
    
    const loadEmployee = () => {
      const employees = JSON.parse(localStorage.getItem('employees') || '[]')
      employee.value = employees.find(emp => emp.id === parseInt(route.params.id))
      
      if (employee.value) {
        loadEvaluations()
        loadLeaves()
      }
    }
    
    const loadEvaluations = () => {
      // Load evaluations from localStorage or create sample data
      const storedEvaluations = JSON.parse(localStorage.getItem('evaluations') || '[]')
      evaluations.value = storedEvaluations.filter(evaluation => evaluation.employeeId === employee.value.id)
      
      // Add sample evaluation if none exist
      if (evaluations.value.length === 0) {
        evaluations.value = [
          {
            id: 1,
            employeeId: employee.value.id,
            period: 'Q4 2023',
            rating: 'Excellent',
            notes: 'Outstanding performance in all areas. Exceeded targets and showed great leadership skills.',
            date: '2023-12-15'
          }
        ]
      }
    }
    
    const loadLeaves = () => {
      // Load leaves from localStorage or create sample data
      const storedLeaves = JSON.parse(localStorage.getItem('leaves') || '[]')
      leaves.value = storedLeaves.filter(leave => leave.employeeId === employee.value.id)
      
      // Add sample leave if none exist
      if (leaves.value.length === 0) {
        leaves.value = [
          {
            id: 1,
            employeeId: employee.value.id,
            type: 'Annual Leave',
            startDate: '2024-01-15',
            endDate: '2024-01-19',
            status: 'Approved',
            reason: 'Family vacation'
          }
        ]
      }
    }
    
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString()
    }
    
    const getStatusClass = (status) => {
      switch (status) {
        case 'Active':
          return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        case 'Inactive':
          return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        case 'On Leave':
          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        default:
          return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      }
    }
    
    const getRatingClass = (rating) => {
      switch (rating) {
        case 'Excellent':
          return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        case 'Good':
          return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        case 'Needs Improvement':
          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        default:
          return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      }
    }
    
    const getLeaveStatusClass = (status) => {
      switch (status) {
        case 'Approved':
          return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        case 'Pending':
          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        case 'Rejected':
          return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        default:
          return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      }
    }
    
    const editEmployee = () => {
      if (window.$toast) {
        window.$toast.info('Edit functionality will be implemented')
      }
    }
    
    const addEvaluation = () => {
      if (window.$toast) {
        window.$toast.info('Add evaluation functionality will be implemented')
      }
    }
    
    const requestLeave = () => {
      if (window.$toast) {
        window.$toast.info('Leave request functionality will be implemented')
      }
    }
    
    onMounted(() => {
      loadEmployee()
    })
    
    return {
      employee,
      activeTab,
      tabs,
      evaluations,
      leaves,
      formatDate,
      getStatusClass,
      getRatingClass,
      getLeaveStatusClass,
      editEmployee,
      addEvaluation,
      requestLeave
    }
  }
}
</script>

