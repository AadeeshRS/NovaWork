# NovaWork - Employee Management System

A comprehensive full-stack web application for managing employee data, attendance, payroll, and leave requests built with Node.js, Express, MongoDB, and Handlebars.

## Academic Project

**Course:** Web Programming (WEBP)  
**Institution:** BML Munjal University  
**Semester:** 3  
**Deadline:** November 16, 2025

## Project Requirements Met

- **Template Engine with Partials** - Handlebars with 4 reusable partials  
- **Authentication System** - Session-based authentication with bcrypt password hashing  
- **Role-Based Access Control** - Admin and Employee roles with protected routes  
- **Data Personalization** - Each user sees only their relevant data  
- **Database Integration** - MongoDB with Mongoose ODM  
- **RESTful API** - Complete CRUD operations for all resources

## Features

### Authentication & Authorization
- **Secure Login System** with bcrypt password hashing
- **Session Management** using express-session (24-hour cookie expiration)
- **Role-Based Access Control** (Admin vs Employee)
- **Password Change Functionality** with current password validation
- **Automatic Session Expiry** and logout

### Admin Features
- **Dashboard** - Overview of company statistics and metrics
- **Employee Management** - Add, edit, view, and manage all employees
- **Department Management** - Manage organizational departments
- **Attendance Tracking** - View and manage employee attendance records
- **Payroll Management** - Process and manage employee salaries
- **Leave Management** - Approve/reject employee leave requests
- **Reports** - Generate and view various reports

### Employee Features
- **Personal Dashboard** - View salary, attendance, and leave statistics
- **Attendance Tracker** - View personal attendance history
- **Payslip Access** - View and download monthly payslips
- **Leave Requests** - Submit and track leave applications
- **Profile Management** - Update personal information (email, phone, address)
- **Change Password** - Secure password update functionality

### Public Pages
- **Home Page** - Landing page with system overview
- **About Page** - Information about NovaWork
- **Contact Page** - Contact form with client-side validation

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Handlebars** - Template engine
- **express-session** - Session management
- **bcryptjs** - Password hashing

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling with gradients and animations
- **JavaScript (ES6+)** - Client-side functionality
- **Handlebars** - Server-side rendering

### Authentication & Security
- **bcryptjs** - Password hashing with 10 salt rounds
- **express-session** - Secure session management
- **Middleware** - Custom authentication and authorization middleware

## Project Structure

```
NovaWork/
│
├── backend/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── seed.js               # Database seeding script
│   │
│   ├── middleware/
│   │   └── auth.js               # Authentication middleware
│   │
│   ├── models/
│   │   ├── Employee.js           # Employee schema
│   │   ├── Department.js         # Department schema
│   │   ├── Attendance.js         # Attendance schema
│   │   ├── Leave.js              # Leave schema
│   │   └── Payroll.js            # Payroll schema
│   │
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── employees.js          # Employee API routes
│   │   ├── departments.js        # Department routes
│   │   ├── attendance.js         # Attendance routes
│   │   ├── leaves.js             # Leave routes
│   │   ├── payroll.js            # Payroll routes
│   │   └── index.js              # Page rendering routes
│   │
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.handlebars   # Main layout template
│   │   │
│   │   ├── partials/
│   │   │   ├── header.handlebars    # Header partial
│   │   │   ├── footer.handlebars    # Footer partial
│   │   │   ├── admin-nav.handlebars # Admin navigation
│   │   │   └── employee-nav.handlebars # Employee navigation
│   │   │
│   │   ├── home.handlebars
│   │   ├── about.handlebars
│   │   ├── contact.handlebars
│   │   ├── login.handlebars
│   │   ├── error.handlebars
│   │   │
│   │   ├── admin-dashboard.handlebars
│   │   ├── admin-employees.handlebars
│   │   ├── admin-departments.handlebars
│   │   ├── admin-attendance.handlebars
│   │   ├── admin-payroll.handlebars
│   │   ├── admin-leaves.handlebars
│   │   ├── admin-reports.handlebars
│   │   │
│   │   ├── employee-dashboard.handlebars
│   │   ├── employee-attendance.handlebars
│   │   ├── employee-payslips.handlebars
│   │   ├── employee-leave.handlebars
│   │   └── employee-profile.handlebars
│   │
│   ├── package.json
│   └── server.js                 # Express server
│
├── frontend/
│   ├── js/
│   │   └── api.js                # API helper functions
│   ├── json/
│   │   ├── employees.json        # Sample employee data
│   │   └── departments.json      # Sample department data
│   └── styles/
│       └── base.css              # Base styles
│
└── README.md
```

## Database Schema

### Employee Model
```javascript
{
  employeeId: String (unique),
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin/employee),
  department: String,
  position: String,
  salary: Number,
  joinDate: Date,
  phone: String,
  address: String,
  status: String (Active/Inactive/On Leave)
}
```

### Department Model
```javascript
{
  departmentId: String (unique),
  name: String,
  description: String,
  headOfDepartment: String,
  employeeCount: Number,
  budget: Number,
  location: String
}
```

### Attendance Model
```javascript
{
  employee: ObjectId (ref: Employee),
  date: Date,
  checkIn: String,
  checkOut: String,
  status: String (Present/Absent/Late/Half Day),
  workHours: Number
}
```

### Leave Model
```javascript
{
  employee: ObjectId (ref: Employee),
  leaveType: String,
  startDate: Date,
  endDate: Date,
  reason: String,
  status: String (Pending/Approved/Rejected),
  appliedDate: Date
}
```

