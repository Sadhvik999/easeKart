import React, { useState } from "react"

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include', 
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      console.log("login response:", res.status, data.message)
    } catch (err) {
      console.error("Login error:", err)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ name, email, phone, password })
      })
      const data = await res.json()
      console.log("signup response:", res.status, data.message)
    } catch (err) {
      console.error("Signup error:", err)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div>

      </div>
      {isLogin ? (
        <div className="bg-black/60 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md ">
          <h1 className="text-2xl font-bold text-center text-white mb-6">Login</h1>
          <div className="flex justify-center items-center gap">
            <button onClick={() => setIsLogin(false)} className="text-white px-2 py-1 rounded-xl">Signup</button>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="email">Email</label>
              <input type="text" id="email" placeholder="Enter Your Email" className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-6 relative">
              <label className="block text-white mb-2" htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter Your Password" className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setPassword(e.target.value)} required />
              <p className="text-sm text-white/60 duration-150 hover:text-md hover:text-white ">Forgot Password</p>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">Log in</button>
          </form>
        </div>

      ) : (

        <div className="bg-black/60 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md ">
          <h1 className="text-2xl font-bold text-center text-white mb-6">Register</h1>
          <div className="flex justify-center items-center gap">
            <button onClick={() => setIsLogin(true)} className="text-white px-2 py-1 rounded-xl">Login</button>
          </div>
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter Your Name" className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="email">Email</label>
              <input type="text" id="email" placeholder="Enter Your Email" className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="phone">Phone</label>
              <input type="text" id="phone" placeholder="Enter Your Phone" className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="mb-6 relative">
              <label className="block text-white mb-2" htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter Your Password" className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <div className="mb-6 relative">
              <label className="block text-white mb-2" htmlFor="confirm">Confirm Password</label>
              <input type="password" id="confirm" placeholder="Confirm Password" className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">Register</button>
          </form>
        </div>
      )
      }
    </div>)
}
