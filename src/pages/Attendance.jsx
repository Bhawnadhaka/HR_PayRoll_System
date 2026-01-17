import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { attendance } from '../data/dummyData'
import { Calendar as CalendarIcon } from 'lucide-react'

export default function Attendance() {
  const { user } = useAuth()
  const [selectedMonth, setSelectedMonth] = useState('January 2026')

  const myAttendance = attendance.filter(a => 
    user?.role === 'HR' ? true : a.empId === user?.id
  )

  const filtered = myAttendance.filter(a => a.month === selectedMonth)
  const months = [...new Set(attendance.map(a => a.month))]

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Attendance Records</h1>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
        >
          {months.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-primary to-secondary text-white">
            <tr>
              {user?.role === 'HR' && <th className="px-6 py-4 text-left">Employee ID</th>}
              <th className="px-6 py-4 text-left">Month</th>
              <th className="px-6 py-4 text-center">Total Days</th>
              <th className="px-6 py-4 text-center">Weekends</th>
              <th className="px-6 py-4 text-center">Sick Leave</th>
              <th className="px-6 py-4 text-center">Paid Leave</th>
              <th className="px-6 py-4 text-center">Unpaid Leave</th>
              <th className="px-6 py-4 text-center">Days Worked</th>
              <th className="px-6 py-4 text-center">Overtime</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((att, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                {user?.role === 'HR' && <td className="px-6 py-4 font-semibold">{att.empId}</td>}
                <td className="px-6 py-4">{att.month}</td>
                <td className="px-6 py-4 text-center">{att.totalDays}</td>
                <td className="px-6 py-4 text-center text-gray-600">{att.weekends}</td>
                <td className="px-6 py-4 text-center text-yellow-600">{att.sickLeave}</td>
                <td className="px-6 py-4 text-center text-blue-600">{att.paidLeave}</td>
                <td className="px-6 py-4 text-center text-red-600">{att.unpaidLeave}</td>
                <td className="px-6 py-4 text-center font-semibold text-green-600">{att.daysWorked}</td>
                <td className="px-6 py-4 text-center text-purple-600">{att.overtimeHours}h</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
