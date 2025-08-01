<template>
  <div class="space-y-6">
    <!-- Header with Search and Actions -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            Employees List
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Manage your team members and their information
          </p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-3">
          <!-- Search -->
          <div class="relative">
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search employees..."
              class="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <!-- Filter -->
          <select
            v-model="selectedDepartment"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Departments</option>
            <option v-for="dept in departments" :key="dept" :value="dept">
              {{ dept }}
            </option>
          </select>
          
          <!-- Add Employee Button -->
          <router-link
            to="/employees/add"
            class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <UserPlusIcon class="h-5 w-5 mr-2" />
            Add Employee
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- Employees Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-200">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Employee
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Department
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Position
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Salary
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
            <tr v-if="filteredEmployees.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                <UsersIcon class="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p class="text-lg font-medium">No employees found</p>
                <p class="text-sm">Get started by adding your first employee.</p>
                <router-link
                  to="/employees/add"
                  class="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  <UserPlusIcon class="h-5 w-5 mr-2" />
                  Add Employee
                </router-link>
              </td>
            </tr>
            
            <tr v-for="employee in paginatedEmployees" :key="employee.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <span class="text-white font-medium">
                        {{ employee.name.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ employee.name }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ employee.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ employee.department }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ employee.position }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                ${{ employee.salary?.toLocaleString() || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(employee.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ employee.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <router-link
                  :to="`/employees/${employee.id}`"
                  class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View
                </router-link>
                <button
                  @click="deleteEmployee(employee.id)"
                  class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div v-if="filteredEmployees.length > itemsPerPage" class="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Showing {{ startItem }} to {{ endItem }} of {{ filteredEmployees.length }} results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="previousPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeftIcon class="h-5 w-5" />
                </button>
                
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="page === currentPage 
                    ? 'bg-blue-50 dark:bg-blue-900 border-blue-500 text-blue-600 dark:text-blue-400' 
                    : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'"
                  class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  {{ page }}
                </button>
                
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRightIcon class="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import {
  MagnifyingGlassIcon,
  UserPlusIcon,
  UsersIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'Employees',
  components: {
    MagnifyingGlassIcon,
    UserPlusIcon,
    UsersIcon,
    ChevronLeftIcon,
    ChevronRightIcon
  },
  setup() {
    const employees = ref([])
    const searchQuery = ref('')
    const selectedDepartment = ref('')
    const currentPage = ref(1)
    const itemsPerPage = ref(10)
    
    // Load employees from localStorage
    const loadEmployees = () => {
      const stored = localStorage.getItem('employees')
      if (stored) {
        employees.value = JSON.parse(stored)
      } else {
        // Add some sample data
        employees.value = [
          {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@company.com',
            department: 'Engineering',
            position: 'Senior Developer',
            salary: 75000,
            status: 'Active'
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@company.com',
            department: 'Marketing',
            position: 'Marketing Manager',
            salary: 65000,
            status: 'Active'
          },
          {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike.johnson@company.com',
            department: 'Sales',
            position: 'Sales Representative',
            salary: 55000,
            status: 'Active'
          }
        ]
        saveEmployees()
      }
    }
    
    const saveEmployees = () => {
      localStorage.setItem('employees', JSON.stringify(employees.value))
    }
    
    const departments = computed(() => {
      const depts = [...new Set(employees.value.map(emp => emp.department))]
      return depts.filter(Boolean)
    })
    
    const filteredEmployees = computed(() => {
      let filtered = employees.value
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(emp => 
          emp.name.toLowerCase().includes(query) ||
          emp.email.toLowerCase().includes(query) ||
          emp.position.toLowerCase().includes(query)
        )
      }
      
      if (selectedDepartment.value) {
        filtered = filtered.filter(emp => emp.department === selectedDepartment.value)
      }
      
      return filtered
    })
    
    const totalPages = computed(() => {
      return Math.ceil(filteredEmployees.value.length / itemsPerPage.value)
    })
    
    const paginatedEmployees = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return filteredEmployees.value.slice(start, end)
    })
    
    const startItem = computed(() => {
      return (currentPage.value - 1) * itemsPerPage.value + 1
    })
    
    const endItem = computed(() => {
      return Math.min(currentPage.value * itemsPerPage.value, filteredEmployees.value.length)
    })
    
    const visiblePages = computed(() => {
      const pages = []
      const total = totalPages.value
      const current = currentPage.value
      
      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        if (current <= 4) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(total)
        } else if (current >= total - 3) {
          pages.push(1)
          pages.push('...')
          for (let i = total - 4; i <= total; i++) {
            pages.push(i)
          }
        } else {
          pages.push(1)
          pages.push('...')
          for (let i = current - 1; i <= current + 1; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(total)
        }
      }
      
      return pages
    })
    
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
    
    const deleteEmployee = (id) => {
      if (confirm('Are you sure you want to delete this employee?')) {
        employees.value = employees.value.filter(emp => emp.id !== id)
        saveEmployees()
        
        if (window.$toast) {
          window.$toast.success('Employee deleted successfully')
        }
      }
    }
    
    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }
    
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }
    
    const goToPage = (page) => {
      if (typeof page === 'number' && page >= 1 && page <= totalPages.value) {
        currentPage.value = page
      }
    }
    
    onMounted(() => {
      loadEmployees()
    })
    
    return {
      employees,
      searchQuery,
      selectedDepartment,
      currentPage,
      itemsPerPage,
      departments,
      filteredEmployees,
      paginatedEmployees,
      totalPages,
      startItem,
      endItem,
      visiblePages,
      getStatusClass,
      deleteEmployee,
      previousPage,
      nextPage,
      goToPage
    }
  }
}
</script>

