# HR Payroll AI System - Technical Documentation

## System Architecture

### Technology Stack
**Frontend:**
- React 18.2.0 with Vite 5.0.8 (Fast build system)
- React Router 6.20.0 (Client-side routing)
- Tailwind CSS 3.3.6 (Utility-first styling)
- Recharts 2.10.3 (Data visualization)
- Lucide React 0.300.0 (Icon system)

**Backend:**
- FastAPI 0.104.1 (High-performance async API)
- Uvicorn 0.24.0 (ASGI server)
- OpenAI SDK (Groq API compatibility layer)

**AI Engine:**
- Groq API with Llama 3.3-70B-versatile
- Function calling architecture (6 intelligent tools)

**Data Layer:**
- No database (serverless-ready)
- JSON-based in-memory data store
- 27 employees (20 full-time, 4 interns, 3 part-time)
- 6 months historical data (Aug 2025 - Jan 2026)

---

## System Design

### Architecture Pattern
```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ HTTP/REST
┌──────▼──────────────────────────────┐
│   FastAPI Backend (Port 8000)       │
│  ┌──────────────────────────────┐   │
│  │  Static File Server (SPA)   │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │  /api/chat Endpoint          │   │
│  └──────┬───────────────────────┘   │
│         │                            │
│  ┌──────▼───────────────────────┐   │
│  │  Agentic AI Assistant        │   │
│  │  - Tool Selection Logic      │   │
│  │  - Context Management        │   │
│  │  - Response Generation       │   │
│  └──────┬───────────────────────┘   │
└─────────┼─────────────────────────┬─┘
          │                         │
   ┌──────▼──────┐         ┌────────▼─────────┐
   │  Groq API   │         │  JSON Data Store │
   │  (Llama 3.3)│         │  - employees[]   │
   └─────────────┘         │  - attendance[]  │
                           │  - payroll[]     │
                           └──────────────────┘
```

### Data Flow
1. **User Request** → React Component
2. **API Call** → FastAPI `/api/chat` endpoint
3. **Context Injection** → Employees, attendance, payroll data attached
4. **AI Processing** → Groq analyzes query and selects tools
5. **Tool Execution** → Backend executes selected tools with data
6. **Response Generation** → Groq generates human-readable response
7. **UI Update** → React displays response with tool badges

### Authentication System
- **Context-based authentication** (no JWT tokens)
- **LocalStorage persistence** (user session)
- **Role-based access control:**
  - HR: Full access to all employee data
  - Employee: Restricted to personal data only

---

## Payroll Calculations

### Salary Components (Indian CTC Model)

#### Input Parameters
```javascript
{
  monthlyCTC: 95000,           // Base monthly salary
  totalDays: 31,               // Total days in month
  unpaidLeave: 1,              // Unpaid leave days
  overtimeHours: 5             // Overtime worked
}
```

#### Calculation Logic

**Step 1: Daily Rate**
```
dailyRate = monthlyCTC / totalDays
dailyRate = 95000 / 31 = 3064.52
```

**Step 2: Unpaid Deduction**
```
unpaidDeduction = dailyRate × unpaidLeave
unpaidDeduction = 3064.52 × 1 = 3064.52
```

**Step 3: Base Pay**
```
basePay = monthlyCTC - unpaidDeduction
basePay = 95000 - 3064.52 = 91935.48
```

**Step 4: Overtime Pay**
```
hourlyRate = dailyRate / 8 = 383.07
overtimePay = hourlyRate × 1.5 × overtimeHours
overtimePay = 383.07 × 1.5 × 5 = 2873.03
```

**Step 5: Gross Pay**
```
grossPay = basePay + overtimePay
grossPay = 91935.48 + 2873.03 = 94808.51
```

**Step 6: Deductions**
```
employeePF = min(grossPay × 0.12, 1800) = 1800 (capped)
professionalTax = 200 (fixed)
totalDeductions = 1800 + 200 = 2000
```

**Step 7: Net Pay**
```
netPay = grossPay - totalDeductions
netPay = 94808.51 - 2000 = 92808.51
```

**Step 8: Annual Projections**
```
annualCTC = monthlyCTC × 12 = 1,140,000
annualTakeHome = netPay × 12 = 1,113,702.12
```

