<template>
  <div class="w-64 bg-white dark:bg-gray-800 shadow-lg h-screen flex flex-col transition-colors duration-200">
    <!-- Logo/Brand -->
    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <h1 class="text-xl font-bold text-gray-800 dark:text-white">
        Employee Portal
      </h1>
    </div>
    
    <!-- Navigation -->
    <nav class="flex-1 p-4">
      <ul class="space-y-2">
        <li>
          <router-link
            to="/"
            class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            :class="{ 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400': $route.name === 'dashboard' }"
          >
            <DashboardIcon class="w-5 h-5 mr-3" />
            Dashboard
          </router-link>
        </li>
        
        <li>
          <router-link
            to="/employees"
            class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            :class="{ 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400': $route.name === 'employees' }"
          >
            <UsersIcon class="w-5 h-5 mr-3" />
            Employees
          </router-link>
        </li>
        
        <li>
          <router-link
            to="/employees/add"
            class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            :class="{ 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400': $route.name === 'add-employee' }"
          >
            <UserPlusIcon class="w-5 h-5 mr-3" />
            Add Employee
          </router-link>
        </li>
        
        <li>
          <router-link
            to="/leaves"
            class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            :class="{ 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400': $route.name === 'leaves' }"
          >
            <CalendarIcon class="w-5 h-5 mr-3" />
            Leave Management
          </router-link>
        </li>
        
        <li>
          <router-link
            to="/salary"
            class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            :class="{ 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400': $route.name === 'salary' }"
          >
            <CurrencyDollarIcon class="w-5 h-5 mr-3" />
            Salary Summary
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {
  HomeIcon as DashboardIcon,
  UsersIcon,
  UserPlusIcon,
  CalendarIcon,
  CurrencyDollarIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'Sidebar',
  components: {
    DashboardIcon,
    UsersIcon,
    UserPlusIcon,
    CalendarIcon,
    CurrencyDollarIcon
  }
}
</script>

