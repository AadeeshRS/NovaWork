# Employee Salary Management System - HTML/CSS Version

This project contains static HTML and CSS versions of all pages from the MERN Employee Salary Management System. Each page is standalone and connected through anchor tag navigation.

## 📁 Project Structure

```
d:\only css\
├── styles/
│   └── base.css                    # Shared styles and components
├── home.html                       # Landing page with features overview
├── about.html                      # About us page with company info
├── contact.html                    # Contact form and information
├── login.html                      # Authentication page
├── dashboard.html                  # Main dashboard overview
├── admin-dashboard.html            # Admin control panel
├── admin-employees.html            # Employee management table
├── employee-dashboard.html         # Employee portal
└── README.md                       # This file
```

## 🌟 Features

### Base Styles (`styles/base.css`)
- Responsive design system
- Navigation components
- Form elements
- Card layouts
- Button styles
- Grid layouts
- Utility classes

### Pages Overview

#### 1. **Home Page** (`home.html`)
- Hero section with call-to-action
- Features grid (6 main features)
- Statistics section
- Company overview

#### 2. **About Page** (`about.html`)
- Company mission and vision
- Team member profiles
- Company statistics
- Values and innovation highlights

#### 3. **Contact Page** (`contact.html`)
- Contact form with validation styling
- Office information and hours
- FAQ section
- Social media links

#### 4. **Login Page** (`login.html`)
- User type selection (Admin/Employee)
- Authentication form
- Responsive design
- Role-based redirects (via JavaScript)

#### 5. **Dashboard** (`dashboard.html`)
- Overview statistics cards
- Recent activities feed
- Quick action buttons
- Charts placeholder section

#### 6. **Admin Dashboard** (`admin-dashboard.html`)
- Admin-specific navigation
- Management sections:
  - Employee Management
  - Salary & Payroll
  - Attendance & Time
  - Reports & Analytics
- Quick statistics
- Recent employees table
- Pending tasks list

#### 7. **Admin Employees** (`admin-employees.html`)
- Employee data table
- Search and filter controls
- Employee status management
- Action buttons (View/Edit/Delete)
- Pagination controls

#### 8. **Employee Dashboard** (`employee-dashboard.html`)
- Personal salary information
- Attendance statistics
- Leave balance display
- Recent payslips
- Quick actions for employees

## 🎨 Design System

### Color Palette
- **Primary**: Linear gradient from #667eea to #764ba2
- **Success**: #48bb78 to #38a169
- **Warning**: #ed8936 to #dd6b20
- **Info**: #4299e1 to #3182ce
- **Backgrounds**: #f8fafc, #f7fafc
- **Text**: #1a202c (dark), #4a5568 (medium), #6b7280 (light)

### Typography
- **Font Family**: Satoshi, -apple-system, BlinkMacSystemFont, 'Segoe UI'
- **Headings**: 700 weight, varying sizes
- **Body**: 400 weight, 1.6 line height

### Components
- **Cards**: White background, rounded corners, subtle shadows
- **Buttons**: Gradient backgrounds, hover effects
- **Tables**: Responsive, hover states, alternating rows
- **Forms**: Clean inputs, focus states, validation styling

## 🔗 Navigation Flow

The pages are interconnected through a consistent navigation system:

```
Home ←→ About ←→ Contact ←→ Login
  ↓
Dashboard (Main Overview)
  ↓
├── Admin Dashboard → Admin Employees → [Other Admin Pages]
└── Employee Dashboard → [Employee Pages]
```

### Navigation Links in Each Page:
- **Main Navigation**: Home, About, Contact, Login, Dashboard
- **Admin Navigation**: Dashboard, Employees, Departments, Payroll, Attendance, Reports
- **Employee Navigation**: Dashboard, Profile, Payslips, Attendance, Leave

## 📱 Responsive Design

All pages are fully responsive with breakpoints:
- **Desktop**: 1200px+ (full features)
- **Tablet**: 768px-1199px (adapted layouts)
- **Mobile**: <768px (stacked layouts, simplified navigation)

## 🚀 Getting Started

1. **Open any HTML file** in a web browser
2. **Start with `home.html`** for the main landing page
3. **Navigate using the menu** or direct links
4. **Try the login page** to see role-based navigation

## 🎯 Key Features Implemented

### Visual Design
- ✅ Modern gradient designs
- ✅ Consistent color scheme
- ✅ Professional typography
- ✅ Responsive layouts
- ✅ Hover animations
- ✅ Card-based layouts

### Functionality (Static)
- ✅ Navigation between all pages
- ✅ Form layouts (no backend processing)
- ✅ Table displays with sample data
- ✅ Dashboard statistics displays
- ✅ Role-based page designs
- ✅ Mobile-responsive menus

### Pages Included
- ✅ Landing/Home page
- ✅ About company page
- ✅ Contact page with form
- ✅ Login page with user types
- ✅ Main dashboard overview
- ✅ Admin dashboard and management
- ✅ Employee portal and features

## 💡 Usage Notes

1. **No Backend Required**: All pages are static HTML/CSS
2. **JavaScript**: Minimal JS for interactive elements (user type selection, simple navigation)
3. **Data**: Sample data is hardcoded for demonstration
4. **Forms**: Styled but not functional (no form processing)
5. **Navigation**: All internal links work between pages

## 🔧 Customization

To customize the design:

1. **Colors**: Modify CSS custom properties in `base.css`
2. **Typography**: Change font families and sizes in base styles
3. **Layout**: Adjust grid templates and spacing
4. **Content**: Update HTML content in individual pages
5. **Images**: Add actual images to replace emoji placeholders

## 📋 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🎉 Ready to Use

All pages are complete and ready to use as-is, or as a foundation for a full application with backend integration. The design system is consistent and professional, suitable for a real salary management system.

---

**Note**: This is a static HTML/CSS representation of the MERN stack application. For full functionality, integrate with a backend API and add JavaScript for dynamic features.