### Formula Summary
```
netPay = (monthlyCTC - (monthlyCTC/totalDays × unpaidLeave)) 
         + ((monthlyCTC/totalDays/8) × 1.5 × overtimeHours)
         - employeePF - professionalTax
```

---

## Payslip Structure

### Visual Layout
```
┌──────────────────────────────────────────────────────┐
│  PAYSLIP FOR JANUARY 2026                            │
├──────────────────────────────────────────────────────┤
│  Employee: Raj Kumar                                 │
│  ID: EMP001                                          │
│  Position: Senior Software Engineer                  │
│  Department: Engineering                             │
├──────────────────────────────────────────────────────┤
│  EARNINGS                           Amount (₹)       │
│  ─────────────────────────────────────────────       │
│  Monthly CTC                         95,000.00       │
│  Overtime Pay (5h @ 1.5x)             2,873.03       │
│  ─────────────────────────────────────────────       │
│  Gross Pay                           97,873.03       │
├──────────────────────────────────────────────────────┤
│  DEDUCTIONS                         Amount (₹)       │
│  ─────────────────────────────────────────────       │
│  Employee PF (12%)                    1,800.00       │
│  Professional Tax                       200.00       │
│  Unpaid Leave (1 day)                 3,064.52       │
│  ─────────────────────────────────────────────       │
│  Total Deductions                     5,064.52       │
├──────────────────────────────────────────────────────┤
│  NET PAY                             92,808.51       │
├──────────────────────────────────────────────────────┤
│  Annual CTC: ₹11,40,000.00                           │
│  Annual Take-Home: ₹11,13,702.12                     │
└──────────────────────────────────────────────────────┘
```

### Data Model
```javascript
{
  empId: "EMP001",
  empName: "Raj Kumar",
  month: "January 2026",
  monthlyCTC: 95000,
  basePay: "91935.48",
  overtimePay: "2873.03",
  grossPay: "94808.51",
  employeePF: "1800.00",
  professionalTax: "200.00",
  totalDeductions: "2000.00",
  netPay: "92808.51",
  annualCTC: 1140000,
  annualTakeHome: "1113702.12"
}
```

---

## AI Chat Interface

### Agentic Architecture

#### Function Calling Workflow
```
User Query: "What is Raj's salary for January?"
     │
     ▼
┌────────────────────────────────────────┐
│ Groq API (First Call)                  │
│ - Analyzes intent                      │
│ - Selects appropriate tools            │
│ - Returns: ["get_salary_details"]     │
└────────┬───────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────┐
│ Backend Tool Execution                 │
│ - execute_tool("get_salary_details")  │
│ - Query: empId=EMP001, month=Jan 2026 │
│ - Returns: {netPay: 92808.51, ...}    │
└────────┬───────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────┐
│ Groq API (Second Call)                 │
│ - Receives tool results                │
│ - Generates natural language response  │
│ - Returns: "Raj's net salary..."       │
└────────────────────────────────────────┘
```

### Available Tools

**1. get_employee_profile**
```javascript
Input: { empId: "EMP001" }
Output: {
  name: "Raj Kumar",
  position: "Senior Software Engineer",
  department: "Engineering",
  salary: 95000,
  empType: "Full-time"
}
```

**2. get_salary_details**
```javascript
Input: { empId: "EMP001", month: "January 2026" }
Output: {
  netPay: "92808.51",
  grossPay: "94808.51",
  basePay: "91935.48",
  deductions: "2000.00"
}
```

**3. get_attendance_record**
```javascript
Input: { empId: "EMP001", month: "January 2026" }
Output: {
  daysWorked: 20,
  paidLeave: 2,
  sickLeave: 1,
  unpaidLeave: 1,
  overtimeHours: 5
}
```

**4. calculate_leave_balance**
```javascript
Input: { empId: "EMP001" }
Output: {
  sickLeaveUsed: 1,
  sickLeaveQuota: 10,
  paidLeaveUsed: 2,
  paidLeaveQuota: 15,
  month: "January 2026"
}
```

