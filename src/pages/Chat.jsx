import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { employees, attendance, payroll } from '../data/dummyData'
import { Send, Bot, User as UserIcon, Loader, UserCheck } from 'lucide-react'

export default function Chat() {
  const { user } = useAuth()
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('')
  const [chatStarted, setChatStarted] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Get available employees based on user role
  const availableEmployees = user?.role === 'HR' 
    ? employees 
    : employees.filter(emp => emp.empId === user?.id)

  const startChat = () => {
    if (!selectedEmployeeId) return
    
    const selectedEmp = employees.find(e => e.empId === selectedEmployeeId)
    setChatStarted(true)
    setMessages([
      {
        role: 'assistant',
        content: `👋 Hello ${user?.name}! I'm ready to assist you with queries about **${selectedEmp?.name}** (${selectedEmp?.empId}).\n\n🔧 I can help with:\n• 📋 Employee Profile & Details\n• 💰 Salary & Payroll Information\n• 📅 Attendance Records\n• 🏖️ Leave Balance Calculation\n• 👥 Team Members\n• 📊 Salary Comparisons\n• 📞 Schedule HR Meetings\n• 💬 Contact Payroll Department\n\nAsk me anything!`,
        toolCalls: []
      }
    ])
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          empId: selectedEmployeeId,
          context: { employees, attendance, payroll }
        })
      })

      const data = await response.json()
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        toolCalls: data.toolCalls || []
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Error connecting to AI. Please check if backend is running and GROQ_API_KEY is set.',
        toolCalls: []
      }])
    }

    setLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Employee Selection Screen
  if (!chatStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mb-4">
              <Bot size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Start AI Chat</h2>
            <p className="text-gray-600 mt-2">Select an employee to begin</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <UserCheck className="inline mr-2" size={18} />
                Select Employee ID
              </label>
              <select
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">-- Choose Employee --</option>
                {availableEmployees.map(emp => (
                  <option key={emp.empId} value={emp.empId}>
                    {emp.empId} - {emp.name} ({emp.position})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={startChat}
              disabled={!selectedEmployeeId}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              <Bot size={20} />
              <span>Start Chat</span>
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>💡 Tip:</strong> {user?.role === 'HR' 
                ? 'As HR, you can query any employee\'s data including payroll status, attendance, and schedule meetings.' 
                : 'You can view your own employee details, payroll information, and request HR assistance.'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="bg-white rounded-t-lg shadow-lg p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
              <Bot className="text-primary" size={28} />
              <span>Agentic AI Chat</span>
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Powered by Grok (Llama 3.3) with Function Calling
            </p>
          </div>
          <button
            onClick={() => setChatStarted(false)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
          >
            Change Employee
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-gray-50 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div className={`flex items-start space-x-3 max-w-3xl ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-primary to-secondary'
                  : 'bg-gradient-to-br from-green-400 to-blue-500'
              }`}>
                {msg.role === 'user' ? (
                  <UserIcon size={20} className="text-white" />
                ) : (
                  <Bot size={20} className="text-white" />
                )}
              </div>

              {/* Message Content */}
              <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block px-6 py-4 rounded-2xl shadow-md ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-primary to-secondary text-white'
                    : 'bg-white text-gray-800'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  
                  {/* Tool Calls Badge */}
                  {msg.toolCalls && msg.toolCalls.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200 flex flex-wrap gap-2">
                      <span className="text-xs font-semibold text-gray-600">🛠️ Tools Used:</span>
                      {msg.toolCalls.map((tool, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium"
                        >
                          {tool.replace('get_', '').replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div className="bg-white px-6 py-4 rounded-2xl shadow-md">
                <Loader className="animate-spin text-primary" size={20} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-b-lg shadow-lg p-6 border-t">
        <div className="flex space-x-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about salary, leaves, attendance, team, comparisons..."
            className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all flex items-center space-x-2"
          >
            <Send size={20} />
            <span>Send</span>
          </button>
        </div>

        {/* Example Questions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 font-medium">Try asking:</span>
          {[
            'Show my salary breakdown',
            'How many leaves do I have?',
            'Who are my team members?',
            'Compare my salary with department average'
          ].map((q, i) => (
            <button
              key={i}
              onClick={() => setInput(q)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
