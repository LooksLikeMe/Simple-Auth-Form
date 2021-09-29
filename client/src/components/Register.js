import { useState } from 'react'
import { useHistory } from 'react-router'

function Register() {
  const history = useHistory()
  //state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //render
  const registerUser = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:8080/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
    const data = await response.json()

    if(data.status === 'ok') {
      history.push('/login')
    }
  }
  return (
    <div className="App">
      <h1>Регистрация</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          type="text"
          placeholder="Введите ваше имя"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          type="email"
          placeholder="Введите ваш email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          type="password"
          placeholder="Введите ваш пароль"
        />
        <button>Зарегистрироваться</button>
      </form>
    </div>
  )
}

export default Register
