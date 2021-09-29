import { useState } from 'react'

function Login() {
  //state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //render
  const loginUser = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:8080/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await response.json()

    if(data.user) {
      localStorage.setItem('token', data.user)
      alert('Login successful')
      window.location.href ='/dashboard'
    } else {
      alert('Please check your username(email) and password')
    }
  }
  return (
    <div className="Login">
      <h1>Войти</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          type="email"
          placeholder="Введите email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          type="password"
          placeholder="Введите пароль"
        />
        <button>Войти</button>
      </form>
    </div>
  )
}

export default Login