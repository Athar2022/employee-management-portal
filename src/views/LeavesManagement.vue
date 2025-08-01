<template>
  <div class="space-y-6">
    <!-- Header with Actions -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            Leave Management
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Manage employee leave requests and track leave balances
          </p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-3">
          <!-- Filter by Status -->
          <select
            v-model="selectedStatus"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          
          <!-- Request Leave Button -->
          <button
            @click="showRequestModal = true"
            class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
          >
            <CalendarIcon class="h-5 w-5 mr-2" />
            Request Leave
          </button>
        </div>
      </div>
    </div>
    
    <!-- Leave Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <CalendarIcon class="h-8 w-8 text-blue-500" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Requests</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ totalRequests }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <ClockIcon class="h-8 w-8 text-yellow-500" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ pendingRequests }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <CheckCircleIcon class="h-8 w-8 text-green-500" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ approvedRequests }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <XCircleIcon class="h-8 w-8 text-red-500" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Rejected</p>
            <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ rejectedRequests }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Leave Requests Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-200">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Employee
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Leave Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Duration
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-if="filteredLeaves.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                <CalendarIcon class="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p class="text-lg font-medium">No leave requests found</p>
                <p class="text-sm">Start by requesting your first leave.</p>
              </td>
            </tr>
            
            <tr v-for="leave in filteredLeaves" :key="leave.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <span class="text-white font-medium">
                        {{ getEmployeeName(leave.employeeId).charAt(0).toUpperCase() }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ getEmployeeName(leave.employeeId) }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ getEmployeeDepartment(leave.employeeId) }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ leave.type }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <div>{{ formatDate(leave.startDate) }} - {{ formatDate(leave.endDate) }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ calculateDays(leave.startDate, leave.endDate) }} days</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(leave.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ leave.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  v-if="leave.status === 'Pending'"
                  @click="updateLeaveStatus(leave.id, 'Approved')"
                  class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                >
                  Approve
                </button>
                <button
                  v-if="leave.status === 'Pending'"
                  @click="updateLeaveStatus(leave.id, 'Rejected')"
                  class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  Reject
                </button>
                <button
                  @click="viewLeaveDetails(leave)"
                  class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Request Leave Modal -->
    <div v-if="showRequestModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Request Leave</h3>
          
          <form @submit.prevent="submitLeaveRequest" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Employee
              </label>
              <select
                v-model="leaveForm.employeeId"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Employee</option>
                <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                  {{ employee.name }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Leave Type
              </label>
              <select
                v-model="leaveForm.type"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Type</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Personal Leave">Personal Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
                <option value="Paternity Leave">Paternity Leave</option>
              </select>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  v-model="leaveForm.startDate"
                  type="date"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date
                </label>
                <input
                  v-model="leaveForm.endDate"
                  type="date"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reason
              </label>
              <textarea
                v-model="leaveForm.reason"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter reason for leave..."
              ></textarea>
            </div>
            
            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                @click="showRequestModal = false"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import {
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'LeavesManagement',
  components: {
    CalendarIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon
  },
  setup() {
    const leaves = ref([])
    const employees = ref([])
    const selectedStatus = ref('')
    const showRequestModal = ref(false)
    
    const leaveForm = ref({
      employeeId: '',
      type: '',
      startDate: '',
      endDate: '',
      reason: ''
    })
    
    const loadData = () => {
      // Load employees
      employees.value = JSON.parse(localStorage.getItem('employees') || '[]')
      
      // Load leaves
      const storedLeaves = JSON.parse(localStorage.getItem('leaves') || '[]')
      if (storedLeaves.length === 0) {
        // Add sample leave data
        leaves.value = [
          {
            id: 1,
            employeeId: 1,
            type: 'Annual Leave',
            startDate: '2024-02-15',
            endDate: '2024-02-19',
            status: 'Pending',
            reason: 'Family vacation',
            requestDate: '2024-02-01'
          },
          {
            id: 2,
            employeeId: 2,
            type: 'Sick Leave',
            startDate: '2024-02-10',
            endDate: '2024-02-12',
            status: 'Approved',
            reason: 'Medical appointment',
            requestDate: '2024-02-08'
          },
          {
            id: 3,
            employeeId: 3,
            type: 'Personal Leave',
            startDate: '2024-02-20',
            endDate: '2024-02-21',
            status: 'Rejected',
            reason: 'Personal matters',
            requestDate: '2024-02-05'
          }
        ]
        localStorage.setItem('leaves', JSON.stringify(leaves.value))
      } else {
        leaves.value = storedLeaves
      }
    }
    
    const filteredLeaves = computed(() => {
      if (!selectedStatus.value) return leaves.value
      return leaves.value.filter(leave => leave.status === selectedStatus.value)
    })
    
    const totalRequests = computed(() => leaves.value.length)
    const pendingRequests = computed(() => leaves.value.filter(leave => leave.status === 'Pending').length)
    const approvedRequests = computed(() => leaves.value.filter(leave => leave.status === 'Approved').length)
    const rejectedRequests = computed(() => leaves.value.filter(leave => leave.status === 'Rejected').length)
    
    const getEmployeeName = (employeeId) => {
      const employee = employees.value.find(emp => emp.id === employeeId)
      return employee ? employee.name : 'Unknown Employee'
    }
    
    const getEmployeeDepartment = (employeeId) => {
      const employee = employees.value.find(emp => emp.id === employeeId)
      return employee ? employee.department : 'Unknown Department'
    }
    
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }
    
    const calculateDays = (startDate, endDate) => {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      return diffDays
    }
    
    const getStatusClass = (status) => {
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
    
    const updateLeaveStatus = (leaveId, newStatus) => {
      const leaveIndex = leaves.value.findIndex(leave => leave.id === leaveId)
      if (leaveIndex !== -1) {
        leaves.value[leaveIndex].status = newStatus
        localStorage.setItem('leaves', JSON.stringify(leaves.value))
        
        if (window.$toast) {
          window.$toast.success(`Leave request ${newStatus.toLowerCase()} successfully`)
        }
      }
    }
    
    const viewLeaveDetails = (leave) => {
      if (window.$toast) {
        window.$toast.info('Leave details view will be implemented')
      }
    }
    
    const submitLeaveRequest = () => {
      const newLeave = {
        id: Date.now(),
        ...leaveForm.value,
        employeeId: parseInt(leaveForm.value.employeeId),
        status: 'Pending',
        requestDate: new Date().toISOString().split('T')[0]
      }
      
      leaves.value.push(newLeave)
      localStorage.setItem('leaves', JSON.stringify(leaves.value))
      
      // Reset form
      leaveForm.value = {
        employeeId: '',
        type: '',
        startDate: '',
        endDate: '',
        reason: ''
      }
      
      showRequestModal.value = false
      
      if (window.$toast) {
        window.$toast.success('Leave request submitted successfully')
      }
    }
    
    onMounted(() => {
      loadData()
    })
    
    return {
      leaves,
      employees,
      selectedStatus,
      showRequestModal,
      leaveForm,
      filteredLeaves,
      totalRequests,
      pendingRequests,
      approvedRequests,
      rejectedRequests,
      getEmployeeName,
      getEmployeeDepartment,
      formatDate,
      calculateDays,
      getStatusClass,
      updateLeaveStatus,
      viewLeaveDetails,
      submitLeaveRequest
    }
  }
}
</script>