### Payroll Model
```javascript
{
  employee: ObjectId (ref: Employee),
  month: String,
  year: Number,
  basicSalary: Number,
  allowances: Number,
  deductions: Number,
  netSalary: Number,
  paymentDate: Date,
  status: String (Paid/Pending)
}
```

## Default Login Credentials

### Admin Account
- **Email:** `admin@novawork.com`
- **Password:** `admin123`

### Employee Accounts
All employees use the same password: **`password123`**

| Employee ID | Name | Email | Department |
|------------|------|-------|------------|
| EMP001 | Rahul Sharma | emp001@novawork.com | Information Technology |
| EMP002 | Priya Singh | emp002@novawork.com | Finance |
| EMP003 | Amit Kumar | emp003@novawork.com | Human Resources |
| EMP004 | Sneha Patel | emp004@novawork.com | Marketing |
| EMP005 | Vikram Reddy | emp005@novawork.com | Operations |
| EMP006 | Anita Desai | emp006@novawork.com | Sales |
| EMP007 | Karan Mehta | emp007@novawork.com | Information Technology |
| EMP008 | Neha Gupta | emp008@novawork.com | Finance |

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/AadeeshRS/NovaWork.git
cd NovaWork
```

### Step 2: Install Dependencies
```bash
cd backend
npm install
```

### Step 3: Start MongoDB
Make sure MongoDB is running on `mongodb://localhost:27017`

```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

### Step 4: Seed the Database
```bash
node config/seed.js
```

This will create:
- 1 Admin account
- 8 Employee accounts
- Sample departments, attendance, leave, and payroll data

### Step 5: Start the Server
```bash
npm start
# or
node server.js
```

The application will be available at: **http://localhost:3000**

## API Endpoints

### Authentication
- `POST /login` - User login
- `GET /logout` - User logout

### Employee APIs
- `GET /api/employees` - Get all employees (Admin only)
- `GET /api/employees/me` - Get logged-in employee data
- `PUT /api/employees/me` - Update profile
- `POST /api/employees/change-password` - Change password
- `POST /api/employees` - Create employee (Admin only)
- `DELETE /api/employees/:id` - Delete employee (Admin only)

### Attendance APIs
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/employee/:id` - Get employee attendance
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance/:id` - Update attendance

### Leave APIs
- `GET /api/leaves` - Get all leave requests
- `GET /api/leaves/employee/:id` - Get employee leaves
- `POST /api/leaves` - Submit leave request
- `PUT /api/leaves/:id` - Update leave status

### Payroll APIs
- `GET /api/payroll` - Get all payroll records
- `GET /api/payroll/employee/:id` - Get employee payroll
- `POST /api/payroll` - Create payroll entry
- `PUT /api/payroll/:id` - Update payroll

### Department APIs
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

## Security Features

1. **Password Hashing** - All passwords are hashed using bcrypt with 10 salt rounds
2. **Session Management** - Secure sessions with HTTP-only cookies
3. **Authentication Middleware** - Protected routes require authentication
4. **Role-Based Authorization** - Separate admin and employee access levels
5. **Input Validation** - Server-side validation for all user inputs
6. **XSS Protection** - Handlebars auto-escapes HTML by default
7. **Password Strength** - Minimum 6 characters required

## UI/UX Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern Gradients** - Purple and blue gradient themes
- **Smooth Animations** - Hover effects and transitions
- **Intuitive Navigation** - Role-based navigation menus
- **Modal Dialogs** - For edit profile and change password
- **Form Validation** - Client-side and server-side validation
- **Loading States** - User feedback during async operations
- **Error Handling** - User-friendly error messages

## Testing the Application

### Test Admin Flow
1. Login with `admin@novawork.com` / `admin123`
2. Access Admin Dashboard
3. View/Edit employees, departments, attendance, payroll
4. Approve/Reject leave requests
5. Generate reports

### Test Employee Flow
1. Login with `emp001@novawork.com` / `password123`
2. View personalized dashboard with your salary, attendance, leaves
3. Check attendance history
4. View payslips
5. Submit leave request
6. Update profile (email, phone, address)
7. Change password

### Test Data Isolation
1. Login as EMP001 (Rahul Sharma)
2. Note the salary and attendance data
3. Logout and login as EMP002 (Priya Singh)
4. Verify completely different data is shown

## Key Achievements

- **16 Handlebars Views** - Complete templating system  
- **4 Reusable Partials** - Header, Footer, Admin Nav, Employee Nav  
- **5 Database Models** - Employee, Department, Attendance, Leave, Payroll  
- **Session-Based Auth** - No JWT complexity, pure sessions  
- **Role-Based Access** - Admin and Employee with different permissions  
- **Data Personalization** - Each user sees only their data  
- **Password Security** - bcrypt hashing with salt rounds  
- **CRUD Operations** - Complete Create, Read, Update, Delete  
- **RESTful API** - Well-structured API endpoints  
- **Responsive Design** - Mobile-friendly interface  

## Future Enhancements

- [ ] Email integration for notifications
- [ ] Real-time dashboard updates using WebSockets
- [ ] Advanced reporting with charts and graphs
- [ ] Document upload functionality
- [ ] Two-factor authentication
- [ ] Password reset via email
- [ ] Export data to PDF/Excel
- [ ] Biometric attendance integration
- [ ] Mobile application

## License

This project is created for academic purposes as part of the Web Programming course at BML Munjal University.

## Acknowledgments

- BML Munjal University for the project opportunity
- Web Programming course instructors
- MongoDB documentation
- Express.js community
- Handlebars.js documentation

---

