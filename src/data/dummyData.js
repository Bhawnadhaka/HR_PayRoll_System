// Comprehensive Dummy Data for HR System

const employeesData = [
  { empId: 'EMP001', name: 'Raj Kumar', position: 'Senior Software Engineer', department: 'Engineering', salary: 95000, email: 'raj@company.com', joinDate: '2022-01-15', empType: 'Full-time' },
  { empId: 'EMP002', name: 'Priya Sharma', position: 'HR Manager', department: 'Human Resources', salary: 85000, email: 'priya@company.com', joinDate: '2021-06-10', empType: 'Full-time' },
  { empId: 'EMP003', name: 'Amit Patel', position: 'Junior Developer', department: 'Engineering', salary: 55000, email: 'amit@company.com', joinDate: '2023-03-20', empType: 'Full-time' },
  { empId: 'EMP004', name: 'Sneha Reddy', position: 'UI/UX Designer', department: 'Design', salary: 70000, email: 'sneha@company.com', joinDate: '2022-08-12', empType: 'Full-time' },
  { empId: 'EMP005', name: 'Vikram Singh', position: 'DevOps Engineer', department: 'Engineering', salary: 90000, email: 'vikram@company.com', joinDate: '2021-11-05', empType: 'Full-time' },
  { empId: 'EMP006', name: 'Anjali Mehta', position: 'Product Manager', department: 'Product', salary: 110000, email: 'anjali@company.com', joinDate: '2020-04-18', empType: 'Full-time' },
  { empId: 'EMP007', name: 'Rohit Gupta', position: 'QA Engineer', department: 'Engineering', salary: 60000, email: 'rohit@company.com', joinDate: '2023-01-08', empType: 'Full-time' },
  { empId: 'EMP008', name: 'Neha Kapoor', position: 'Marketing Specialist', department: 'Marketing', salary: 65000, email: 'neha@company.com', joinDate: '2022-09-25', empType: 'Full-time' },
  { empId: 'EMP009', name: 'Arjun Rao', position: 'Data Scientist', department: 'Analytics', salary: 105000, email: 'arjun@company.com', joinDate: '2021-02-14', empType: 'Full-time' },
  { empId: 'EMP010', name: 'Pooja Desai', position: 'Sales Executive', department: 'Sales', salary: 58000, email: 'pooja@company.com', joinDate: '2023-05-30', empType: 'Full-time' },
  { empId: 'EMP011', name: 'Karthik Iyer', position: 'Backend Developer', department: 'Engineering', salary: 80000, email: 'karthik@company.com', joinDate: '2022-02-20', empType: 'Full-time' },
  { empId: 'EMP012', name: 'Divya Nair', position: 'Content Writer', department: 'Marketing', salary: 50000, email: 'divya@company.com', joinDate: '2023-07-15', empType: 'Full-time' },
  { empId: 'EMP013', name: 'Sanjay Pillai', position: 'Team Lead', department: 'Engineering', salary: 125000, email: 'sanjay@company.com', joinDate: '2020-01-10', empType: 'Full-time' },
  { empId: 'EMP014', name: 'Kavita Joshi', position: 'Accountant', department: 'Finance', salary: 62000, email: 'kavita@company.com', joinDate: '2022-11-08', empType: 'Full-time' },
  { empId: 'EMP015', name: 'Manish Verma', position: 'System Admin', department: 'IT', salary: 68000, email: 'manish@company.com', joinDate: '2021-09-22', empType: 'Full-time' },
  { empId: 'EMP016', name: 'Ritu Agarwal', position: 'Business Analyst', department: 'Product', salary: 78000, email: 'ritu@company.com', joinDate: '2022-04-12', empType: 'Full-time' },
  { empId: 'EMP017', name: 'Suresh Kumar', position: 'Support Engineer', department: 'Support', salary: 52000, email: 'suresh@company.com', joinDate: '2023-02-28', empType: 'Full-time' },
  { empId: 'EMP018', name: 'Meera Krishnan', position: 'Graphic Designer', department: 'Design', salary: 58000, email: 'meera@company.com', joinDate: '2022-06-18', empType: 'Full-time' },
  { empId: 'EMP019', name: 'Rahul Saxena', position: 'Frontend Developer', department: 'Engineering', salary: 75000, email: 'rahul@company.com', joinDate: '2021-12-05', empType: 'Full-time' },
  { empId: 'EMP020', name: 'Swati Bansal', position: 'HR Executive', department: 'Human Resources', salary: 48000, email: 'swati@company.com', joinDate: '2023-08-20', empType: 'Full-time' },
  // Interns
  { empId: 'INT001', name: 'Aarav Gupta', position: 'Software Development Intern', department: 'Engineering', salary: 15000, email: 'aarav@company.com', joinDate: '2025-09-01', empType: 'Intern' },
  { empId: 'INT002', name: 'Diya Malhotra', position: 'UI/UX Design Intern', department: 'Design', salary: 12000, email: 'diya@company.com', joinDate: '2025-09-15', empType: 'Intern' },
  { empId: 'INT003', name: 'Ishaan Khanna', position: 'Data Analytics Intern', department: 'Analytics', salary: 14000, email: 'ishaan@company.com', joinDate: '2025-10-01', empType: 'Intern' },
  { empId: 'INT004', name: 'Ananya Bose', position: 'Marketing Intern', department: 'Marketing', salary: 10000, email: 'ananya@company.com', joinDate: '2025-11-01', empType: 'Intern' },
  // Part-time
  { empId: 'PT001', name: 'Lakshmi Iyer', position: 'Part-time Content Writer', department: 'Marketing', salary: 25000, email: 'lakshmi@company.com', joinDate: '2024-06-10', empType: 'Part-time' },
  { empId: 'PT002', name: 'Aditya Menon', position: 'Part-time Graphic Designer', department: 'Design', salary: 28000, email: 'aditya@company.com', joinDate: '2024-08-22', empType: 'Part-time' },
  { empId: 'PT003', name: 'Sanya Chopra', position: 'Part-time Customer Support', department: 'Support', salary: 22000, email: 'sanya@company.com', joinDate: '2025-01-05', empType: 'Part-time' },
]

