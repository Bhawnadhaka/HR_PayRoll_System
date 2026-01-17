import { UsersRound, BarChart3, TrendingUp, DollarSign } from 'lucide-react'
import { employees, payroll } from '../data/dummyData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const totalEmployees = employees.length
  const latestPayroll = payroll.slice(-20)
  const avgSalary = (latestPayroll.reduce((sum, p) => sum + parseFloat(p.netPay), 0) / latestPayroll.length).toFixed(0)
  
  const sampleEmpId = employees.length > 0 ? employees[0].empId : 'EMP001'
  const salaryTrend = payroll
    .filter(p => p.empId === sampleEmpId)
    .map(p => ({
      month: p.month.split(' ')[0],
      salary: parseFloat(p.netPay) / 1000
    }))

  const stats = [
    { label: 'Total Employees', value: totalEmployees, icon: UsersRound, color: 'bg-blue-500' },
    { label: 'Avg Salary', value: `₹${avgSalary}`, icon: DollarSign, color: 'bg-green-500' },
    { label: 'Departments', value: '8', icon: BarChart3, color: 'bg-purple-500' },
    { label: 'This Month', value: 'January 2026', icon: TrendingUp, color: 'bg-orange-500' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Salary Trend (Sample Employee)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salaryTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'Salary (₹k)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => `₹${value}k`} />
            <Line type="monotone" dataKey="salary" stroke="#667eea" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
