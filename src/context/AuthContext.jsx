import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (username, password) => {
    // Demo users - no database
    const users = [
      { id: 'HR001', username: 'hr', password: 'hr123', role: 'HR', name: 'HR Manager' },
      { id: 'EMP001', username: 'raj', password: 'raj123', role: 'Employee', name: 'Raj Kumar' },
      { id: 'EMP002', username: 'priya', password: 'priya123', role: 'Employee', name: 'Priya Sharma' },
    ]

    const foundUser = users.find(u => u.username === username && u.password === password)
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
