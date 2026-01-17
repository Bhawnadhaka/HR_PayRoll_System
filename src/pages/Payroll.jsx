import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { payroll } from '../data/dummyData'
import { DollarSign, Download } from 'lucide-react'

export default function Payroll() {
  const { user } = useAuth()
  const [selectedMonth, setSelectedMonth] = useState('January 2026')

  const myPayroll = payroll.filter(p =>
    user.role === 'HR' ? true : p.empId === user.id
  )

  const filtered = myPayroll.filter(p => p.month === selectedMonth)
  const months = [...new Set(payroll.map(p => p.month))]

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Payroll</h1>
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

      <div className="grid gap-6">
        {filtered.map((pay, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{pay.empName}</h3>
                <p className="text-gray-600">{pay.empId} • {pay.month}</p>
              </div>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg flex items-center space-x-2">
                <Download size={18} />
                <span>Download</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Earnings */}
              <div>
                <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                  <DollarSign size={18} className="mr-1" />
                  EARNINGS
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Pay</span>
                    <span className="font-semibold">₹{parseFloat(pay.basePay).toLocaleString()}</span>
                  </div>
                  {parseFloat(pay.overtimePay) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overtime Pay</span>
                      <span className="font-semibold text-green-600">+₹{parseFloat(pay.overtimePay).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-semibold">Gross Pay</span>
                    <span className="font-bold text-green-600">₹{parseFloat(pay.grossPay).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Deductions */}
              <div>
                <h4 className="font-semibold text-red-600 mb-3">DEDUCTIONS</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employee PF (12%)</span>
                    <span className="font-semibold">-₹{parseFloat(pay.employeePF).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Professional Tax</span>
                    <span className="font-semibold">-₹{parseFloat(pay.professionalTax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-semibold">Total Deductions</span>
                    <span className="font-bold text-red-600">-₹{parseFloat(pay.totalDeductions).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Pay */}
            <div className="mt-6 pt-6 border-t bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">NET TAKE HOME</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ₹{parseFloat(pay.netPay).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
