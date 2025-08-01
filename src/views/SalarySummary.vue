<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            Salary Summary
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Calculate and manage employee salaries
          </p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-3">
          <!-- Employee Filter -->
          <select
            v-model="selectedEmployee"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Employees</option>
            <option v-for="employee in employees" :key="employee.id" :value="employee.id">
              {{ employee.name }}
            </option>
          </select>
          
          <!-- Export Button -->
          <button
            @click="exportSalaryReport"
            class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <DocumentArrowDownIcon class="h-5 w-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>
    </div>
    
    <!-- Salary Calculator -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
      <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Salary Calculator
      </h4>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Input Section -->
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Employee
            </label>
            <select
              v-model="calculator.employeeId"
              @change="loadEmployeeData"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Employee</option>
              <option v-for="employee in employees" :key="employee.id" :value="employee.id">
                {{ employee.name }}
              </option>
            </select>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Base Salary
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                <input
                  v-model.number="calculator.baseSalary"
                  type="number"
                  min="0"
                  step="1000"
                  class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="50000"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Annual Bonus
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                <input
                  v-model.number="calculator.bonus"
                  type="number"
                  min="0"
                  step="500"
                  class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5000"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Overtime Hours
              </label>
              <input
                v-model.number="calculator.overtimeHours"
                type="number"
                min="0"
                step="1"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Overtime Rate ($/hour)
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                <input
                  v-model.number="calculator.overtimeRate"
                  type="number"
                  min="0"
                  step="5"
                  class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="30"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Deductions
            </label>
            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Tax (%)</label>
                  <input
                    v-model.number="calculator.taxRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="20"
                  />
                </div>
                <div>
                  <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Insurance ($)</label>
                  <input
                    v-model.number="calculator.insurance"
                    type="number"
                    min="0"
                    step="50"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="500"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Retirement ($)</label>
                  <input
                    v-model.number="calculator.retirement"
                    type="number"
                    min="0"
                    step="100"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">Other ($)</label>
                  <input
                    v-model.number="calculator.otherDeductions"
                    type="number"
                    min="0"
                    step="50"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Results Section -->
        <div class="space-y-6">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h5 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Calculation Results</h5>
            
            <div class="space-y-4">
              <!-- Gross Income -->
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-sm text-gray-600 dark:text-gray-400">Base Salary</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">
                  ${{ (calculator.baseSalary || 0).toLocaleString() }}
                </span>
              </div>
              
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-sm text-gray-600 dark:text-gray-400">Annual Bonus</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">
                  ${{ (calculator.bonus || 0).toLocaleString() }}
                </span>
              </div>
              
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-sm text-gray-600 dark:text-gray-400">Overtime Pay</span>
                <span class="text-sm font-medium text-gray-900 dark:text-white">
                  ${{ overtimePay.toLocaleString() }}
                </span>
              </div>
              
              <div class="flex justify-between items-center py-2 border-b-2 border-gray-300 dark:border-gray-500">
                <span class="text-base font-medium text-gray-900 dark:text-white">Gross Income</span>
                <span class="text-base font-bold text-green-600 dark:text-green-400">
                  ${{ grossIncome.toLocaleString() }}
                </span>
              </div>
              
              <!-- Deductions -->
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-sm text-gray-600 dark:text-gray-400">Tax ({{ calculator.taxRate || 0 }}%)</span>
                <span class="text-sm font-medium text-red-600 dark:text-red-400">
                  -${{ taxAmount.toLocaleString() }}
                </span>
              </div>
              
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-sm text-gray-600 dark:text-gray-400">Insurance</span>
                <span class="text-sm font-medium text-red-600 dark:text-red-400">
                  -${{ (calculator.insurance || 0).toLocaleString() }}
                </span>
              </div>
              
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-sm text-gray-600 dark:text-gray-400">Retirement</span>
                <span class="text-sm font-medium text-red-600 dark:text-red-400">
                  -${{ (calculator.retirement || 0).toLocaleString() }}
                </span>
              </div>
              
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                <span class="text-sm text-gray-600 dark:text-gray-400">Other Deductions</span>
                <span class="text-sm font-medium text-red-600 dark:text-red-400">
                  -${{ (calculator.otherDeductions || 0).toLocaleString() }}
                </span>
              </div>
              
              <div class="flex justify-between items-center py-2 border-b-2 border-gray-300 dark:border-gray-500">
                <span class="text-base font-medium text-gray-900 dark:text-white">Total Deductions</span>
                <span class="text-base font-bold text-red-600 dark:text-red-400">
                  -${{ totalDeductions.toLocaleString() }}
                </span>
              </div>
              
              <!-- Net Income -->
              <div class="flex justify-between items-center py-3 bg-blue-50 dark:bg-blue-900 rounded-lg px-4">
                <span class="text-lg font-bold text-blue-900 dark:text-blue-100">Net Annual Salary</span>
                <span class="text-xl font-bold text-blue-900 dark:text-blue-100">
                  ${{ netIncome.toLocaleString() }}
                </span>
              </div>
              
              <div class="flex justify-between items-center py-2 bg-gray-100 dark:bg-gray-600 rounded-lg px-4">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Take-Home</span>
                <span class="text-lg font-bold text-gray-900 dark:text-white">
                  ${{ (netIncome / 12).toLocaleString(undefined, { maximumFractionDigits: 0 }) }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              @click="saveCalculation"
              :disabled="!calculator.employeeId"
              class="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-200"
            >
              <CheckIcon class="h-5 w-5 mr-2" />
              Save Calculation
            </button>
            <button
              @click="resetCalculator"
              class="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <ArrowPathIcon class="h-5 w-5 mr-2" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Employee Salary Overview -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-200">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h4 class="text-lg font-medium text-gray-900 dark:text-white">
          Employee Salary Overview
        </h4>
      </div>
      
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
                Base Salary
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Bonus
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Total Salary
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-if="filteredEmployees.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                <CurrencyDollarIcon class="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p class="text-lg font-medium">No employees found</p>
                <p class="text-sm">Add employees to see salary information.</p>
              </td>
            </tr>
            
            <tr v-for="employee in filteredEmployees" :key="employee.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
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
                      {{ employee.position }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ employee.department }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                ${{ (employee.baseSalary || 0).toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                ${{ (employee.bonus || 0).toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                ${{ (employee.salary || 0).toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="loadEmployeeInCalculator(employee)"
                  class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                >
                  Calculate
                </button>
                <button
                  @click="viewSalaryDetails(employee)"
                  class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                >
                  Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import {
  DocumentArrowDownIcon,
  CheckIcon,
  ArrowPathIcon,
  CurrencyDollarIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'SalarySummary',
  components: {
    DocumentArrowDownIcon,
    CheckIcon,
    ArrowPathIcon,
    CurrencyDollarIcon
  },
  setup() {
    const employees = ref([])
    const selectedEmployee = ref('')
    
    const calculator = ref({
      employeeId: '',
      baseSalary: 0,
      bonus: 0,
      overtimeHours: 0,
      overtimeRate: 30,
      taxRate: 20,
      insurance: 500,
      retirement: 1000,
      otherDeductions: 0
    })
    
    const loadEmployees = () => {
      employees.value = JSON.parse(localStorage.getItem('employees') || '[]')
    }
    
    const filteredEmployees = computed(() => {
      if (!selectedEmployee.value) return employees.value
      return employees.value.filter(emp => emp.id === parseInt(selectedEmployee.value))
    })
    
    const overtimePay = computed(() => {
      return (calculator.value.overtimeHours || 0) * (calculator.value.overtimeRate || 0)
    })
    
    const grossIncome = computed(() => {
      return (calculator.value.baseSalary || 0) + (calculator.value.bonus || 0) + overtimePay.value
    })
    
    const taxAmount = computed(() => {
      return grossIncome.value * ((calculator.value.taxRate || 0) / 100)
    })
    
    const totalDeductions = computed(() => {
      return taxAmount.value + 
             (calculator.value.insurance || 0) + 
             (calculator.value.retirement || 0) + 
             (calculator.value.otherDeductions || 0)
    })
    
    const netIncome = computed(() => {
      return Math.max(0, grossIncome.value - totalDeductions.value)
    })
    
    const loadEmployeeData = () => {
      if (calculator.value.employeeId) {
        const employee = employees.value.find(emp => emp.id === parseInt(calculator.value.employeeId))
        if (employee) {
          calculator.value.baseSalary = employee.baseSalary || 0
          calculator.value.bonus = employee.bonus || 0
        }
      }
    }
    
    const loadEmployeeInCalculator = (employee) => {
      calculator.value.employeeId = employee.id
      calculator.value.baseSalary = employee.baseSalary || 0
      calculator.value.bonus = employee.bonus || 0
      
      // Scroll to calculator
      document.querySelector('.space-y-6').children[1].scrollIntoView({ behavior: 'smooth' })
    }
    
    const saveCalculation = () => {
      if (!calculator.value.employeeId) return
      
      const employeeIndex = employees.value.findIndex(emp => emp.id === parseInt(calculator.value.employeeId))
      if (employeeIndex !== -1) {
        employees.value[employeeIndex] = {
          ...employees.value[employeeIndex],
          baseSalary: calculator.value.baseSalary,
          bonus: calculator.value.bonus,
          salary: netIncome.value
        }
        
        localStorage.setItem('employees', JSON.stringify(employees.value))
        
        if (window.$toast) {
          window.$toast.success('Salary calculation saved successfully!')
        }
      }
    }
    
    const resetCalculator = () => {
      calculator.value = {
        employeeId: '',
        baseSalary: 0,
        bonus: 0,
        overtimeHours: 0,
        overtimeRate: 30,
        taxRate: 20,
        insurance: 500,
        retirement: 1000,
        otherDeductions: 0
      }
    }
    
    const exportSalaryReport = () => {
      if (window.$toast) {
        window.$toast.info('Export functionality will be implemented')
      }
    }
    
    const viewSalaryDetails = (employee) => {
      if (window.$toast) {
        window.$toast.info(`Viewing salary details for ${employee.name}`)
      }
    }
    
    onMounted(() => {
      loadEmployees()
    })
    
    return {
      employees,
      selectedEmployee,
      calculator,
      filteredEmployees,
      overtimePay,
      grossIncome,
      taxAmount,
      totalDeductions,
      netIncome,
      loadEmployeeData,
      loadEmployeeInCalculator,
      saveCalculation,
      resetCalculator,
      exportSalaryReport,
      viewSalaryDetails
    }
  }
}
</script>