**5. get_team_members**
```javascript
Input: { empId: "EMP001" }
Output: {
  department: "Engineering",
  members: [
    { name: "Amit Patel", position: "Junior Developer" },
    { name: "Vikram Singh", position: "DevOps Engineer" }
  ]
}
```

**6. compare_salary_with_average**
```javascript
Input: { empId: "EMP001" }
Output: {
  employeeSalary: 95000,
  departmentAverage: 80833.33,
  difference: 14166.67,
  department: "Engineering"
}
```

### Sample Conversations

**Scenario 1: Salary Inquiry**
```
User: "What is Raj Kumar's salary for January 2026?"

AI: [TOOL: get_salary_details(EMP001, January 2026)]

Response: "Raj Kumar's salary details for January 2026:
- Net Pay: ₹92,808.51
- Gross Pay: ₹94,808.51
- Deductions: ₹2,000.00

His annual CTC is ₹11,40,000 with an estimated annual 
take-home of ₹11,13,702."
```

**Scenario 2: Attendance Query**
```
User: "How many leaves did Priya take this month?"

AI: [TOOL: get_attendance_record(EMP002, January 2026)]

Response: "Priya Sharma's attendance for January 2026:
- Paid Leave: 2 days
- Sick Leave: 0 days
- Unpaid Leave: 0 days
- Days Worked: 21 days
- Overtime: 5 hours

She's been quite consistent this month!"
```

**Scenario 3: Comparative Analysis**
```
User: "How does Raj's salary compare to his department?"

AI: [TOOL: get_employee_profile(EMP001)]
    [TOOL: compare_salary_with_average(EMP001)]

Response: "Raj Kumar (Senior Software Engineer) earns 
₹95,000 monthly, which is ₹14,166.67 above the Engineering 
department average of ₹80,833.33. He's in the upper salary 
bracket within his team."
```

**Scenario 4: Leave Balance**
```
User: "Check my leave balance"

AI: [TOOL: calculate_leave_balance(EMP001)]

Response: "Your leave balance for January 2026:

Sick Leave:
- Used: 1 day
- Remaining: 9 days (out of 10)

Paid Leave:
- Used: 2 days
- Remaining: 13 days (out of 15)

You have plenty of leave days available!"
```

### AI Response Characteristics
- **Natural Language**: Conversational, friendly tone
- **Contextual**: Understands implicit references ("my salary")
- **Accurate**: Uses real-time data from tools
- **Formatted**: Currency symbols, proper number formatting
- **Transparent**: Shows which tools were used (badges in UI)

---

## Deployment Configuration

### Render Setup

**Build Command:**
```bash
npm install && npm run build && pip install -r backend/requirements.txt
```

**Start Command:**
```bash
cd backend && python main_agentic.py
```

**Environment Variables:**
```
GROQ_API_KEY=your_groq_api_key_here
PORT=10000
```

### Production Optimizations
- Vite production build (minified, tree-shaken)
- Static asset compression
- FastAPI auto-reload disabled in production
- CORS configured for Render domain
- Health check endpoint: `/api/health`

### Scaling Considerations
- Stateless design (no sessions)
- No database dependencies (instant cold starts)
- Lightweight Docker container (~150MB)
- Free tier compatible (512MB RAM)

---

## Technical Highlights

### Performance
- **Frontend Build**: ~580KB JavaScript (gzipped: ~167KB)
- **API Response Time**: <200ms (without AI)
- **AI Response Time**: 1-3s (Groq inference)
- **Cold Start**: <2s (Render free tier)

### Security
- No sensitive data storage
- API key server-side only
- Role-based access control
- XSS protection (React escaping)
- CORS properly configured

### Code Quality
- **Frontend**: Functional React components with hooks
- **Backend**: Async FastAPI with type hints
- **Data Layer**: Immutable data patterns
- **AI Logic**: Separation of concerns (tools, execution, response)

### Future Enhancements
- Database integration (PostgreSQL)
- JWT authentication
- Email notifications
- PDF payslip generation
- Multi-language support
- Advanced analytics dashboard

---

**System Version**: 2.0.0  
**Last Updated**: January 17, 2026  
**License**: MIT  
**Contact**: HR Payroll AI Team
