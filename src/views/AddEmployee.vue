<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            Add New Employee
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Fill in the employee information below
          </p>
        </div>
        <router-link
          to="/employees"
          class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <ArrowLeftIcon class="h-5 w-5 mr-2" />
          Back to Employees
        </router-link>
      </div>
    </div>
    
    <!-- Form -->
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Personal Information -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
        <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">
          Personal Information
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.name }"
              placeholder="Enter full name"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ errors.name }}
            </p>
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.email }"
              placeholder="Enter email address"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ errors.email }}
            </p>
          </div>
          
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter phone number"
            />
          </div>
          
          <div>
            <label for="dateOfBirth" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              v-model="form.dateOfBirth"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      <!-- Employment Information -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
        <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">
          Employment Information
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="employeeId" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Employee ID *
            </label>
            <input
              id="employeeId"
              v-model="form.employeeId"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.employeeId }"
              placeholder="Enter employee ID"
            />
            <p v-if="errors.employeeId" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ errors.employeeId }}
            </p>
          </div>
          
          <div>
            <label for="department" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Department *
            </label>
            <select
              id="department"
              v-model="form.department"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.department }"
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>
            <p v-if="errors.department" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ errors.department }}
            </p>
          </div>
          
          <div>
            <label for="position" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Position *
            </label>
            <input
              id="position"
              v-model="form.position"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.position }"
              placeholder="Enter position title"
            />
            <p v-if="errors.position" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ errors.position }}
            </p>
          </div>
          
          <div>
            <label for="startDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Start Date *
            </label>
            <input
              id="startDate"
              v-model="form.startDate"
              type="date"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.startDate }"
            />
            <p v-if="errors.startDate" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ errors.startDate }}
            </p>
          </div>
          
          <div>
            <label for="employmentType" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Employment Type *
            </label>
            <select
              id="employmentType"
              v-model="form.employmentType"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Intern">Intern</option>
            </select>
          </div>
          
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              id="status"
              v-model="form.status"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Salary Information -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
        <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">
          Salary Information
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label for="baseSalary" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Base Salary *
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
              <input
                id="baseSalary"
                v-model.number="form.baseSalary"
                type="number"
                required
                min="0"
                step="1000"
                class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :class="{ 'border-red-500': errors.baseSalary }"
                placeholder="50000"
              />
            </div>
            <p v-if="errors.baseSalary" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ errors.baseSalary }}
            </p>
          </div>
          
          <div>
            <label for="bonus" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Annual Bonus
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
              <input
                id="bonus"
                v-model.number="form.bonus"
                type="number"
                min="0"
                step="500"
                class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="5000"
              />
            </div>
          </div>
          
          <div>
            <label for="deductions" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Deductions
            </label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
              <input
                id="deductions"
                v-model.number="form.deductions"
                type="number"
                min="0"
                step="100"
                class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1000"
              />
            </div>
          </div>
        </div>
        
        <!-- Calculated Total -->
        <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-blue-900 dark:text-blue-100">
              Total Annual Salary:
            </span>
            <span class="text-lg font-bold text-blue-900 dark:text-blue-100">
              ${{ calculatedSalary.toLocaleString() }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Form Actions -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
        <div class="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <router-link
            to="/employees"
            class="inline-flex items-center justify-center px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            Cancel
          </router-link>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="inline-flex items-center justify-center px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors duration-200"
          >
            <span v-if="isSubmitting" class="mr-2">
              <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </span>
            {{ isSubmitting ? 'Adding Employee...' : 'Add Employee' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'AddEmployee',
  components: {
    ArrowLeftIcon
  },
  setup() {
    const router = useRouter()
    const isSubmitting = ref(false)
    const errors = ref({})
    
    const form = ref({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      employeeId: '',
      department: '',
      position: '',
      startDate: '',
      employmentType: '',
      status: 'Active',
      baseSalary: 0,
      bonus: 0,
      deductions: 0
    })
    
    const calculatedSalary = computed(() => {
      return (form.value.baseSalary || 0) + (form.value.bonus || 0) - (form.value.deductions || 0)
    })
    
    const validateForm = () => {
      errors.value = {}
      
      if (!form.value.name.trim()) {
        errors.value.name = 'Name is required'
      }
      
      if (!form.value.email.trim()) {
        errors.value.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        errors.value.email = 'Please enter a valid email address'
      }
      
      if (!form.value.employeeId.trim()) {
        errors.value.employeeId = 'Employee ID is required'
      }
      
      if (!form.value.department) {
        errors.value.department = 'Department is required'
      }
      
      if (!form.value.position.trim()) {
        errors.value.position = 'Position is required'
      }
      
      if (!form.value.startDate) {
        errors.value.startDate = 'Start date is required'
      }
      
      if (!form.value.baseSalary || form.value.baseSalary <= 0) {
        errors.value.baseSalary = 'Base salary must be greater than 0'
      }
      
      // Check if employee ID already exists
      const employees = JSON.parse(localStorage.getItem('employees') || '[]')
      if (employees.some(emp => emp.employeeId === form.value.employeeId)) {
        errors.value.employeeId = 'Employee ID already exists'
      }
      
      // Check if email already exists
      if (employees.some(emp => emp.email === form.value.email)) {
        errors.value.email = 'Email address already exists'
      }
      
      return Object.keys(errors.value).length === 0
    }
    
    const submitForm = async () => {
      if (!validateForm()) {
        if (window.$toast) {
          window.$toast.error('Please fix the errors below')
        }
        return
      }
      
      isSubmitting.value = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Get existing employees
        const employees = JSON.parse(localStorage.getItem('employees') || '[]')
        
        // Create new employee
        const newEmployee = {
          id: Date.now(),
          ...form.value,
          salary: calculatedSalary.value,
          createdAt: new Date().toISOString()
        }
        
        // Add to employees array
        employees.push(newEmployee)
        
        // Save to localStorage
        localStorage.setItem('employees', JSON.stringify(employees))
        
        if (window.$toast) {
          window.$toast.success('Employee added successfully!')
        }
        
        // Redirect to employees list
        router.push('/employees')
        
      } catch (error) {
        if (window.$toast) {
          window.$toast.error('Failed to add employee. Please try again.')
        }
      } finally {
        isSubmitting.value = false
      }
    }
    
    return {
      form,
      errors,
      isSubmitting,
      calculatedSalary,
      submitForm
    }
  }
}
</script>

