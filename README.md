# Employee Management Portal

A comprehensive Employee Management Portal built with Vue.js and Tailwind CSS, featuring employee management, leave tracking, salary calculations, and analytics dashboard.

## 🚀 Features

### Core Features
- **Employee Management**: Complete CRUD operations for employee data
- **Add Employee Form**: Comprehensive form with validation for adding new employees
- **Employee Profiles**: Detailed view with contract info, salary, evaluations, and leave history
- **Leave Management**: Request, approve, and track employee leave requests
- **Salary Calculator**: Auto-calculate total salary with base pay, bonuses, and deductions
- **Search & Filter**: Advanced search and filtering across all list views
- **Pagination**: Efficient data handling with pagination support

### UI/UX Features
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Mobile-first design that works on all devices
- **Toast Notifications**: Real-time feedback for user actions (success/error/info)
- **Loading States**: Visual feedback during data operations
- **Form Validation**: Client-side validation with error messages
- **Sidebar Navigation**: Clean navigation with icons and active states

### Advanced Features
- **Analytics Dashboard**: Real-time charts and statistics
- **Department Distribution**: Pie chart showing employee distribution by department
- **Salary Distribution**: Bar chart showing salary ranges
- **Recent Activities**: Timeline of recent system activities
- **Quick Actions**: Fast access to common operations
- **Upcoming Events**: Calendar of important dates and deadlines
- **Local Storage**: Data persistence using browser local storage

## 🛠️ Technology Stack

- **Frontend Framework**: Vue.js 3 (Composition API)
- **CSS Framework**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Heroicons
- **Charts**: Custom Canvas-based charts
- **Storage**: Browser Local Storage
- **Routing**: Vue Router

## 📁 Project Structure

```
employee-management-portal/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Header.vue          # Top navigation header
│   │   ├── Sidebar.vue         # Side navigation menu
│   │   └── ToastContainer.vue  # Toast notification container
│   ├── views/
│   │   ├── Dashboard.vue       # Analytics dashboard
│   │   ├── Employees.vue       # Employee list with search/filter
│   │   ├── AddEmployee.vue     # Add new employee form
│   │   ├── EmployeeProfile.vue # Employee detail view
│   │   ├── LeavesManagement.vue# Leave request management
│   │   └── SalarySummary.vue   # Salary calculator
│   ├── router/
│   │   └── index.js           # Vue Router configuration
│   ├── utils/
│   │   └── toast.js           # Toast notification system
│   ├── App.vue                # Main application component
│   ├── main.js                # Application entry point
│   └── style.css              # Global styles and Tailwind imports
├── dist/                      # Production build files
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee-management-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📱 Pages Overview

### 1. Dashboard
- **Key Metrics**: Total employees, active employees, pending leaves, average salary
- **Charts**: Department distribution (pie chart) and salary distribution (bar chart)
- **Recent Activities**: Timeline of recent system activities
- **Quick Actions**: Fast access to common operations
- **Upcoming Events**: Important dates and deadlines

### 2. Employees
- **Employee List**: Searchable and filterable table of all employees
- **Search**: Real-time search by name, department, or position
- **Filter**: Filter by department and status
- **Actions**: View profile, edit, or delete employees

### 3. Add Employee
- **Personal Information**: Name, email, phone, address
- **Employment Details**: Department, position, start date, status
- **Contract Information**: Contract type, salary details
- **Validation**: Real-time form validation with error messages

### 4. Employee Profile
- **Overview**: Employee basic information and photo
- **Contract**: Contract details and employment information
- **Salary**: Current salary breakdown and history
- **Evaluations**: Performance evaluations with ratings
- **Leaves**: Leave history and current balance

### 5. Leave Management
- **Statistics**: Overview of total, pending, approved, and rejected requests
- **Request List**: Table of all leave requests with status
- **Actions**: Approve, reject, or view leave requests
- **Request Leave**: Modal form to submit new leave requests

### 6. Salary Summary
- **Calculator**: Interactive salary calculator with real-time updates
- **Employee Overview**: Table showing salary information for all employees
- **Calculations**: Base salary + bonus - deductions = net salary
- **Export**: Option to export salary reports

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Dark Mode**: Gray scale with blue accents

### Typography
- **Font Family**: System fonts (sans-serif)
- **Headings**: Bold weights for hierarchy
- **Body Text**: Regular weight for readability

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Consistent styling with hover states
- **Forms**: Clean inputs with focus states
- **Tables**: Responsive with hover effects
- **Charts**: Custom canvas-based visualizations

## 💾 Data Management

### Local Storage Structure
```javascript
// Employees
localStorage.setItem('employees', JSON.stringify([
  {
    id: 1,
    name: "John Doe",
    email: "john@company.com",
    department: "Engineering",
    position: "Senior Developer",
    salary: 75000,
    status: "Active"
    // ... more fields
  }
]))

// Leave Requests
localStorage.setItem('leaves', JSON.stringify([
  {
    id: 1,
    employeeId: 1,
    type: "Annual Leave",
    startDate: "2024-03-15",
    endDate: "2024-03-19",
    status: "Pending"
    // ... more fields
  }
]))
```

## 🔧 Customization

### Adding New Features
1. Create new Vue component in `src/components/` or `src/views/`
2. Add route in `src/router/index.js`
3. Update navigation in `src/components/Sidebar.vue`

### Styling
- Modify `tailwind.config.js` for theme customization
- Add custom CSS in `src/style.css`
- Use Tailwind utility classes for component styling

### Data Storage
- Extend local storage structure in component methods
- Add new data fields to forms and tables
- Update validation rules as needed

## 🚀 Deployment Options

### Static Hosting
- **Netlify**: Drag and drop `dist/` folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Push `dist/` to `gh-pages` branch

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 📝 Git Workflow

The project includes meaningful Git commits and feature branches:

- `master`: Main branch with stable code
- `feature/employee-management`: Employee CRUD operations
- `feature/leave-management`: Leave request system
- `feature/salary-calculator`: Salary calculation features
- `feature/dashboard-analytics`: Dashboard and analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using Vue.js and Tailwind CSS**

