import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router'

function Dashboard() {
  const history = useHistory()
  const [quote, setQuote] = useState('')
  const [tempQuote, setTempQuote] = useState('')
  const populateQuote = async () => {
    const req = await fetch('http://localhost:8080/api/quote', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })
    const data = await req.json()
    if (data.status === 'ok') {
      setQuote(data.quote)
    } else {
      alert(data.error)
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwt.decode(token)
      if (!user) {
        localStorage.removeItem('token')
        window.location.href = '/'
        history.replace('/')
      } else {
        populateQuote()
      }
    }
  }, [])

  const updateQuote = async (e) => {
    e.preventDefault()
    const req = await fetch('http://localhost:8080/api/quote', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    })
    const data = await req.json()
    if (data.status === 'ok') {
      setQuote(tempQuote)
      setTempQuote('')
    } else {
      alert(data.error)
    }
  }
  return (
    <div>
      <h1>Ваша цитата:</h1>
      <h2> {quote || 'Цитат не найдено'} </h2>
      <form onSubmit={updateQuote}>
        <input
          type="text"
          placeholder="Введите вашу цитату"
          value={tempQuote}
          onChange={(e) => setTempQuote(e.currentTarget.value)}
        />
        <button>Обновить цитату</button>
      </form>
    </div>
  )
}

export default Dashboard