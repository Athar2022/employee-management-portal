import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Employees from '../views/Employees.vue'
import AddEmployee from '../views/AddEmployee.vue'
import EmployeeProfile from '../views/EmployeeProfile.vue'
import LeavesManagement from '../views/LeavesManagement.vue'
import SalarySummary from '../views/SalarySummary.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/employees',
      name: 'employees',
      component: Employees
    },
    {
      path: '/employees/add',
      name: 'add-employee',
      component: AddEmployee
    },
    {
      path: '/employees/:id',
      name: 'employee-profile',
      component: EmployeeProfile,
      props: true
    },
    {
      path: '/leaves',
      name: 'leaves',
      component: LeavesManagement
    },
    {
      path: '/salary',
      name: 'salary',
      component: SalarySummary
    }
  ]
})

export default router

