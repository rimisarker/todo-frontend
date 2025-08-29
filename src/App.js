import React, { useEffect, useState } from 'react'
import API from './api'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    try {
      const resp = await API.get('/todos')
      setTodos(resp.data)
    } catch (err) {
      console.error(err)
    }
  }

  async function addTodo(e) {
    e.preventDefault()
    if (!title) return
    await API.post('/todos', { title })
    setTitle('')
    fetchTodos()
  }

  async function completeTodo(id) {
    await API.post(`/todos/${id}/complete`)
    fetchTodos()
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo</h1>
      <form onSubmit={addTodo}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New todo" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            {t.title} {t.completed ? '(done)' : <button onClick={() => completeTodo(t.id)}>Complete</button>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