export let employees = [...employeesData]

// Generate 6 months of attendance data
const generateAttendance = () => {
  const months = ['August 2025', 'September 2025', 'October 2025', 'November 2025', 'December 2025', 'January 2026']
  const attendance = []
  
  employeesData.forEach(emp => {
    months.forEach(month => {
      const totalDays = [31, 30, 31, 30, 31, 31][months.indexOf(month)]
      const weekends = 8
      const sickLeave = Math.floor(Math.random() * 2)
      const paidLeave = Math.floor(Math.random() * 3)
      const unpaidLeave = Math.random() > 0.9 ? Math.floor(Math.random() * 2) : 0
      const overtimeHours = Math.random() > 0.7 ? Math.floor(Math.random() * 10) : 0
      const daysWorked = totalDays - weekends - sickLeave - paidLeave - unpaidLeave
      
      attendance.push({
        empId: emp.empId,
        empName: emp.name,
        month,
        totalDays,
        weekends,
        sickLeave,
        paidLeave,
        unpaidLeave,
        daysWorked,
        overtimeHours
      })
    })
  })
  
  return attendance
}

// Generate attendance first
export const attendance = generateAttendance()

// Generate payroll data based on generated attendance
const generatePayroll = () => {
  const payroll = []
  
  attendance.forEach(att => {
    const emp = employeesData.find(e => e.empId === att.empId)
    if (!emp) return
    
    const monthlyCTC = emp.salary
    const dailyRate = monthlyCTC / att.totalDays
    const unpaidDeduction = dailyRate * att.unpaidLeave
    const basePay = monthlyCTC - unpaidDeduction
    const overtimePay = (dailyRate / 8) * 1.5 * att.overtimeHours
    const grossPay = basePay + overtimePay
    const employeePF = Math.min(grossPay * 0.12, 1800)
    const professionalTax = 200
    const totalDeductions = employeePF + professionalTax
    const netPay = grossPay - totalDeductions
    
    payroll.push({
      empId: emp.empId,
      empName: emp.name,
      month: att.month,
      monthlyCTC,
      basePay: basePay.toFixed(2),
      overtimePay: overtimePay.toFixed(2),
      grossPay: grossPay.toFixed(2),
      employeePF: employeePF.toFixed(2),
      professionalTax: professionalTax.toFixed(2),
      totalDeductions: totalDeductions.toFixed(2),
      netPay: netPay.toFixed(2),
      annualCTC: monthlyCTC * 12,
      annualTakeHome: (netPay * 12).toFixed(2)
    })
  })
  
  return payroll
}

export const payroll = generatePayroll()

// Helper functions for managing employees
export const addEmployee = (employee) => {
  employees.push(employee)
  return employee
}

export const updateEmployee = (empId, updatedData) => {
  const index = employees.findIndex(e => e.empId === empId)
  if (index !== -1) {
    employees[index] = { ...employees[index], ...updatedData }
    return employees[index]
  }
  return null
}

export const deleteEmployee = (empId) => {
  const index = employees.findIndex(e => e.empId === empId)
  if (index !== -1) {
    employees.splice(index, 1)
    return true
  }
  return false
}

// Demo credentials
export const demoUsers = [
  { username: 'hr', password: 'hr123', role: 'HR', empId: 'HR001', name: 'HR Manager' },
  { username: 'raj', password: 'raj123', role: 'Employee', empId: 'EMP001', name: 'Raj Kumar' },
  { username: 'priya', password: 'priya123', role: 'Employee', empId: 'EMP002', name: 'Priya Sharma' },
]
